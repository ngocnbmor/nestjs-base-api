import { ApiProperty } from "@nestjs/swagger";
import { isNotEmpty, isString, maxLength } from "../../../common/validators/validation-custom";

export default class CategoryCreateRequest {
  @ApiProperty({
    description: "Category Name",
    required: true,
  })
  @isNotEmpty()
  @isString()
  @maxLength(255)
  public category_name: string;

  @ApiProperty({
    description: 'Author',
    required: true,
  })
  @isNotEmpty()
  @isString()
  @maxLength(255)
  public admin_id: string;
}
