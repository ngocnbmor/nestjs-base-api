import { ApiProperty } from '@nestjs/swagger';
import { IsExist } from '../../../common/validators/validation-new/is-exist';
import TokenModel from '../../../database/models/token.model';
import { IsEqualTo } from '../../../common/validators/validation-new/is-equal-to';
import { isNotEmpty, isString, matches, maxLength, minLength } from '../../../common/validators/validation-custom';
import { isEqual } from './../../../common/validators/validation-custom';

export class UpdatePasswordInput {
	@ApiProperty()
	@isNotEmpty()
	@isString()
	@IsExist({
		entityClass: TokenModel,
		columnName: 'token_value',
	})
	public token: string;

	@ApiProperty({
		default: 'your new secret password.',
	})
	@isNotEmpty()
	@isString()
	@minLength(6)
	@maxLength(128)
	@matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
	public password: string;

	@ApiProperty({
		default: 'same as password',
	})
	@isNotEmpty()
	@isString()
	@minLength(6)
	@maxLength(128)
	@isEqual('password')
	public password_confirmation: string;
}
