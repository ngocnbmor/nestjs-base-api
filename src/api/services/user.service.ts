import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Request } from 'express';
import { PaginationResponse } from '../../common/dtos/pagination.dto';
import { CrudService } from '../../common/services/crud.service';
import UserModel from '../../database/models/user.model';
import { UserRepository } from '../repositories/users.repository';
import { UserResponse } from '../responses/users/user.response';

@Injectable()
export class UserService extends CrudService<UserModel> {
	constructor(
		@InjectModel(UserModel)
		protected model: typeof UserModel,

		private readonly userRepository: UserRepository,
	) {
		super();
	}

	public async deleteUser(user_id: string): Promise<void> {
		await this.userRepository.delete(user_id);
	}


	public async getAll(request: Request): Promise<PaginationResponse<UserResponse>> {
		const data = await this.userRepository.getListUsers(request);
		const entities = data.rows.map((row) => new UserResponse(row));
		return this.paginateResponse([entities, data.count], request);
	}

	public async findCurrentUser(id: string): Promise<UserModel> {
		return await this.userRepository.findUserById(id);
	}
}
