import { NextFunction, Request, Response } from 'express'
import { HTTP_MESSAGE } from '~/constants/message'
import consultantService from '~/services/consultant.service'

class ConsultantController {
  getById = async (req: Request, res: Response, next: NextFunction) => {
    const result = await consultantService.getConsultantById(req.body.con_id)
    res.status(200).json({
      message: HTTP_MESSAGE.SUCCESS,
      result
    })
  }

  putUpdate = async (req: Request, res: Response, next: NextFunction) => {
    const result = await consultantService.getConsultantById(req.body)
    res.status(200).json({
      message: HTTP_MESSAGE.SUCCESS,
      result
    })
  }
}

const consultantController = new ConsultantController();
export default consultantController;