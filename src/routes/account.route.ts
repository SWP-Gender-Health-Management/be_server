import { Router } from 'express'
import {
  registerController,
  deleteAnAccountController,
  getAccountsListController,
  putUpdateAccountController
} from '~/controllers/account.controller'
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

/*
  Description: Delete a account
  Path: /account
  Method: Delete
  Body: {
    account_id: string
  }
*/
cusRoute.delete('/delete', wrapRequestHandler(deleteAnAccountController))

/*
  Description: Get a list of accounts
  Path: /accounts
  Method: Get
  Body: {
    account_ids: []
  }
*/
cusRoute.get('/getList', wrapRequestHandler(getAccountsListController))

/*
  Description: register a new account
  Path: /register
  Method: POST
  Body: {
    account_id: string
    email: string
    password: string
    role: string
  }
*/
cusRoute.put('/update', wrapRequestHandler(putUpdateAccountController))

export default cusRoute
