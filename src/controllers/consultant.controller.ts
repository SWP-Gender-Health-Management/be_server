import { NextFunction, Request, Response } from 'express'
import { HTTP_MESSAGE } from '~/constants/message'
import { ConsultantService } from '~/services/consultant.service'

export class ConsultantController {

  private consultantService: ConsultantService;

  constructor() {
    this.consultantService = new ConsultantService();
  }

  getById = async (req: Request, res: Response, next: NextFunction) => {
    const result = await this.consultantService.getConsultantById(req.params.id)
    res.status(200).json({
      message: HTTP_MESSAGE.SUCCESS,
      result
    })
  }

  putUpdate = async (req: Request, res: Response, next: NextFunction) => {
    const result = await this.consultantService.updateConsultant(req.params.id, req.body)
    res.status(200).json({
      message: HTTP_MESSAGE.SUCCESS,
      result
    })
  }

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    const result = await this.consultantService.getAllConsultants()
    res.status(200).json({
      message: HTTP_MESSAGE.SUCCESS,
      result
    })
  }

  postCreate = async (req: Request, res: Response, next: NextFunction) => {
    const result = await this.consultantService.createConsultant(req.body);
    res.status(200).json({
      message: HTTP_MESSAGE.SUCCESS,
      result
    })
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    const result = await this.consultantService.deleteConsultant(req.params.id);
    res.status(200).json({
      message: HTTP_MESSAGE.SUCCESS,
      result
    })
  }
}

// const consultantController = new ConsultantController();
// export default consultantController;