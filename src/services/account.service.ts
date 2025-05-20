import Account from '~/models/Entity/Account.entity'
import db_service from './database.service'
import RandExp from 'randexp'
import { hashPassword } from '~/utils/crypto'
import { signToken } from '~/utils/jwt'

class AccountService {
  async checkEmailExist(email: string) {
    const user = await db_service.query('SELECT * FROM Account WHERE email = $1', [email])
    return user
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
  }
}

const accountService = new AccountService()
export default accountService
