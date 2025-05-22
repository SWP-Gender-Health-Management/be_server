// import { NextFunction, Request, Response } from 'express'
// import { HTTP_MESSAGE } from '~/constants/message'
// import { MajorService } from '~/services/major.service'

// class MajorController {
//   private majorService: MajorService;

//   constructor() {
//     this.majorService = new MajorService();
//   }

//   async getById(req: Request, res: Response, next: NextFunction) {
//     const result = await this.majorService.getMajorById(req.body.id)
//     res.status(200).json({
//       message: HTTP_MESSAGE.SUCCESS,
//       result
//     })
//   }

//   async putUpdate(req: Request, res: Response, next: NextFunction) {
//     const result = await this.majorService.updateMajor(req.body.id, req.body)
//     res.status(200).json({
//       message: HTTP_MESSAGE.SUCCESS,
//       result
//     })
//   }

//   async getAll(req: Request, res: Response, next: NextFunction) {
//     const result = await this.majorService.getAllMajors()
//     res.status(200).json({
//       message: HTTP_MESSAGE.SUCCESS,
//       result
//     })
//   }

//   async postCreate(req: Request, res: Response, next: NextFunction) {
//     const result = await this.majorService.createMajor(req.body);
//     res.status(200).json({
//       message: HTTP_MESSAGE.SUCCESS,
//       result
//     })
//   }

//   async delete(req: Request, res: Response, next: NextFunction) {
//     const result = await this.majorService.deleteMajor(req.body.id);
//     res.status(200).json({
//       message: HTTP_MESSAGE.SUCCESS,
//       result
//     })
//   }
// }

// const majorController = new MajorController();
// export default majorController;

import { NextFunction, Request, Response } from 'express';
import { HTTP_MESSAGE } from '~/constants/message';
import { MajorService } from '~/services/major.service';

export class MajorController {
  private majorService: MajorService;

  constructor() {
    this.majorService = new MajorService();
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.majorService.getMajorById(req.params.id); // Sửa: dùng req.params.id
      if (!result) {
        res.status(404).json({ message: 'Major not found' });
        return;
      }
      res.status(200).json({
        message: HTTP_MESSAGE.SUCCESS,
        result,
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async putUpdate(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.majorService.updateMajor(req.params.id, req.body); // Sửa: dùng req.params.id
      if (!result) {
        res.status(404).json({ message: 'Major not found' });
        return;
      }
      res.status(200).json({
        message: HTTP_MESSAGE.SUCCESS,
        result,
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.majorService.getAllMajors();
      res.status(200).json({
        message: HTTP_MESSAGE.SUCCESS,
        result,
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async postCreate(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.majorService.createMajor(req.body);
      res.status(201).json({
        // Sửa: dùng status 201 cho tạo mới
        message: HTTP_MESSAGE.SUCCESS,
        result,
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await this.majorService.deleteMajor(req.params.id); // Sửa: dùng req.params.id
      res.status(200).json({
        message: HTTP_MESSAGE.SUCCESS,
        result: null,
      });
    } catch (error: any) {
      res.status(error.message.includes('not found') ? 404 : 400).json({ message: error.message });
    }
  }
}