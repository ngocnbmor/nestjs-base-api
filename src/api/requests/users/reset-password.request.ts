import {ApiProperty} from '@nestjs/swagger';
import { isEmail, isNotEmpty, isString } from './../../../common/validators/validation-custom';

export class ResetPasswordRequest {
  @ApiProperty()
  @isNotEmpty()
  @isString()
  @isEmail()
  public email: string;
}
