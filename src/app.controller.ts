import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('new-endpoint')
  newEndpoint(): string {
    return 'Nuevo método';
  }

  @Get('/ruta/')
  helloWorld(): string {
    return 'Hello /sas/';
  }

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

  @Get('/categories/:id/products/:productID')
  getCategory(
    @Param('productID') productID: string,
    @Param('id') id: string,
  ): string {
    return `Product ${productID} and category ${id}`;
  }
}
