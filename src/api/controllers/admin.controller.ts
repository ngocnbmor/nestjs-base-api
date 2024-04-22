import {
	Controller,
	Get,
	HttpCode,
	NotFoundException,
	Param,
	Req,
	UseGuards,
} from '@nestjs/common';
import { AdminService } from '../services/admin.service';
import {
	PaginationResponse,
} from '../../common/dtos/pagination.dto';
import { Request as ExpressRequest } from 'express';
import { ApiBearerAuth, ApiExcludeController, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
	ApiResponseStatus200,
	ApiResponseStatus200Schema,
	OpenApiResponseStatus200,
} from '../../common/responses/200.response';
import { Roles } from '../../common/decorators/roles.decorator';
import { RoleTypes } from '../../common/constants/role.const';
import { UserResponse } from '../responses/users/user.response';
import { OpenApiResponseStatus404 } from '../../common/responses/404.response';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { Message } from '../../common/constants/message.const';
import { RolesGuard } from '../guards/roles.guard';

@Controller('/admins')
@ApiTags('Admins Management')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('Bearer')
@ApiExcludeController()
export class AdminController {
	constructor(
		private readonly adminService: AdminService,
	) {}

	@Get('/list/users')
	@Roles(RoleTypes.ADMIN)
	@HttpCode(200)
	@ApiOperation({ summary: 'Get list user' })
	@OpenApiResponseStatus200(UserResponse)
	@OpenApiResponseStatus404()
	public async listUser(@Req() request: ExpressRequest): Promise<PaginationResponse<UserResponse>> {
		return await this.adminService.getListUser(request);
	}

	@Get('/list/users/:id')
	@Roles(RoleTypes.ADMIN)
	@HttpCode(200)
	@ApiOperation({ summary: 'Get detail user' })
	@OpenApiResponseStatus200(UserResponse)
	@OpenApiResponseStatus404()
	public async getDetailUser(
		@Param('id') id: string
	): Promise<ApiResponseStatus200Schema<UserResponse>> {
		const user = await this.adminService.getDetailUser(id);
		if (!user) {
			throw new NotFoundException({ message: Message.MSG001 });
		}
		return new ApiResponseStatus200(Message.MSG002, new UserResponse(user));
	}
}
