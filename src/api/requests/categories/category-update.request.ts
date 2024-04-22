import { ApiProperty } from '@nestjs/swagger';
import { ValidateIf } from 'class-validator';
import { isString, maxLength } from "../../../common/validators/validation-custom";

export default class CategoryUpdateRequest {
  @ApiProperty({
    description: 'Category Name',
    required: true,
  })
  @ValidateIf((object, value) => !!value)
  @isString()
  @maxLength(255)
  public category_name: string;
}
