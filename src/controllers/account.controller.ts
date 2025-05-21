import { NextFunction, Request, Response } from 'express'
import { USERS_MESSAGES } from '~/constants/message'
import accountService from '~/services/account.service'
import db_service from '~/services/database.service'

export const registerController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await accountService.createAccount(req.body)
  res.status(200).json({
    message: USERS_MESSAGES.USER_CREATED_SUCCESS,
    result
  })
}

export const deleteAnAccountController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await accountService.deleteAnAccountById(req.body.account_id)
  res.status(200).json({
    message: USERS_MESSAGES.USER_CREATED_SUCCESS,
    result
  })
}

export const getAccountsListController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await accountService.getAccountsList(req.body.account_ids)
  res.status(200).json({
    message: USERS_MESSAGES.USER_CREATED_SUCCESS,
    result
  })
}

export const putUpdateAccountController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await accountService.updateAccount(req.body)
  res.status(200).json({
    message: USERS_MESSAGES.USER_CREATED_SUCCESS,
    result
  })
}


