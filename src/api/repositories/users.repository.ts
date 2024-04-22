import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Request } from 'express';
import { Attributes, FindAndCountOptions } from 'sequelize';
import { BaseRepository } from '../../common/repositories/base.repository';
import UserModel from '../../database/models/user.model';
import { NotFoundError } from '../../common/errors/not-found.error';
import { Message } from '../../common/constants/message.const';

@Injectable()
export class UserRepository extends BaseRepository<UserModel> {
	constructor(
		@InjectModel(UserModel)
		protected readonly userModel: typeof UserModel
	) {
		super();
		this.model = this.userModel;
	}

	public async getListUsers(request: Request): Promise<{ rows: UserModel[]; count: number }> {
		const options: Omit<FindAndCountOptions<Attributes<UserModel>>, 'group'> = {};
		return await this.findByQueryParams<UserModel>(
			{
				...options,
			},
			request
		);
	}

	public async findUserById(user_id: string): Promise<UserModel> {
		return await this.userModel.findOne({
			where: {
				id: user_id,
			},
		});
	}

	public async findUserByIdSimple(user_id: string): Promise<UserModel> {
		return await this.userModel.findOne({
			where: {
				id: user_id,
			},
			attributes: ['id', 'name', 'phone', 'image'],
		});
	}

	public async findUserHaveNoStoreById(user_id: string): Promise<UserModel> {
		return await this.userModel.findOne({
			where: {
				id: user_id,
				is_owner_store: false,
			},
			attributes: ['id', 'name', 'image'],
		});
	}
}
