import express from 'express'

import 'reflect-metadata'
import dotenv from 'dotenv'
import accountRoute from './routes/account.route'
import defaultErrorHandle from './middlewares/error.middleware'
import db_service from './services/database.service'

dotenv.config()

const app = express()
app.use(express.json())
// connect database
db_service.connect()

//route: Account
app.use('/account', accountRoute)

app.use(defaultErrorHandle)

app.listen(parseInt(process.env.PORT as string), () => {
  console.log(`Server is running on port: ${process.env.PORT}`)
})
