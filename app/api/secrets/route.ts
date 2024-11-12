// app/api/secrets/route.ts
import { NextResponse } from 'next/server'
import { decrypt, encrypt } from '../utils/encryption'

// In-memory storage (replace with database in production)
let secrets = new Map()

export async function POST(request: Request) {
  try {
    const { name, value } = await request.json()
    
    if (!name || !value) {
      return NextResponse.json({ error: 'Name and value are required' }, { status: 400 })
    }

    const encryptedValue = await encrypt(value)
    secrets.set(name, encryptedValue)

    return NextResponse.json({ message: 'Secret stored successfully' })
  } catch (error) {
    console.error('Error storing secret:', error)
    return NextResponse.json({ error: 'Failed to store secret' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const allSecrets = Array.from(secrets.entries())
      .map(async ([name, value]) => ({
        name,
        value: await decrypt(value)
      }))

    return NextResponse.json({ secrets: await Promise.all(allSecrets) })
  } catch (error) {
    console.error('Error retrieving secrets:', error)
    return NextResponse.json({ error: 'Failed to retrieve secrets' }, { status: 500 })
  }
}