import { NextFunction, Request, Response } from 'express'
import { HTTP_MESSAGE } from '~/constants/message'
import consultantService from '~/services/consultant.service'


export const getConsultantByIdController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await consultantService.getConsultantById(req.body.con_id)
  res.status(200).json({
    message: HTTP_MESSAGE.SUCCESS,
    result
  })
}

export const putUpdateConsultantController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await consultantService.getConsultantById(req.body)
  res.status(200).json({
    message: HTTP_MESSAGE.SUCCESS,
    result
  })
}