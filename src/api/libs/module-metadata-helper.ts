import { ModuleMetadata } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MulterModule } from '@nestjs/platform-express';
import { SequelizeModule } from '@nestjs/sequelize';
import { config } from 'dotenv';
import { CommonModule } from '../../common/common.module';
import { GlobalConfigModule } from '../../configs/config.module';
import { DatabaseModule } from '../../database/database.module';
import UserModel from '../../database/models/user.model';
import AdminModel from '../../database/models/admin.model';
import TokenModel from '../../database/models/token.model';
import LoginHistoryModel from '../../database/models/login-history.model';
import CategoriesModel from '../../database/models/categories.model';
import { MailModule } from '../../mail/mail.module';
import { AccountController } from '../controllers/account.controller';
import { AdminController } from '../controllers/admin.controller';
import { AuthAdminController } from '../controllers/auth-admin.controller';
import { AuthController } from '../controllers/auth.controller';
import { CategoriesController } from '../controllers/categories.controller';
import { UserController } from '../controllers/user.controller';
import { AdminRepository } from '../repositories/admin.repository';
import { CategoriesRepository } from '../repositories/categories.repository';
import { UserRepository } from '../repositories/users.repository';
import { AccountService } from '../services/account.service';
import { AdminService } from '../services/admin.service';
import { AuthAdminService } from '../services/auth-admin.service';
import { AuthService } from '../services/auth.service';
import { CategoriesService } from '../services/categories.service';
import { UserService } from '../services/user.service';
import { JwtStrategy } from '../strageries/jwt.strategy';

config();

export const moduleMetadataHelper: ModuleMetadata = {
	imports: [
		GlobalConfigModule,
		DatabaseModule,
		SequelizeModule.forFeature([
			UserModel,
			AdminModel,
			LoginHistoryModel,
			TokenModel,
			CategoriesModel,
		]),
		PassportModule.register({
			defaultStrategy: 'jwt',
		}),
		JwtModule.register({
			secret: process.env.JWT_SECRET,
			signOptions: {
				expiresIn: process.env.JWT_EXPIRATION,
			},
		}),
		MulterModule.register(),
		CommonModule,
		MailModule,
	],
	controllers: [
		AuthController,
		AccountController,
		UserController,
		AdminController,
		AuthAdminController,
		CategoriesController,
	],
	providers: [
		JwtStrategy,
		AuthService,
		AccountService,
		UserService,
		AdminService,
		AuthAdminService,
		CategoriesService,
		AdminRepository,
		CategoriesRepository,
		UserRepository,
	],
};
