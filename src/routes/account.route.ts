import { Router } from 'express'
import { loginController, registerController } from '~/controllers/account.controller'
import { validateLogin, validateRegister } from '~/middlewares/account.middleware'
import wrapRequestHandler from '~/utils/handle'

const cusRoute = Router()

/*
  Description: register a new account
  Path: /register
  Method: POST
  Body: {
    email: string
    password: string
    confirmPassword: string
  }
*/
cusRoute.post('/register', validateRegister, wrapRequestHandler(registerController))

/*
  Description: login to the account
  Path: /login
  Method: POST
  Body: {
    email: string
    password: string
  }
*/
cusRoute.post('/login', validateLogin, wrapRequestHandler(loginController))

export default cusRoute
