import argon2 from 'argon2'
<<<<<<< HEAD
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
=======

export async function hashPassword(password: string) {
  const options = {
    type: argon2.argon2id,
    memoryCost: 65,
    timeCost: 3,
    parallelism: 4
  }
  return await argon2.hash(password, options)
}

export async function verifyPassword(password: string, hash: string) {
>>>>>>> 02f30bca547b77ede059705c0bdb6e5bdf4e860e
  return await argon2.verify(hash, password)
}
