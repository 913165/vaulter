// app/api/lib/encryption.ts
import { randomBytes, createCipheriv, createDecipheriv } from 'crypto'

const ALGORITHM = 'aes-256-gcm'
const IV_LENGTH = 12
const AUTH_TAG_LENGTH = 16

// Validate encryption key on startup
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY
if (!ENCRYPTION_KEY || ENCRYPTION_KEY.length !== 64) {
  throw new Error('Invalid or missing ENCRYPTION_KEY environment variable. Must be a 64-character hex string.')
}

export async function encrypt(text: string): Promise<string> {
  try {
    const iv = randomBytes(IV_LENGTH)
    const key = Buffer.from(process.env.ENCRYPTION_KEY || '', 'hex');
    const cipher = createCipheriv(ALGORITHM, key, iv)
    
    let encrypted = cipher.update(text, 'utf8', 'hex')
    encrypted += cipher.final('hex')
    
    const authTag = cipher.getAuthTag()
    
    return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`
  } catch (error) {
    console.error('Encryption error:', error)
    throw new Error('Failed to encrypt data')
  }
}

export async function decrypt(text: string): Promise<string> {
  try {
    const [ivHex, authTagHex, encryptedHex] = text.split(':')
    const key = Buffer.from(process.env.ENCRYPTION_KEY || '', 'hex');
    
    const decipher = createDecipheriv(
      ALGORITHM, 
      key,
      Buffer.from(ivHex, 'hex')
    )
    
    decipher.setAuthTag(Buffer.from(authTagHex, 'hex'))
    
    let decrypted = decipher.update(encryptedHex, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    
    return decrypted
  } catch (error) {
    console.error('Decryption error:', error)
    throw new Error('Failed to decrypt data')
  }
}
