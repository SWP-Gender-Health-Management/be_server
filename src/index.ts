// import 'reflect-metadata';
// import express from 'express'

// import 'reflect-metadata'
// import dotenv from 'dotenv'
// import accountRoute from './routes/account.route'
// import consultantRoute from './routes/consultant.route'
// import majorRouter from './routes/major.route'
// import { createConnection } from 'typeorm';
// import userRoutes from './routes/user.route'

// dotenv.config()

// const app = express()

// app.use(express.json())
// connect database
//pool.connect()

//route: Account
//app.use('/account', accountRoute)

// createConnection().then(() => {
//   console.log('Connected to DB');
//   // route: user
//   app.use('/api', userRoutes);
//   // route: Consultant
//   //app.use('/consultant', consultantRoute)
//   // route: Major
//   app.use('/major', createMajorRouter())

//   app.listen(parseInt(process.env.PORT as string), () => {
//     console.log(`Server is running on port: ${process.env.PORT}`)
//   });
// }).catch((error) => console.log('Error connecting to database:', error));

import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';
import dotenv from 'dotenv';
import { createLaborarityRouter } from './routes/laborarity_service.route';
import { createMajorRouter } from './routes/major.route';
import { createConsultantRouter } from './routes/consultant.route';
import { createRoleRouter } from './routes/role.route';



dotenv.config();

const app = express();
app.use(express.json());

async function startServer() {
  try {
    console.log('Attempting to connect to database...');
    await createConnection();
    console.log('Connected to PostgreSQL database');

    // Đăng ký các route
    app.use('/major', createMajorRouter());
    app.use('/laborarity_service', createLaborarityRouter());
    app.use('/consultant', createConsultantRouter());
    app.use('/role', createRoleRouter());

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to database:', error);
    process.exit(1);
  }
}

startServer();

