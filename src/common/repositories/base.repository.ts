import { Injectable, NotFoundException } from '@nestjs/common';
import { Request } from 'express';
import { Op } from 'sequelize';
import { Model } from 'sequelize-typescript';
import { Attributes, CountOptions, FindAndCountOptions, FindOptions } from 'sequelize/types/model';
import { PaginationResponse } from '../dtos/pagination.dto';

@Injectable()
export class BaseRepository<M extends Model> {
  protected model: any;

  public async findById(id: string): Promise<M> {
    return await this.model.findOne({
      where: { id },
    });
  }

  public async findBy(options: FindOptions<Attributes<M>>): Promise<M> {
    return await this.model.findOne(options);
  }

  public async findAll(options: FindOptions<Attributes<M>>): Promise<M[]> {
    return this.model.findAll(options);
  }

  public async count<M extends Model>(
    options: Omit<CountOptions<Attributes<M>>, 'group'>
  ): Promise<number> {
    return await this.model.count(options);
  }

  /**
   * Find model by attribute
   * @param {string} key
   * @param {string} value
   * @param {FindOptions} [options]
   * @return Promise<any>
   */
  public async findByAttribute<M extends Model>(
    key: string,
    value: any,
    options?: FindOptions<Attributes<M>>
  ): Promise<M> {
    const model = await this.model.findOne({
      ...options,
      where: { [key]: value },
    });
    if (!model) {
      throw new NotFoundException('Data not found.');
    }
    return model;
  }

  /**
   * Find model by query params
   */
  public async findByQueryParams<M extends Model>(
    options: Omit<FindAndCountOptions<Attributes<any>>, 'group'>,
    request: Request
  ): Promise<{ rows: M[]; count: number }> {
    if (!options.where) {
      options.where = {};
    }

    if (!!request.query.s) {
      const attributes = this.model.getAttributes();
      const searchLikeGroup = {};
      Object.keys(attributes).map((attrName) => {
        const attrType = attributes[attrName].type.key.toLowerCase();
        if (attrType === 'string' || attrType === 'text') {
          searchLikeGroup[attrName] = {
            [Op.like]: `%${request.query.s}%`,
          };
        }
      });
      options.where[Op.or] = searchLikeGroup;
    }

    const limit = request.query.limit ? Number(request.query.limit) : 15;
    const page = request.query.page ? Number(request.query.page) : 1;
    const skip = (Number(page) - 1) * Number(limit);
    return await this.model.findAndCountAll({
      ...options,
      limit,
      offset: skip,
      distinct: true,
    });
  }
  public async delete(id: string): Promise<void> {
    const model = await this.findById(id);
    await model.destroy();
  }

  public async create(attrs: any): Promise<M> {
    return this.model.create(attrs);
  }

  public async update(id: string, attrs: any): Promise<M> {
    const model = await this.findById(id);
    await model.update(attrs);
    return model;
  }

  protected paginateResponse<T>(
    data: [T[], number],
    request: Request
  ): PaginationResponse<T> {
    const limit = request.query.limit ? Number(request.query.limit) : 15;
    const page = request.query.page ? Number(request.query.page) : 1;
    const [result, total] = data;
    const lastPage = Math.ceil(total / limit);
    const nextPage = page + 1 > lastPage ? undefined : page + 1;
    const prevPage = page - 1 < 1 ? undefined : page - 1;
    return new PaginationResponse(result, {
      count: total,
      currentPage: page,
      limit,
      nextPage,
      prevPage,
      lastPage,
    });
  }
}
