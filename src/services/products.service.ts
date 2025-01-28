import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from 'src/dtos/product.dtos';
import { Product } from 'src/entities/product.entity';

@Injectable()
export class ProductsService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Description 1',
      price: 100,
      stock: 10,
      image: 'https://via.placeholder.com/150',
    },
  ];

  findAll(): Product[] {
    if (this.products.length === 0) {
      throw new NotFoundException('No products found');
    }
    return this.products;
  }

  findOne(id: number): Product {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  create(product: CreateProductDto): Product {
    const newLength = this.products.length + 1;
    const newProduct: Product = {
      id: newLength,
      ...product,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, product: UpdateProductDto): Product | null {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    this.products[index] = { ...this.products[index], ...product }; // Merge old and new data
    return this.products[index];
}


  delete(id: number): Product {
    const index = this.products.findIndex((product) => product.id === id);
    const product = this.products[index];
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    this.products.splice(index, 1);
    return product;
  }
}
