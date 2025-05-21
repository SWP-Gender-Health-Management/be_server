import { NextFunction, Request, Response } from 'express'
import { USERS_MESSAGES } from '~/constants/message'
import accountService from '~/services/account.service'
import refreshTokenService from '~/services/refresh_token.service'

export const registerController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await accountService.createAccount(req.body)
  const { account_id, refreshToken } = result
  await refreshTokenService.createRefreshToken({ account_id: account_id, token: refreshToken })
  res.status(200).json({
    message: USERS_MESSAGES.USER_CREATED_SUCCESS,
    result
  })
}

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await accountService.login(req.body)
  res.status(200).json({
    message: USERS_MESSAGES.USER_LOGGED_IN_SUCCESS,
    result
  })
}
