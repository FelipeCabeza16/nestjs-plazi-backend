import { Controller, Get, Param } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  @Get(':id/products/:productID')
  getCategory(
    @Param('productID') productID: string,
    @Param('id') id: string,
  ): string {
    return `Product ${productID} and category ${id}`;
  }
}
