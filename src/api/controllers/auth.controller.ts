import { Body, Controller, HttpCode, Post, Put } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { OpenApiResponseStatus422 } from '../../common/dtos/validation.dto';
import { ServerErrorResponseSchema } from '../../common/errors/server.error';
import {
  ApiResponseStatus200,
  ApiResponseStatus200Schema,
  OpenApiResponseStatus200,
} from '../../common/responses/200.response';
import { ApiError } from '../../common/responses/common-error.response';
import { MailService } from '../../mail/services/mail.service';
import { ResetPasswordRequest } from '../requests/users/reset-password.request';
import { UpdatePasswordInput } from '../requests/users/update-password.input';
import { TokenResponse } from '../responses/users/token.response';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { LoginRequest } from '../requests/users/login.request';
import { Message } from '../../common/constants/message.const';

@Controller('auth')
@ApiTags('Authentication')
@ApiInternalServerErrorResponse({
  description: 'Server error',
  type: ServerErrorResponseSchema,
})
@ApiExtraModels(TokenResponse)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly mailService: MailService
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @HttpCode(200)
  @OpenApiResponseStatus422()
  @OpenApiResponseStatus200(TokenResponse)
  public async login(
    @Body() credentials: LoginRequest
  ): Promise<ApiResponseStatus200Schema<TokenResponse> | ApiError> {
    const admin = await this.authService.validateUser(
      credentials.email,
      credentials.password
    );
    if (!admin) {
      throw new ApiError(401, Message.MSG005);
    }

    const accessToken = await this.authService.createBearerToken(admin);
    return new ApiResponseStatus200(Message.MSG006, {
      access_token: accessToken,
      token_type: 'Bearer',
      expires_in: Number(process.env.JWT_EXPIRATION),
    });
  }

  @Post('reset-password')
  @HttpCode(200)
  @ApiOperation({ summary: 'Request new password for user (forgot password).' })
  @OpenApiResponseStatus200()
  @OpenApiResponseStatus422()
  public async resetPassword(
    @Body() request: ResetPasswordRequest
  ): Promise<ApiResponseStatus200<boolean>> {
    const user = await this.userService.findBy({
      where: { email: request.email },
    });
    if (user) {
      await this.mailService.sendRequestNewPassword(user);
    }

    return new ApiResponseStatus200('Request successfully');
  }

  @Put('reset-password')
  @HttpCode(200)
  @ApiOperation({ summary: 'Update new password using password reset token.' })
  @OpenApiResponseStatus200()
  @OpenApiResponseStatus422()
  public async updateNewPassword(
    @Body() request: UpdatePasswordInput
  ): Promise<any> {
    await this.authService.updatePasswordUsingToken(request);
    return new ApiResponseStatus200(
      'Your password has been updated successfully.'
    );
  }
}
