import { Request, Response } from 'express';
import { LaborarityServiceService } from '../services/laborarity_service.service';

export class LaborarityServiceController {
  private laborarityServiceService: LaborarityServiceService;

  constructor() {
    this.laborarityServiceService = new LaborarityServiceService();
  }

  async postCreate(req: Request, res: Response) {
    try {
      const { name, description, price } = req.body;
      const laborarityService = await this.laborarityServiceService.createLaborarityService({
        name,
        description,
        price,
      });
      res.status(201).json(laborarityService);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const laborarityServices = await this.laborarityServiceService.getAllLaborarityServices();
      res.json(laborarityServices);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const laborarityService = await this.laborarityServiceService.getLaborarityServiceById(req.params.id);
      if (!laborarityService) {
        res.status(404).json({ message: 'LaborarityService not found' });
        return;
      }
      res.json(laborarityService);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async putUpdate(req: Request, res: Response) {
    try {
      const { name, description, price } = req.body;
      const laborarityService = await this.laborarityServiceService.updateLaborarityService(req.params.id, {
        name,
        description,
        price,
      });
      if (!laborarityService) {
        res.status(404).json({ message: 'LaborarityService not found' });
        return;
      }
      res.json(laborarityService);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await this.laborarityServiceService.deleteLaborarityService(req.params.id);
      res.status(204).send();
    } catch (error: any) {
      res.status(error.message.includes('not found') ? 404 : 400).json({ message: error.message });
    }
  }
}