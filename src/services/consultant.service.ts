import 'reflect-metadata'
import { Consultant } from '../models/Entity/Consultant.entity';
import { Major } from '../models/Entity/Major.entity';
import { AppDataSource } from '~/config/database.config';
import { config } from 'dotenv'
config()
const consultantRepository = AppDataSource.getRepository(Consultant)
const majorRepository = AppDataSource.getRepository(Major)

class ConsultantService {
  // private consultantRepository: Repository<Consultant>;
  // private majorRepository: Repository<Major>;

  // constructor() {
  //   this.consultantRepository = getRepository(Consultant);
  //   this.majorRepository = getRepository(Major);
  // }

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

    const major = await majorRepository.findOne({ where: { major_id } });
    if (!major) {
      throw new Error('Major not found');
    }

    const consultant = consultantRepository.create({
      account_id,
      major,
      yoe,
      status: status || 'active',
    });
    return await consultantRepository.save(consultant);
  }

  async getAllConsultants(includeMajor: boolean = true): Promise<Consultant[]> {
    return await consultantRepository.find({
      relations: includeMajor ? ['major'] : [],
    });
  }

  async getConsultantById(consultant_id: string, includeMajor: boolean = true): Promise<Consultant | null> {
    const consultant = await consultantRepository.findOne({
      where: { consultant_id },
      relations: includeMajor ? ['major'] : [],
    });
    return consultant || null;
  }

  async updateConsultant(
    consultant_id: string,
    data: { account_id?: string; major_id?: string; yoe?: number; status?: string },
  ): Promise<Consultant | null> {
    const consultant = await consultantRepository.findOne({ where: { consultant_id } });
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
      const major = await majorRepository.findOne({ where: { major_id: data.major_id } });
      if (!major) {
        throw new Error('Major not found');
      }
      consultant.major = major;
    }

    return await consultantRepository.save(consultant);
  }

  async deleteConsultant(consultant_id: string): Promise<void> {
    const consultant = await consultantRepository.findOne({ where: { consultant_id } });
    if (!consultant) {
      throw new Error('Consultant not found');
    }

    await consultantRepository.remove(consultant);
  }

  async getFilteredConsultants(yoe: number, majorName?: string): Promise<Consultant[]> {
    const query = consultantRepository
      .createQueryBuilder('consultant')
      .leftJoinAndSelect('consultant.major', 'major')
      .where('consultant.yoe >= :yoe', { yoe });

    if (majorName) {
      query.andWhere('major.name = :majorName', { majorName });
    }

    return await query.getMany();
  }
}

const consultantService = new ConsultantService();
export default consultantService;