import { ApiProperty } from '@nestjs/swagger';
import { IsOptional} from 'class-validator';
import { isString, maxLength } from '../../../common/validators/validation-custom';

export class UpdateProfileRequest {
  @ApiProperty()
  @isString()
  public area_id: string;

  @ApiProperty()
  @isString()
  @maxLength(150)
  public name?: string;

  @ApiProperty()
  @isString()
  public phone: string;

  @IsOptional()
  @ApiProperty()
  @isString()
  public introduction?: string;
}
