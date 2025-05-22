import 'reflect-metadata';
import express from 'express'

import 'reflect-metadata'
import dotenv from 'dotenv'
import accountRoute from './routes/account.route'
import consultantRoute from './routes/consultant.route'
import majorRoute from './routes/major.route'
import { createConnection } from 'typeorm';
import userRoutes from './routes/user.route'

dotenv.config()

const app = express()

app.use(express.json())
// connect database
//pool.connect()

//route: Account
//app.use('/account', accountRoute)


createConnection().then(() => {
  console.log('Connected to DB')
  // route: user
  app.use('/api', userRoutes);
  // route: Consultant
  app.use('/consultant', consultantRoute)
  // route: Major
  app.use('/major', majorRoute)

  app.listen(parseInt(process.env.PORT as string), () => {
    console.log(`Server is running on port: ${process.env.PORT}`)
  });
}).catch((error) => console.log('Error connecting to database:', error));

