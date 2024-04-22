import {ApiProperty} from '@nestjs/swagger';
import {ValidateIf} from 'class-validator';
import { isString } from '../../../common/validators/validation-custom';

export class AdminUpdateRequest {
  @ApiProperty()
  @isString()
  @ValidateIf((object, value) => !!value)
  public name: string;

  @ApiProperty()
  @isString()
  @ValidateIf((object, value) => !!value)
  public email: string;
}
