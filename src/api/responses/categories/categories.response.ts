import { ApiProperty } from "@nestjs/swagger";
import moment = require("moment");
import { DefaultFormat } from "../../../common/constants/format.const";
import AdminModel from "../../../database/models/admin.model";
import CategoriesModel from "../../../database/models/categories.model";

export class CategoriesResponse {
  @ApiProperty({
    description: "Category Id",
  })
  public id: string;

  @ApiProperty({
    description: "Category Name",
    default: null,
  })
  public category_name: string;

  @ApiProperty({
    default: "2000-01-01 00:00:00",
  })
  public created_at: string | null;

  @ApiProperty()
  public admin_id: string;

  @ApiProperty()
  public admin: AdminModel;

  constructor(category: CategoriesModel) {
    this.id = category.id;
    this.admin_id = category.admin_id;
    this.admin = category.admin;
    this.category_name = category.category_name;
    this.created_at = !category.created_at
      ? null
      : moment(category.created_at).format(DefaultFormat.DATETIME);
  }
}
