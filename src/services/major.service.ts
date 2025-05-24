// import { Major } from '../models/Entity/Major.entity';
// import { Consultant } from '../models/Entity/Consultant.entity';
// import { Repository } from 'typeorm';
// import { getRepository } from 'typeorm';

// export class MajorService {
//   private majorRepository: Repository<Major>;
//   private consultantRepository: Repository<Consultant>;

//   constructor() {
//     this.majorRepository = getRepository(Major);
//     this.consultantRepository = getRepository(Consultant);
//   }

//   async createMajor(data: { name: string }): Promise<Major> {
//     const { name } = data;

//     // Kiểm tra trường bắt buộc
//     if (!name) throw new Error('name is required');

//     // major_id sẽ được tự động sinh bởi @BeforeInsert
//     const major = this.majorRepository.create({ name });
//     return await this.majorRepository.save(major);
//   }

//   async getAllMajors(): Promise<Major[]> {
//     return await this.majorRepository.find();
//   }

//   async getMajorById(major_id: string): Promise<Major | null> {
//     const major = await this.majorRepository.findOne({
//       where: { major_id }
//     });
//     return major || null;
//   }

//   async updateMajor(major_id: string, data: { name?: string }): Promise<Major | null> {
//     const major = await this.majorRepository.findOne({ where: { major_id } });
//     if (!major) {
//       throw new Error('Major not found');
//     }

//     if (data.name) {
//       major.name = data.name;
//     }

//     return await this.majorRepository.save(major);
//   }

//   async deleteMajor(major_id: string): Promise<void> {
//     // Kiểm tra có Consultant liên kết không
//     const consultantCount = await this.consultantRepository.count({
//       where: { major: { major_id } },
//     });
//     if (consultantCount > 0) {
//       throw new Error('Cannot delete Major because it is referenced by Consultants');
//     }

//     const major = await this.majorRepository.findOne({ where: { major_id } });
//     if (!major) {
//       throw new Error('Major not found');
//     }

//     await this.majorRepository.remove(major);
//   }
// }


import 'reflect-metadata'
import { Major } from '../models/Entity/Major.entity';
import { Consultant } from '../models/Entity/Consultant.entity';
import { AppDataSource } from '~/config/database.config';


  const majorRepository = AppDataSource.getRepository(Major);

  const consultantRepository = AppDataSource.getRepository(Consultant);

 class MajorService {
  // private majorRepository: Repository<Major>;
  // private consultantRepository: Repository<Consultant>;

  // constructor() {
  //   this.majorRepository = getRepository(Major);
  //   this.consultantRepository = getRepository(Consultant);
  // }

  async createMajor(data: { name: string }): Promise<Major> {
    const { name } = data;

    if (!name) throw new Error('name is required');

    const major = majorRepository.create({ name });
    return await majorRepository.save(major);
  }

  async getAllMajors(): Promise<Major[]> {
    return await majorRepository.find();
  }

  async getMajorById(major_id: string): Promise<Major | null> {
    const major = await majorRepository.findOne({
      where: { major_id },
    });
    return major || null;
  }

  async updateMajor(major_id: string, data: { name?: string }): Promise<Major | null> {
    const major = await majorRepository.findOne({ where: { major_id } });
    if (!major) {
      throw new Error('Major not found');
    }

    if (data.name) {
      major.name = data.name;
    }

    return await majorRepository.save(major);
  }

  async deleteMajor(major_id: string): Promise<void> {
    const consultantCount = await consultantRepository.count({
      where: { major: { major_id } },
    });
    if (consultantCount > 0) {
      throw new Error('Cannot delete Major because it is referenced by Consultants');
    }

    const major = await majorRepository.findOne({ where: { major_id } });
    if (!major) {
      throw new Error('Major not found');
    }

    await majorRepository.remove(major);
  }
}

const majorService = new MajorService();
export default majorService;