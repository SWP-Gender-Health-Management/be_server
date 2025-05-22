import { NextFunction, Request, Response } from 'express'
import { HTTP_MESSAGE } from '~/constants/message'
import majorService from '~/services/major.service'

class MajorController {
    getById = async (req: Request, res: Response, next: NextFunction) => {
    const result = await majorService.getMajorById(req.body.id)
    res.status(200).json({
      message: HTTP_MESSAGE.SUCCESS,
      result
    })
  }

  putUpdate = async (req: Request, res: Response, next: NextFunction) => {
    const result = await majorService.updateMajor(req.body.id, req.body)
    res.status(200).json({
      message: HTTP_MESSAGE.SUCCESS,
      result
    })
  }

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    const result = await majorService.getAllMajors()
    res.status(200).json({
      message: HTTP_MESSAGE.SUCCESS,
      result
    })
  }

  postCreate = async (req: Request, res: Response, next: NextFunction) => {
    const result = await majorService.createMajor(req.body);
    res.status(200).json({
      message: HTTP_MESSAGE.SUCCESS,
      result
    })
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    const result = await majorService.deleteMajor(req.body.id);
    res.status(200).json({
      message: HTTP_MESSAGE.SUCCESS,
      result
    })
  }
}

const majorController = new MajorController();
export default majorController;