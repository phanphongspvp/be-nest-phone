// src/order/dto/create-order.dto.ts
export class CreateOrderDto {
    readonly user: string; // Assuming you pass the user ID as a string
    readonly items: {
      id: string;
      name: string;
      price: number;
      count: number;
    }[];
    readonly shippingAddress: string;
    readonly phoneNumber: string;
    readonly totalItems: number;
    readonly totalPrice: number;
  }
  