import Account from '~/models/Entity/Account.entity'
import db_service from './database.service'
import { hashPassword, verifyPassword } from '~/utils/crypto'
import { JsonWebTokenError } from 'jsonwebtoken'
import { signToken } from '~/utils/jwt'
import { config } from 'dotenv'

config()

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

  async createAccount(payload: any) {
    const { email, password } = payload

    // Check if email already exists
    const existingUser = await this.checkEmailExist(email)
    if (existingUser) {
      throw new Error('Email already exists')
    }

    const account_id = (await this.createAccountId()).toString()
    await db_service.query(
      'INSERT INTO Account (account_id, email, password, created_at, updated_at) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [account_id, email, await hashPassword(password), new Date(), new Date()]
    )
    const [accessToken, refreshToken] = await Promise.all([
      this.createAccessToken({ account_id, password }),
      this.createRefreshToken({ account_id, password })
    ])
    return {
      account_id,
      accessToken,
      refreshToken
    }
  }

  async login(payload: any) {
    const { account_id, password } = payload
    const [accessToken, refreshToken] = await Promise.all([
      this.createAccessToken({ account_id, password }),
      this.createRefreshToken({ account_id, password })
    ])
    return { accessToken, refreshToken }
  }
}

const accountService = new AccountService()
export default accountService
