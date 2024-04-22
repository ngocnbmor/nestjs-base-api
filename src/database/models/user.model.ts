import * as sequelize from 'sequelize';
import {
	BelongsTo,
	Column,
	CreatedAt,
	DeletedAt,
	ForeignKey,
	HasMany,
	Model,
	Table,
	UpdatedAt,
} from 'sequelize-typescript';
import LoginHistoryModel from './login-history.model';
import TokenModel from './token.model';

@Table({
	tableName: 'users',
	timestamps: true,
})
export default class UserModel extends Model {
	@Column({
		type: sequelize.UUID,
		defaultValue: sequelize.UUIDV4,
		allowNull: false,
		primaryKey: true,
	})
	public id: string;

	@Column({
		type: sequelize.STRING,
		allowNull: true,
	})
	public name: string;

	@Column({
		type: sequelize.STRING,
		allowNull: true,
	})
	public email: string | null;

	@Column({
		type: sequelize.STRING,
		allowNull: true,
	})
	public password: string | null;

	@Column({
		type: sequelize.STRING,
		allowNull: true,
		defaultValue: 'male',
	})
	public gender: string;

	@Column({
		type: sequelize.DATEONLY,
		allowNull: true,
	})
	public date_of_birth: Date | string | null;

	@Column({
		type: sequelize.STRING,
		allowNull: true,
	})
	public token: string;

	@Column({
		type: sequelize.STRING,
		allowNull: true,
	})
	public fcm_token: string;

	@Column({
		type: sequelize.STRING,
		allowNull: true,
	})
	public phone: string | null;

	@Column({
		type: sequelize.STRING,
		allowNull: true,
	})
	public introduction: string | null;

	@Column({
		type: sequelize.STRING,
		allowNull: true,
	})
	public nickname: string | null;

	@Column({
		type: sequelize.STRING,
		allowNull: true,
	})
	public address: string | null;

	@Column({
		type: sequelize.TEXT,
		allowNull: true,
	})
	public image: string | null;

	@Column({
		type: sequelize.BOOLEAN,
		allowNull: true,
	})
	public is_owner_store: boolean;

	@Column({
		type: sequelize.BOOLEAN,
		allowNull: false,
	})
	public status: boolean;

	@CreatedAt
	public created_at: Date | null;

	@UpdatedAt
	public updated_at: Date | null;

	@DeletedAt
	public deleted_at: Date | null;

	@HasMany(() => TokenModel, {
		foreignKey: 'model_id',
		constraints: false,
		scope: {
			model_type: 'UserModel',
			token_type: 1,
		},
	})
	public reset_password_tokens: TokenModel[];

	@HasMany(() => TokenModel, {
		foreignKey: 'model_id',
		constraints: false,
		scope: {
			model_type: 'UserModel',
			token_type: 2,
		},
	})
	public email_confirmation_tokens: TokenModel[];

	@HasMany(() => LoginHistoryModel, {
		foreignKey: 'model_id',
		constraints: false,
		scope: {
			model_type: 'UserModel',
		},
	})
	public login_histories: LoginHistoryModel[];
}
