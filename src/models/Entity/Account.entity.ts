interface AccountType {
  account_id: string
  full_name?: string
  email: string
  phone?: string
  dob?: Date
  gender?: string
  password: string
  role?: string
  is_verified?: boolean
  created_at: Date
  updated_at: Date
}

export default class Account {
  account_id: string
  full_name?: string
  email: string
  phone?: string
  dob?: Date
  gender?: string
  password: string
  role?: string
  is_verified?: boolean
  created_at: Date
  updated_at: Date

  constructor(account: AccountType) {
    this.account_id = account.account_id
    this.email = account.email
    this.password = account.password
    this.created_at = new Date()
    this.updated_at = new Date()
  }
}
