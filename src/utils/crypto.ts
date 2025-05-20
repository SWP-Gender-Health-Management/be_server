import argon2 from 'argon2'
import { USERS_MESSAGES } from '~/constants/message'

export const hashPassword = async (password: string) => {
  try {
    const options = {
      type: argon2.argon2id,
      memoryCost: 65536,
      timeCost: 3,
      parallelism: 4
    }
    const hash = await argon2.hash(password, options)
    return hash
  } catch (error) {
    console.error('Error hashing password:', error)
    throw new Error(USERS_MESSAGES.CRYPTO_ERROR)
  }
}

export const verifyPassword = async (password: string, hash: string) => {
  return await argon2.verify(hash, password)
}
