import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Req,
	Request,
	UseGuards,
} from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiInternalServerErrorResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger';
import { Request as ExpressRequest } from 'express';
import {
	OpenApiResponseWithPagination,
	PaginationResponse,
} from '../../common/dtos/pagination.dto';
import { OpenApiResponseStatus401 } from '../../common/dtos/response-schema.dto';
import { ServerErrorResponseSchema } from '../../common/errors/server.error';
import {
	ApiResponseStatus200,
	ApiResponseStatus200Schema,
	OpenApiResponseStatus200,
} from '../../common/responses/200.response';
import { OpenApiResponseStatus404 } from '../../common/responses/404.response';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { UserResponse } from '../responses/users/user.response';
import { UserService } from '../services/user.service';
import { JWTRequest } from '../strageries/jwt.strategy';

@Controller('users')
@ApiTags('Users')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('Bearer')
@ApiInternalServerErrorResponse({
	description: 'Server error',
	type: ServerErrorResponseSchema,
})
@OpenApiResponseStatus401()
export class UserController {
	constructor(
		private readonly userService: UserService,
	) {}

	@Get()
	@HttpCode(200)
	@ApiOperation({ summary: 'Get all users' })
	@OpenApiResponseWithPagination(UserResponse)
	public async index(@Req() request: ExpressRequest): Promise<PaginationResponse<UserResponse>> {
		return this.userService.getAll(request);
	}

	@Get(':id')
	@HttpCode(200)
	@ApiOperation({ summary: 'Get user detail' })
	@OpenApiResponseStatus200(UserResponse)
	@OpenApiResponseStatus404()
	public async show(
		@Request() req: JWTRequest,
		@Param('id') id: string
	): Promise<ApiResponseStatus200Schema<UserResponse>> {
		const user = await this.userService.findById(id);
		return new ApiResponseStatus200('Get user successfully.', user);
	}

	@Delete()
	@HttpCode(200)
	@ApiOperation({ summary: 'Delete your account' })
	@OpenApiResponseStatus404()
	public async destroy(@Request() req: JWTRequest): Promise<ApiResponseStatus200Schema<boolean>> {
		return new ApiResponseStatus200(
			'User deleted successfully.',
			await this.userService.deleteUser(req.user.attributes.id)
		);
	}
}
