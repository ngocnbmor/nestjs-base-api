import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { RoleTypes } from '../../common/constants/role.const';
import { TokenTypes } from '../../common/constants/token.const';
import { NotFoundError } from '../../common/errors/not-found.error';
import LoginHistoryModel from '../../database/models/login-history.model';
import TokenModel from '../../database/models/token.model';
import UserModel from '../../database/models/user.model';
import { UpdatePasswordInput } from '../requests/users/update-password.input';

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(UserModel)
		private userModel: typeof UserModel,
		@InjectModel(LoginHistoryModel)
		private loginHistoryModel: typeof LoginHistoryModel,
		@InjectModel(TokenModel)
		private tokenModel: typeof TokenModel,

		private readonly jwtService: JwtService,
	) {}

	/**
   * @description Validate user
   * @param email
   * @param password
   */
	public async validateUser(
		email: string,
		password: string
	  ): Promise<null | UserModel> {
		const admin = await this.userModel.findOne({where: {email}});
		if (!admin) {
		  return null;
		}
		const isMatchPassword = await bcrypt.compare(password, admin.password);
		if (!isMatchPassword) {
		  return null;
		}
	
		return admin;
	  }

	/**
	 * @description Create new bearer token for user (use for login)
	 * @param user
	 */
	public async createBearerToken(user: UserModel): Promise<string> {
		const oldTokens = await this.tokenModel.findAll({
			where: {
				model_type: 'UserModel',
				model_id: user.id,
				token_type: TokenTypes.BEARER,
			},
		});
		for (const oldToken of oldTokens) {
			await oldToken.destroy();
		}

		await this.loginHistoryModel.create({
			model_type: 'UserModel',
			model_id: user.id,
			login_ip: '0.0.0.0',
			user_agent: '0.0.0.0',
		});

		const payload = {
			id: user.id,
			phone: user.phone,
			type: RoleTypes.USER,
		};
		const accessToken = this.jwtService.sign(payload);
		await this.tokenModel.create({
			model_type: 'UserModel',
			model_id: user.id,
			token_type: TokenTypes.BEARER,
			token_value: accessToken,
		});

		return accessToken;
	}

	/**
	 * @description Revoke all bearer tokens of user
	 * @param user
	 */
	public async revokeAllBearerTokens(user: UserModel): Promise<boolean> {
		// disable notification
		const tokens = await this.tokenModel.findAll({
			where: {
				token_type: TokenTypes.BEARER,
				model_type: 'UserModel',
				model_id: user.id,
			},
		});
		if (tokens.length > 0) {
			for (const token of tokens) {
				await token.destroy();
			}
		}

		return true;
	}

	/**
	 * @description Update user password using password reset token
	 * @param request
	 */
	public async updatePasswordUsingToken(request: UpdatePasswordInput): Promise<boolean> {
		const user = await this.findByResetPasswordToken(request.token);
		user.password = await bcrypt.hash(request.password, 10);
		await user.save();
		return true;
	}

	/**
	 * @description Find user by reset password token
	 * @param tokenString
	 * @private
	 */
	public async findByResetPasswordToken(tokenString: string): Promise<UserModel> {
		const token = await this.tokenModel.findOne({
			where: {
				model_type: 'UserModel',
				token_type: TokenTypes.RESET_PASSWORD,
				token_value: tokenString,
			},
		});
		if (!token) {
			throw new NotFoundError({
				message: `Couldn't find user with this token.`,
			});
		}

		return await this.userModel.findOne({
			where: {
				id: token.model_id,
			},
		});
	}
}
