import {ApiProperty} from '@nestjs/swagger';
import {IsString} from 'class-validator';
import { isString } from '../../../common/validators/validation-custom';

export class AdminCreateRequest {
  @ApiProperty()
  @isString()
  public name: string;

  @ApiProperty()
  @isString()
  public email: string;

  @ApiProperty()
  @isString()
  public password: string;

  @ApiProperty()
  @isString()
  public password_confirmation: string;
}
