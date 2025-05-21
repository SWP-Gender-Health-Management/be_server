import Account from '~/models/Entity/Account.entity'
import db_service from './database.service'
<<<<<<< HEAD
import RandExp from 'randexp'
import { hashPassword } from '~/utils/crypto'
import { signToken } from '~/utils/jwt'
=======
import { hashPassword, verifyPassword } from '~/utils/crypto'
import { JsonWebTokenError } from 'jsonwebtoken'
import { signToken } from '~/utils/jwt'
import { config } from 'dotenv'
import { sendMail } from './email.service'

config()
>>>>>>> 02f30bca547b77ede059705c0bdb6e5bdf4e860e

class AccountService {
  async checkEmailExist(email: string) {
    const user = await db_service.query('SELECT * FROM Account WHERE email = $1', [email])
    return user.rows.length > 0 ? user.rows[0] : null
  }

  async checkPassword(email: string, password: string) {
    const user = await db_service.query('SELECT * FROM Account WHERE email = $1', [email])

    const isPasswordValid = await verifyPassword(password, user.rows[0].password)
    return isPasswordValid
  }

  async getLength(): Promise<number> {
    const length = await db_service.query('SELECT COUNT(*) FROM Account')
    return parseInt(length.rows[0].count)
  }

  async createAccountId() {
    const result = (await this.getLength()) + 1
    switch (result.toString().length) {
      case 1:
        return 'ACC-000'.concat(result.toString())
      case 2:
        return 'ACC-00'.concat(result.toString())
      case 3:
        return 'ACC-0'.concat(result.toString())
      default:
        return 'ACC-'.concat(result.toString())
    }
  }

  async createAccessToken(payload: any) {
    return await signToken({
      payload,
      secretKey: process.env.JWT_SECRET_ACCESS_TOKEN as string,
      options: {
        expiresIn: parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRE_IN as string)
      }
    })
  }

  async createRefreshToken(payload: any) {
    return await signToken({
      payload,
      secretKey: process.env.JWT_SECRET_REFRESH_TOKEN as string,
      options: {
        expiresIn: parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRE_IN as string)
      }
    })
  }

  async createEmailVerifiedToken(payload: any) {
    return await signToken({
      payload,
      secretKey: process.env.JWT_SECRET_EMAIL_VERIFIED_TOKEN as string,
      options: {
        expiresIn: parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRE_IN as string)
      }
    })
  }

  async getLength(): Promise<Number> {
    const result = await db_service.query('SELECT COUNT(account_id) FROM Account')
    if (result && result.rows && result.rows.length > 0 && result.rows[0].count !== undefined) {
      return parseInt(result.rows[0].count, 10) + 1
    } else {
      return 1
    }
  }

  async createId(): Promise<string> {
    let num = (await this.getLength()).toString()
    switch (num.length) {
      case 1:
        num = '000'.concat(num)
        break
      case 2:
        num = '00'.concat(num)
        break
      case 3:
        num = '0'.concat(num)
        break
    }
    return 'ACC-'.concat(num)
  }

  async createAccount(payload: any) {
<<<<<<< HEAD
    const account_id = await this.createId()
    const { email, password } = payload
    const tmp = await db_service.query(
      'INSERT INTO account (account_id, email, password, created_at, updated_at) VALUES ($1, $2, $3, $4, $5)',
      [account_id, email, await hashPassword(password), new Date(), new Date()]
    )

    const [accessToken, refreshToken] = await Promise.all([
      this.signAccessToken({ account_id, email }),
      this.signRefreshToken({ account_id, email })
    ])
    return { account_id, accessToken, refreshToken }
  }

  async signAccessToken(payload: any) {
    const accessToken = await signToken({
      payload,
      secretKey: process.env.JWT_SECRET_ACCESS_TOKEN as string,
      options: { expiresIn: '30m' }
    })
    return accessToken
  }

  async signRefreshToken(payload: any) {
    const refreshToken = await signToken({
      payload,
      secretKey: process.env.JWT_SECRET_REFRESH_TOKEN as string,
      options: { expiresIn: '7d' }
    })
    return refreshToken
=======
    const { email, password } = payload

    // Check if email already exists
    // const existingUser = await this.checkEmailExist(email)
    // if (existingUser) {
    //   throw new Error('Email already exists')
    // }

    const account_id = (await this.createAccountId()).toString()
    const passwordHash = await hashPassword(password)
    const secretPasscode = Math.floor(100000 + Math.random() * 900000).toString()
    const [accessToken, refreshToken, emailVerifiedToken] = await Promise.all([
      this.createAccessToken({ account_id, password }),
      this.createRefreshToken({ account_id, password }),
      this.createEmailVerifiedToken({ account_id, password, secretPasscode })
    ])

    await sendMail({
      to: 'ndmanh1005@gmail.com',
      subject: 'Verify your email',
      text: `Your passcode is ${secretPasscode}`
    })

    await db_service.query(
      'INSERT INTO Account (account_id, email, password, is_verified, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [account_id, email, passwordHash, emailVerifiedToken, new Date(), new Date()]
    )

    return {
      account_id,
      accessToken,
      refreshToken,
      emailVerifiedToken
    }
  }

  async login(payload: any) {
    const { account_id, password } = payload
    const [accessToken, refreshToken] = await Promise.all([
      this.createAccessToken({ account_id, password }),
      this.createRefreshToken({ account_id, password })
    ])

    return { accessToken, refreshToken }
>>>>>>> 02f30bca547b77ede059705c0bdb6e5bdf4e860e
  }
}

const accountService = new AccountService()
export default accountService
