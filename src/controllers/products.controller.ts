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
  HttpCode,
} from '@nestjs/common';
import { ParseIntPipe } from 'src/common/parse-int.pipe';
import { CreateProductDto, UpdateProductDto } from 'src/dtos/product.dtos';
import { Product } from 'src/entities/product.entity';
import { ProductsService } from 'src/services/products.service';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get('')
  getAll(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
    @Query('brand') brand: string,
  ): { message: string; products: Product[] } {
    const products = this.productService.findAll();
    return {
      message: 'Products retrieved successfully',
      products,
    };
  }

  @Get(':productID')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('productID', ParseIntPipe) productID: number): {
    product: Product;
  } {
    const product = this.productService.findOne(Number(productID));
    return { product };
  }

  @Post('')
  create(@Body() payload: CreateProductDto): { message: string; payload: any } {
    const newProduct = new Product();
    newProduct.id = Math.floor(Math.random() * 10000);
    newProduct.name = payload.name;
    newProduct.description = payload.description;
    newProduct.price = payload.price;
    newProduct.stock = payload.stock;
    newProduct.image = payload.image;

    const createdProduct = this.productService.create(newProduct);
    return {
      message: 'Action success',
      payload: createdProduct,
    };
  }
  @Put(':productID')
  update(
    @Param('productID') productID: string, // Change from number to string
    @Body() payload: UpdateProductDto,
  ): { message: string; payload?: any } {
    const id = Number(productID); // Convert to number
    if (isNaN(id)) {
      return { message: 'Invalid product ID' };
    }

    const product = this.productService.findOne(id);
    if (!product) {
      return { message: `Product with ID ${id} not found` };
    }

    const updatedProduct = this.productService.update(id, payload);
    return {
      message: 'Action success',
      payload: updatedProduct,
    };
  }

  @Delete(':productID')
  remove(@Param('productID') productID: number): { message: string } {
    const id = Number(productID);
    if (isNaN(id)) {
      return { message: 'Invalid product ID' };
    }
    this.productService.delete(id);
    return { message: 'Product deleted' };
  }
}
