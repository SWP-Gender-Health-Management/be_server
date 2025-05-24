import { NextFunction, Request, Response } from 'express';
import { HTTP_MESSAGE } from '~/constants/message';
import { RoleService } from '~/services/role.service';

export class RoleController {
  private roleService: RoleService;

  constructor() {
    this.roleService = new RoleService();
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.roleService.getRoleById(req.params.id); // Sửa: dùng req.params.id
      if (!result) {
        res.status(404).json({ message: 'Role not found' });
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
      const result = await this.roleService.updateRole(req.params.id, req.body); // Sửa: dùng req.params.id
      if (!result) {
        res.status(404).json({ message: 'Role not found' });
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
      const result = await this.roleService.getAllRoles();
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
      const result = await this.roleService.createRole(req.body);
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
      await this.roleService.deleteRole(req.params.id); // Sửa: dùng req.params.id
      res.status(200).json({
        message: HTTP_MESSAGE.SUCCESS,
        result: null,
      });
    } catch (error: any) {
      res.status(error.message.includes('not found') ? 404 : 400).json({ message: error.message });
    }
  }
}