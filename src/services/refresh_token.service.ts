import db_service from './database.service'

class RefreshTokenService {
  createRefreshToken({ account_id, token }: { account_id: string; token: string }) {
    return db_service.query(
      'INSERT INTO refresh_tokens (account_id, token, created_at, updated_at) VALUES ($1, $2, $3, $4)',
      [account_id, token, new Date(), new Date()]
    )
  }

  async getRefreshToken({ account_id }: { account_id: string }) {
    const result = await db_service.query('SELECT * FROM refresh_tokens WHERE account_id = $1', [account_id])
    return result.rows[0]
  }
}

const refreshTokenService = new RefreshTokenService()
export default refreshTokenService
