import { Repository } from 'typeorm';
import { getRepository } from 'typeorm';
import { Role } from '../models/Entity/Role.entity';

export class RoleService {
  private roleRepository: Repository<Role>;
  //private consultantRepository: Repository<Consultant>;

  constructor() {
    this.roleRepository = getRepository(Role);
    //this.consultantRepository = getRepository(Consultant);
  }

  async createRole(data: { name: string }): Promise<Role> {
    const { name } = data;

    if (!name) throw new Error('name is required');

    const role = this.roleRepository.create({ name });
    return await this.roleRepository.save(role);
  }

  async getAllRoles(): Promise<Role[]> {
    return await this.roleRepository.find();
  }

  async getRoleById(role_id: string): Promise<Role | null> {
    const role = await this.roleRepository.findOne({
      where: { role_id },
    });
    return role || null;
  }

  async updateRole(role_id: string, data: { name?: string }): Promise<Role | null> {
    const role = await this.roleRepository.findOne({ where: { role_id } });
    if (!role) {
      throw new Error('Role not found');
    }

    if (data.name) {
      role.name = data.name;
    }

    return await this.roleRepository.save(role);
  }

  async deleteRole(role_id: string): Promise<void> {
    // const consultantCount = await this.consultantRepository.count({
    //   where: { Role: { role_id } },
    // });
    // if (consultantCount > 0) {
    //   throw new Error('Cannot delete Role because it is referenced by Consultants');
    // }

    const role = await this.roleRepository.findOne({ where: { role_id } });
    if (!role) {
      throw new Error('Role not found');
    }

    await this.roleRepository.remove(role);
  }
}