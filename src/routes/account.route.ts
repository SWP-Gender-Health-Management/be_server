import { Router } from 'express'
import { registerController } from '~/controllers/account.controller'
import { validateRegister } from '~/middlewares/account.middleware'
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

export default cusRoute
