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

  update(id: number, product: Product): Product | null {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      return null; // Return null if the product is not found
    }
    this.products[index] = { ...this.products[index], ...product }; // Merge old and new data
    return this.products[index];
}


  delete(id: number): Product {
    const index = this.products.findIndex((product) => product.id === id);
    const product = this.products[index];
    this.products.splice(index, 1);
    return product;
  }
}
