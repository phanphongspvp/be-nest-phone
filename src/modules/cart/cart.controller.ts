// src/cart/cart.controller.ts
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CartService } from './cart.service';
import { Cart } from './model/cart.model';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async addToCart(@Body() inputCart): Promise<Cart> {    
    return this.cartService.addToCart(inputCart);
  }

  @Get(':id')
  async getCartItems(@Param('id') id: string): Promise<Cart[]> {
    const result = await this.cartService.getCartItemsByIdUser(id);
    return result
  }
}
