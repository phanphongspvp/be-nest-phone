// src/cart/cart.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart } from './model/cart.model';

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<Cart>) {}

  async addToCart(inputCart): Promise<Cart> {
    const existingCart = await this.cartModel.findOne({
      user: inputCart.user,
    });

    if (existingCart) {
      // Sản phẩm đã tồn tại trong giỏ hàng, cập nhật count
      const existingItemIndex = existingCart.items.findIndex(
        (item) => String(item.name) === inputCart.items[0].name,
      );

      if (existingItemIndex !== -1) {
        // Sản phẩm đã tồn tại trong danh sách items, cập nhật count
        existingCart.items[existingItemIndex].count += inputCart.items[0].count;
      } else {
        // Sản phẩm chưa tồn tại trong danh sách items, thêm mới
        existingCart.items.push(inputCart.items[0]);
      }
    } else {
      // Giỏ hàng chưa tồn tại, tạo mới
      const newCart = await this.cartModel.create({
        user: inputCart.user,
        items: [inputCart.items[0]],
        img: inputCart.image,
        totalItems: inputCart.items[0].count,
        totalPrice: +(inputCart.items[0].price * inputCart.items[0].count),
      });

      return newCart.save();
    }

    // Tính toán tổng số lượng và tổng giá tiền
    existingCart.totalItems = existingCart.items.reduce(
      (total, item) => total + item.count,
      0,
    );

    existingCart.totalPrice = existingCart.items.reduce(
      (total, item) => +(total + item.price * item.count),
      0,
    );

    // Lưu hoặc cập nhật giỏ hàng trong MongoDB
    return existingCart.save();
  }

  async getCartItemsByIdUser(id) {
    const existingCart = await this.cartModel.find({
      user: id,
    });
    return existingCart;
  }

  async clearCartItems(userId: string): Promise<Cart> {
    const cart = await this.cartModel.findOne({ user: userId });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    // Clear the items array
    cart.items = [];

    // Update totalItems and totalPrice accordingly if needed
    cart.totalItems = 0;
    cart.totalPrice = 0;

    // Use update method to update the cart
    await this.cartModel.updateOne({ user: userId }, cart);

    // Return the updated cart
    return cart;
  }
}
