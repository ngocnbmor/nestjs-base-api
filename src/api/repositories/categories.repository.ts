import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepository } from '../../common/repositories/base.repository';
import CategoriesModel from '../../database/models/categories.model';

@Injectable()
export class CategoriesRepository extends BaseRepository<CategoriesModel> {
  constructor(
    @InjectModel(CategoriesModel)
    protected readonly categoriesModel: typeof CategoriesModel
  ) {
    super();
    this.model = this.categoriesModel;
  }

  public async getCategoryById(id: string): Promise<CategoriesModel> {
    return await this.categoriesModel.findOne({
      where: {
        id,
      },
      attributes: ['id', 'category_name'],
    });
  }
}
