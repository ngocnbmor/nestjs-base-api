import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiInternalServerErrorResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ServerErrorResponseSchema } from '../../common/errors/server.error';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { OpenApiResponseStatus401 } from '../../common/dtos/response-schema.dto';
import { OpenApiResponseWithPagination, PaginationResponse } from '../../common/dtos/pagination.dto';
import { Request } from 'express';
import { ApiResponseStatus200, ApiResponseStatus200Schema, OpenApiResponseStatus200 } from '../../common/responses/200.response';
import { OpenApiResponseStatus404 } from '../../common/responses/404.response';
import { ApiResponseStatus201, OpenApiResponseStatus201 } from '../../common/responses/201.response';
import { OpenApiResponseStatus422 } from '../../common/dtos/validation.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { RoleTypes } from '../../common/constants/role.const';
import { CategoriesService } from '../services/categories.service';
import { CategoriesResponse } from '../responses/categories/categories.response';
import CategoryCreateRequest from '../requests/categories/category-create.request';
import CategoryUpdateRequest from '../requests/categories/category-update.request';

@Controller('categories')
@ApiTags('Categories')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('Bearer')
@ApiInternalServerErrorResponse({
  description: 'Server error',
  type: ServerErrorResponseSchema,
})
@OpenApiResponseStatus401()
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'Get all categories' })
  @OpenApiResponseWithPagination(CategoriesResponse)
  public async index(
    @Req() request: Request
  ): Promise<PaginationResponse<CategoriesResponse>> {
    return this.categoriesService.getAll({}, request);
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get category detail' })
  @OpenApiResponseStatus200(CategoriesResponse)
  @OpenApiResponseStatus404()
  public async show(
    @Param('id') id: string
  ): Promise<ApiResponseStatus200Schema<CategoriesResponse>> {
    return new ApiResponseStatus200(
      'Get category detail successfully.',
      await this.categoriesService.findById(id)
    );
  }

  @Post('')
  @Roles(RoleTypes.ADMIN)
  @HttpCode(201)
  @ApiOperation({ summary: 'Create category' })
  @OpenApiResponseStatus201(CategoriesResponse)
  @OpenApiResponseStatus422()
  public async create(
    @Body() attrs: CategoryCreateRequest
  ): Promise<ApiResponseStatus200Schema<CategoriesResponse>> {
    const category = await this.categoriesService.create(attrs);
    return new ApiResponseStatus201(
      'Category created successfully.',
      new CategoriesResponse(category.dataValues)
    );
  }

  @Put(':id')
  @Roles(RoleTypes.ADMIN)
  @HttpCode(200)
  @ApiOperation({ summary: 'Update category' })
  @OpenApiResponseStatus200(CategoriesResponse)
  @OpenApiResponseStatus422()
  @OpenApiResponseStatus404()
  public async update(
    @Param('id') id: string,
    @Body() attrs: CategoryUpdateRequest
  ): Promise<ApiResponseStatus200Schema<CategoriesResponse>> {
    return new ApiResponseStatus200(
      'Category updated successfully.',
      await this.categoriesService.update(id, attrs)
    );
  }

  @Delete(':id')
  @Roles(RoleTypes.ADMIN)
  @HttpCode(200)
  @ApiOperation({ summary: 'Delete category' })
  @OpenApiResponseStatus404()
  public async destroy(
    @Param('id') id: string
  ): Promise<ApiResponseStatus200Schema<boolean>> {
    return new ApiResponseStatus200(
      'Category deleted successfully.',
      await this.categoriesService.delete(id)
    );
  }
}
