import db_service from './database.service'

class RefreshTokenService {
  async createRefreshToken({ account_id, token }: { account_id: string; token: string }) {
    return await db_service.query(
      'INSERT INTO refresh_tokens (account_id, token, created_at, updated_at) VALUES ($1, $2, $3, $4)',
      [account_id, token, new Date(), new Date()]
    )
  }

  async updateRefreshToken({ account_id, token }: { account_id: string; token: string }) {
    // Check if refresh token exists for this account
    const existingToken = await this.getRefreshToken({ account_id })

    if (existingToken) {
      // Update existing token
      await db_service.query('UPDATE refresh_tokens SET token = $1, updated_at = $2 WHERE account_id = $3', [
        token,
        new Date(),
        account_id
      ])
    } else {
      // Create new token if doesn't exist
      await this.createRefreshToken({ account_id, token })
    }
  }

  async getRefreshToken({ account_id }: { account_id: string }) {
    const result = await db_service.query('SELECT * FROM refresh_tokens WHERE account_id = $1', [account_id])
    return result.rows[0]
  }
}

const refreshTokenService = new RefreshTokenService()
export default refreshTokenService
