import {Injectable} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {JwtService} from '@nestjs/jwt';
import {InjectModel} from '@nestjs/sequelize';
import LoginHistoryModel from '../../database/models/login-history.model';
import TokenModel from '../../database/models/token.model';
import {TokenTypes} from '../../common/constants/token.const';
import {NotFoundError} from '../../common/errors/not-found.error';
import AdminModel from '../../database/models/admin.model';
import {RoleTypes} from '../../common/constants/role.const';

@Injectable()
export class AuthAdminService {
  constructor(
    @InjectModel(AdminModel)
    private adminModel: typeof AdminModel,
    @InjectModel(LoginHistoryModel)
    private loginHistoryModel: typeof LoginHistoryModel,
    @InjectModel(TokenModel)
    private tokenModel: typeof TokenModel,
    private jwtService: JwtService
  ) {
  }

  /**
   * @description Validate admin
   * @param email
   * @param password
   */
  public async validateAdmin(
    email: string,
    password: string
  ): Promise<null | AdminModel> {
    const admin = await this.adminModel.findOne({where: {email}});
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
   * @description Create new bearer token for admin (use for login)
   * @param admin
   */
  public async createBearerToken(admin: AdminModel): Promise<string> {
    const oldTokens = await this.tokenModel.findAll({
      where: {
        model_type: 'AdminModel',
        model_id: admin.id,
        token_type: TokenTypes.BEARER,
      },
    });
    for (const oldToken of oldTokens) {
      await oldToken.destroy();
    }

    await this.loginHistoryModel.create({
      model_type: 'AdminModel',
      model_id: admin.id,
      login_ip: '0.0.0.0',
      user_agent: '0.0.0.0',
    });

    const payload = {
      email: admin.email,
      id: admin.id,
      type: RoleTypes.ADMIN,
      name: admin.name,
    };
    const accessToken = this.jwtService.sign(payload);
    await this.tokenModel.create({
      model_type: 'AdminModel',
      model_id: admin.id,
      token_type: TokenTypes.BEARER,
      token_value: accessToken,
    });

    return accessToken;
  }

  /**
   * @description Revoke all bearer tokens of admin
   * @param admin
   */
  public async revokeAllBearerTokens(admin: AdminModel): Promise<void> {
    const tokens = await this.tokenModel.findAll({
      where: {
        token_type: TokenTypes.BEARER,
        model_type: 'AdminModel',
        model_id: admin.id,
      },
    });
    if (tokens.length > 0) {
      for (const token of tokens) {
        await token.destroy();
      }
    }
  }
}
