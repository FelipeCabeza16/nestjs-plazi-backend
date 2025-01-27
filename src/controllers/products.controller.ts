import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get('/products')
  getProducts(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
    @Query('brand') brand: string,
  ): string {
    return `Products limit=> ${limit} offset=> ${offset} and brand=> ${brand}`;
  }

  @Get('/products/:productID')
  getProduct(@Param('productID') productID: string): string {
    return `Product ${productID}`;
  }
}
