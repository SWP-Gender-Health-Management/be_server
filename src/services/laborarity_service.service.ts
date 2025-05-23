import { Repository } from 'typeorm';
import { getRepository } from 'typeorm';
import { LaborarityService } from '../models/Entity/LaborarityService.entity';

export class LaborarityServiceService {
  private laborarityServiceRepository: Repository<LaborarityService>;

  constructor() {
    this.laborarityServiceRepository = getRepository(LaborarityService);
  }

  async createLaborarityService(data: { name: string; description: string; price: number }): Promise<LaborarityService> {
    let { name, description, price } = data;

    if (!name) throw new Error('name is required');
    if (!description) {
      description = "";
    }
    if (price === undefined || price === null) throw new Error('price is required');
    if (price < 0) throw new Error('price must be non-negative');

    const laborarityService = this.laborarityServiceRepository.create({ name, description, price });
    return await this.laborarityServiceRepository.save(laborarityService);
  }

  async getAllLaborarityServices(): Promise<LaborarityService[]> {
    return await this.laborarityServiceRepository.find();
  }

  async getLaborarityServiceById(laborarity_id: string): Promise<LaborarityService | null> {
    const laborarityService = await this.laborarityServiceRepository.findOne({ where: { laborarity_id } });
    return laborarityService || null;
  }

  async updateLaborarityService(
    laborarity_id: string,
    data: { name?: string; description?: string; price?: number }
  ): Promise<LaborarityService | null> {
    const laborarityService = await this.laborarityServiceRepository.findOne({ where: { laborarity_id } });
    if (!laborarityService) {
      throw new Error('LaborarityService not found');
    }

    if (data.name) {
      laborarityService.name = data.name;
    }
    if (data.description) {
      laborarityService.description = data.description;
    }
    if (data.price !== undefined) {
      if (data.price < 0) throw new Error('price must be non-negative');
      laborarityService.price = data.price;
    }

    return await this.laborarityServiceRepository.save(laborarityService);
  }

  async deleteLaborarityService(laborarity_id: string): Promise<void> {
    const laborarityService = await this.laborarityServiceRepository.findOne({ where: { laborarity_id } });
    if (!laborarityService) {
      throw new Error('LaborarityService not found');
    }

    await this.laborarityServiceRepository.remove(laborarityService);
  }
}