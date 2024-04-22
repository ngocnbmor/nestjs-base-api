import { Injectable } from '@nestjs/common';
import CategoriesModel from '../../database/models/categories.model';
import { CrudService } from '../../common/services/crud.service';
import { InjectModel } from '@nestjs/sequelize';
import { Attributes, FindAndCountOptions } from 'sequelize';
import { Request } from 'express';
import { PaginationResponse } from '../../common/dtos/pagination.dto';
import { CategoriesResponse } from '../responses/categories/categories.response';

@Injectable()
export class CategoriesService extends CrudService<CategoriesModel> {
  constructor(
    @InjectModel(CategoriesModel)
    protected model: typeof CategoriesModel
  ) {
    super();
  }

  public async getAll(
    options: Omit<FindAndCountOptions<Attributes<any>>, 'group'>,
    request: Request
  ): Promise<PaginationResponse<CategoriesResponse>> {
    const data = await this.getByQueryParams(options, request);
    const entities = data.rows.map((row) => new CategoriesResponse(row));
    return this.paginateResponse([entities, data.count], request);
  }
}
