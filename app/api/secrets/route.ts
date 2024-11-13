import { NextResponse, NextRequest } from 'next/server'
import { encrypt, decrypt } from '../utils/encryption'
import { getAuth } from '@clerk/nextjs/server'
import prisma from '../../../lib/db'

export async function POST(request: NextRequest) {
  try {
    const { userId } = getAuth(request)
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' }, 
        { status: 401 }
      )
    }

    const { name, value } = await request.json()
    
    if (!name || !value) {
      return NextResponse.json(
        { error: 'Name and value are required' }, 
        { status: 400 }
      )
    }

    const encryptedValue = await encrypt(value)

    await prisma.secret.upsert({
      where: {
        userId_key: {
          userId,
          key: name,
        }
      },
      update: {
        value: encryptedValue
      },
      create: {
        userId,
        key: name,
        value: encryptedValue
      }
    })

    return NextResponse.json({ 
      message: 'Secret stored successfully',
      name 
    })
  } catch (error) {
    console.error('Error storing secret:', error)
    return NextResponse.json(
      { error: 'Failed to store secret' }, 
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { userId } = getAuth(request)
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' }, 
        { status: 401 }
      )
    }

    const secrets = await prisma.secret.findMany({
      where: {
        userId
      },
      select: {
        key: true,
        value: true
      }
    })

    const decryptedSecrets = await Promise.all(
      secrets.map(async (secret) => ({
        name: secret.key,
        value: await decrypt(secret.value)
      }))
    )

    return NextResponse.json({ secrets: decryptedSecrets })
  } catch (error) {
    console.error('Error retrieving secrets:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve secrets' }, 
      { status: 500 }
    )
  }
}