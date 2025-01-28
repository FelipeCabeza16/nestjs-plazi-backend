import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode
} from '@nestjs/common';

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
  @HttpCode(HttpStatus.ACCEPTED)
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
  @Put(':productID')
  update(
    @Param('productID') productID: number,
    @Body() payload: any,
  ): { message: string; payload: any } {
    return {
      message: `Update action ${productID}`,
      payload,
    };
  }

  @Delete(':productID')
  remove(@Param('productID') productID: number): { message: string } {
    return {
      message: `Remove action ${productID}`,
    };
  }
}
