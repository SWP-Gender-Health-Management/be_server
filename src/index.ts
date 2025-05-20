import express from 'express'
import pool from './services/database.service'
import dotenv from 'dotenv'
import accountRoute from './routes/account.route'
import defaultErrorHandle from './middlewares/error.middleware'

dotenv.config()

const app = express()
app.use(express.json())
// connect database
pool.connect()

//route: Account
app.use('/account', accountRoute)

app.use(defaultErrorHandle)

app.listen(parseInt(process.env.PORT as string), () => {
  console.log(`Server is running on port: ${process.env.PORT}`)
})
