import { ApiProperty } from '@nestjs/swagger';
import { isEmail, isNotEmpty, isString } from './../../../common/validators/validation-custom';

export class LoginRequest {
  @ApiProperty()
  @isNotEmpty()
  @isString()
  @isEmail()
  public email: string;

  @ApiProperty()
  @isNotEmpty()
  @isString()
  public password: string;
}
