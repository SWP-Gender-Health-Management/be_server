import { Repository } from 'typeorm';
import { getRepository } from 'typeorm';
import { Consultant } from '../models/Entity/Consultant.entity';
import { Major } from '../models/Entity/Major.entity';

export class ConsultantService {
  private consultantRepository: Repository<Consultant>;
  private majorRepository: Repository<Major>;

  constructor() {
    this.consultantRepository = getRepository(Consultant);
    this.majorRepository = getRepository(Major);
  }

  async createConsultant(data: {
    account_id: string;
    major_id: string;
    yoe: number;
    status?: string;
  }): Promise<Consultant> {
    const { account_id, major_id, yoe, status } = data;

    if (!account_id) throw new Error('account_id is required');
    if (!major_id) throw new Error('major_id is required');
    if (yoe === undefined || yoe === null) throw new Error('yoe is required');

    const major = await this.majorRepository.findOne({ where: { major_id } });
    if (!major) {
      throw new Error('Major not found');
    }

    const consultant = this.consultantRepository.create({
      account_id,
      major,
      yoe,
      status: status || 'active',
    });
    return await this.consultantRepository.save(consultant);
  }

  async getAllConsultants(includeMajor: boolean = true): Promise<Consultant[]> {
    return await this.consultantRepository.find({
      relations: includeMajor ? ['major'] : [],
    });
  }

  async getConsultantById(consultant_id: string, includeMajor: boolean = true): Promise<Consultant | null> {
    const consultant = await this.consultantRepository.findOne({
      where: { consultant_id },
      relations: includeMajor ? ['major'] : [],
    });
    return consultant || null;
  }

  async updateConsultant(
    consultant_id: string,
    data: { account_id?: string; major_id?: string; yoe?: number; status?: string },
  ): Promise<Consultant | null> {
    const consultant = await this.consultantRepository.findOne({ where: { consultant_id } });
    if (!consultant) {
      throw new Error('Consultant not found');
    }

    if (data.account_id) {
      consultant.account_id = data.account_id;
    }
    if (data.yoe !== undefined) {
      consultant.yoe = data.yoe;
    }
    if (data.status) {
      consultant.status = data.status;
    }
    if (data.major_id) {
      const major = await this.majorRepository.findOne({ where: { major_id: data.major_id } });
      if (!major) {
        throw new Error('Major not found');
      }
      consultant.major = major;
    }

    return await this.consultantRepository.save(consultant);
  }

  async deleteConsultant(consultant_id: string): Promise<void> {
    const consultant = await this.consultantRepository.findOne({ where: { consultant_id } });
    if (!consultant) {
      throw new Error('Consultant not found');
    }

    await this.consultantRepository.remove(consultant);
  }

  async getFilteredConsultants(yoe: number, majorName?: string): Promise<Consultant[]> {
    const query = this.consultantRepository
      .createQueryBuilder('consultant')
      .leftJoinAndSelect('consultant.major', 'major')
      .where('consultant.yoe >= :yoe', { yoe });

    if (majorName) {
      query.andWhere('major.name = :majorName', { majorName });
    }

    return await query.getMany();
  }
}

// const consultantService = new ConsultantService();
// export default consultantService;