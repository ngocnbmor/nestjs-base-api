import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { PaginationResponse } from '../../common/dtos/pagination.dto';
import { CrudService } from '../../common/services/crud.service';
import AdminModel from '../../database/models/admin.model';
import LoginHistoryModel from '../../database/models/login-history.model';
import UserModel from '../../database/models/user.model';
import { AdminRepository } from '../repositories/admin.repository';
import { AdminCreateRequest } from '../requests/admins/admin-create.request';
import { AdminResponse } from '../responses/admins/admin.response';
import { UserResponse } from '../responses/users/user.response';

@Injectable()
export class AdminService extends CrudService<AdminModel> {
	constructor(
		@InjectModel(AdminModel)
		protected model: typeof AdminModel,
		@InjectModel(UserModel) protected readonly userModel: typeof UserModel,
		private readonly adminRepository: AdminRepository,
	) {
		super();
	}

	public async create(attrs: AdminCreateRequest): Promise<AdminModel> {
		const admin = new AdminModel();
		admin.name = attrs.name;
		admin.email = attrs.email;
		admin.password = await bcrypt.hash(attrs.password, 10);
		await admin.save();
		return admin;
	}

	public async getAll(request: Request): Promise<PaginationResponse<AdminResponse>> {
		const data = await this.getByQueryParams(
			{
				include: [
					{
						model: LoginHistoryModel,
						separate: true, // <--- Run separate query
						limit: 5,
					},
				],
			},
			request
		);
		const entities = data.rows.map((row) => new AdminResponse(row));
		return this.paginateResponse([entities, data.count], request);
	}

	public async getAdminById(id: string): Promise<AdminModel> {
		return await this.adminRepository.getAdminById(id);
	}

	public async findCurrentAdmin(id: string): Promise<AdminModel> {
		return this.model.findOne({
			where: { id },
		});
	}

	public async getListUser(request: Request): Promise<PaginationResponse<UserResponse>> {
		const data = await this.adminRepository.getListUser(request);
		const entities = data.rows.map((row) => new UserResponse(row));
		return this.paginateResponse([entities, data.count], request);
	}

	public async getDetailUser(id: string): Promise<UserModel> {
		return await this.userModel.findOne({
			where: { id },
		});
	}

}
