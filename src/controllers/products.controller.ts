import { Controller, Get, Param, Post, Query, Body } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get('')
  getAll(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
    @Query('brand') brand: string,
  ): { message: string } {
    return {
      message: `Products limit=> ${limit} offset=> ${offset} and brand=> ${brand}`,
    };
  }

  @Get(':productID')
  getOne(@Param('productID') productID: string): string {
    return `Product ${productID}`;
  }

  @Post('')
  create(@Body() payload: any): { message: string; payload: any } {
    return {
      message: 'Create action',
      payload,
    };
  }
}
