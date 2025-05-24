// import { Pool, PoolConfig } from 'pg'
// import dotenv from 'dotenv'

// dotenv.config()

// class DatabaseService {
//   // Database configuration
//   private dbConfig: PoolConfig = {
//     user: process.env.DB_USER as string,
//     host: process.env.DB_HOST as string,
//     database: process.env.DB_NAME as string,
//     password: process.env.DB_PASSWORD as string,
//     port: parseInt(process.env.DB_PORT as string),
//     // Optional: Configure connection pool
//     max: 20, // Maximum number of clients in the pool
//     idleTimeoutMillis: 300000, // How long a client is allowed to remain idle before being closed
//     connectionTimeoutMillis: 20000 // How long to wait for a connection
//   }

//   // Create a new pool instance
//   pool = new Pool(this.dbConfig)

//   // Test the connection
//   async connect() {
//     await this.pool.connect((err: any, client: any, release: any) => {
//       if (err) {
//         console.error('Error connecting to the database:', err.stack)
//       } else {
//         console.log('Successfully connected to PostgreSQL database', this.dbConfig.port)
//         release()
//       }
//     })
//   }

//   // Export the pool for use in other files
//   // export default pool

//   // Helper function to execute queries
//   query = async (text: string, params?: any[]) => {
//     const start = Date.now()
//     try {
//       const res = await this.pool.query(text, params)
//       const duration = Date.now() - start
//       console.log('Executed query', { text, duration, rows: res.rowCount })
//       return res
//     } catch (error) {
//       console.error('Error executing query:', error)
//       throw error
//     }
//   }
// }

// const db_service = new DatabaseService()
// export default db_service
