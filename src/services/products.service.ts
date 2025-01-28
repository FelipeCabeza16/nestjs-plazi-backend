import { Injectable } from '@nestjs/common';
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
    return this.products;
  }

  findOne(id: number): Product {
    return this.products.find((product) => product.id === id);
  }

  create(product: Product): Product {
    this.products.push(product);
    return product;
  }

  update(id: number, product: Product): Product {
    const index = this.products.findIndex((product) => product.id === id);
    this.products[index] = product;
    return product;
  }

  delete(id: number): Product {
    const index = this.products.findIndex((product) => product.id === id);
    const product = this.products[index];
    this.products.splice(index, 1);
    return product;
  }
}
