import { NextResponse, NextRequest } from 'next/server'
import { encrypt, decrypt } from '../utils/encryption'
import { getAuth } from '@clerk/nextjs/server'

// In-memory storage (replace with database in production)
const secrets = new Map()

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

    // Store with user prefix to separate secrets per user
    const secretKey = `${userId}:${name}`
    const encryptedValue = await encrypt(value)
    secrets.set(secretKey, encryptedValue)

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

    // Filter secrets for current user
    const userSecrets = Array.from(secrets.entries())
      .filter(([key]) => key.startsWith(`${userId}:`))
      .map(([key, value]) => ({
        name: key.split(':')[1],
        encryptedValue: value
      }))

    const decryptedSecrets = await Promise.all(
      userSecrets.map(async (secret) => ({
        name: secret.name,
        value: await decrypt(secret.encryptedValue as string)
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