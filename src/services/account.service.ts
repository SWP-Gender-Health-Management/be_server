import Account from '~/models/Entity/Account.entity'
import db_service from './database.service'

class AccountService {
  async checkEmailExist(email: string) {
    const user = await db_service.query('SELECT * FROM Account WHERE email = $1', [email])
    return user
  }

  async createAccount(payload: any) {
    const account = new Account(payload)
    const tmp = await db_service.query('INSERT INTO Account (email, password) VALUES ($1, $2) RETURNING *', [
      account.email,
      account.password
    ])
    return tmp.rows[0]
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
