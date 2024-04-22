import {
	Body,
	Controller,
	Get,
	HttpCode,
	Post,
	Request,
	UseGuards,
} from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiInternalServerErrorResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger';
import {
	OpenApiResponseStatus204,
	OpenApiResponseStatus401,
} from '../../common/dtos/response-schema.dto';
import { OpenApiResponseStatus422 } from '../../common/dtos/validation.dto';
import { ServerErrorResponseSchema } from '../../common/errors/server.error';
import {
	ApiResponseStatus200,
	ApiResponseStatus200Schema,
	OpenApiResponseStatus200,
} from '../../common/responses/200.response';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UpdateProfileRequest } from '../requests/users/update-profile.request';
import { ProfileResponse } from '../responses/users/profile.response';
import { AccountService } from '../services/account.service';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { JWTRequest } from '../strageries/jwt.strategy';
import { Message } from '../../common/constants/message.const';

@Controller('accounts')
@ApiTags('Accounts')
@ApiInternalServerErrorResponse({
	description: 'Server error',
	type: ServerErrorResponseSchema,
})
@ApiBearerAuth('Bearer')
@UseGuards(JwtAuthGuard)
export class AccountController {
	constructor(
		protected readonly userService: UserService,
		protected readonly authService: AuthService,
		private readonly accountService: AccountService
	) {}

	@Get('profile')
	@ApiOperation({ summary: 'Get user profile by access token.' })
	@HttpCode(200)
	@OpenApiResponseStatus200(ProfileResponse)
	@OpenApiResponseStatus401()
	public async getProfile(
		@Request() req: JWTRequest
	): Promise<ApiResponseStatus200Schema<ProfileResponse>> {
		const profileResponse = await this.accountService.getProfile(req.user.attributes.id);
		return new ApiResponseStatus200(Message.MSG003, profileResponse);
	}

	@Post('profile')
	@ApiOperation({ summary: 'Update current user profile.' })
	@HttpCode(200)
	@OpenApiResponseStatus200(ProfileResponse)
	@OpenApiResponseStatus422()
	@OpenApiResponseStatus401()
	public async updateProfile(
		@Body() request: UpdateProfileRequest,
		@Request() req: any
	): Promise<ApiResponseStatus200Schema<ProfileResponse>> {
		const user = await this.userService.update(req.user.attributes.id, request);
		return new ApiResponseStatus200(Message.MSG003, new ProfileResponse(user));
	}

	
	@Post('logout')
	@HttpCode(204)
	@ApiOperation({ summary: 'User logout.' })
	@OpenApiResponseStatus204()
	@OpenApiResponseStatus401()
	public async logout(@Request() req: any): Promise<any> {
		await this.authService.revokeAllBearerTokens(req.user.attributes);
		return true;
	}
}
