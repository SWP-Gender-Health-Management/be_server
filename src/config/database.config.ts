import { DataSource } from 'typeorm'
import account from '~/models/Entity/Account.entity'
import refresh_tokens from '~/models/Entity/Refresh_token.entity'
import dotenv from 'dotenv'

dotenv.config()

// console.log('Database Config:', {
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   username: process.env.DB_USER,
//   database: process.env.DATABASE
// })

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: ["src/models/Entity/**/*.ts"],
  migrations: ['dist/migration/*.js'],
  subscribers: ['dist/subscriber/*.js']
})
