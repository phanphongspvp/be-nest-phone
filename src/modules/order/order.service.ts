// src/order/order.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './order.model';
import { CreateOrderDto } from './dto/create-order.dto';
import { CartService } from '../cart/cart.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
    private readonly cartService: CartService,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const result = await this.orderModel.create(createOrderDto);
    await this.cartService.clearCartItems(createOrderDto.user);
    return result;
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderModel.findById(id).exec();
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async updateStatus(id: string, status: boolean): Promise<Order> {
    const updatedOrder = await this.orderModel
      .findByIdAndUpdate(
        id,
        { $set: { status } }, // Use $set to update only the 'status' field
        { new: true }, // Return the modified document
      )
      .exec();

    if (!updatedOrder) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return updatedOrder;
  }

  async findAllOrder(): Promise<Order[]> {
    const orders = await this.orderModel.find().exec();
    return orders;
  }
}
