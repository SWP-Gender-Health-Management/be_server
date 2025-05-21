import Account from '~/models/Entity/Account.entity'
import db_service from './database.service'
import { hashPassword, verifyPassword } from '~/utils/crypto'
import { JsonWebTokenError } from 'jsonwebtoken'
import { signToken } from '~/utils/jwt'
import { config } from 'dotenv'
import { sendMail } from './email.service'

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

  async createAccountId() {
    const result = await this.getLength()
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
    const { email, password } = payload
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
  }

  async deleteAnAccountById(id: string) {
    const tmp = await db_service.query('DELETE FROM Account WHERE account_id = $1', [id]);
    return tmp.rows[0];
  }

  async getAccountsList(id: any) {
    
  }

  async updateAccount(id: any) {
    
  }
}

const accountService = new AccountService()
export default accountService
