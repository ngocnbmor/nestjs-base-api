import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Request } from 'express';
import { Op } from 'sequelize';
import { Attributes, FindAndCountOptions } from 'sequelize/types/model';
import { BaseRepository } from '../../common/repositories/base.repository';
import AdminModel from '../../database/models/admin.model';
import UserModel from '../../database/models/user.model';

@Injectable()
export class AdminRepository extends BaseRepository<AdminModel> {
  constructor(
    @InjectModel(UserModel) protected readonly userModel: typeof UserModel,
    @InjectModel(AdminModel) protected readonly adminModel: typeof AdminModel
  ) {
    super();
    this.model = this.userModel;
  }

  public async getListUser(
    request: Request
  ): Promise<{ rows: UserModel[]; count: number }> {
    const options: Omit<
      FindAndCountOptions<Attributes<UserModel>>,
      'group'
    > = {};
    const { name } = request.query;
    const whereOptions: any = {};

    if (!!name) {
      if (!whereOptions.name) {
        whereOptions.name = {};
      }
      whereOptions.name[Op.like] = `%${name}%`;
    }

    options.where = whereOptions;

    return await this.findByQueryParams<UserModel>(
      {
        ...options,
        order: [['created_at', 'desc']],
      },
      request
    );
  }

  public async getAdminById(id: string): Promise<AdminModel> {
    return this.adminModel.findOne({
      where: { id },
      attributes: ['id', 'name', 'image'],
    });
  }

  public async getAdminForChat(): Promise<AdminModel> {
    const admins = await this.adminModel.findAll({
      attributes: ['id', 'name', 'image'],
    });
    return admins[0];
  }
}
