import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './modules/auth/auth.controller';
import { AuthModule } from './modules/auth/auth.module';
import { CartModule } from './modules/cart/cart.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ProductsModule } from './modules/products/products.module';
import { UploadModule } from './modules/upload/upload.module';
import { UsersModule } from './modules/users/users.module';
import { OrderModule } from './modules/order/order.module';
import { HeaderModule } from './modules/header/header.module';
import { FooterModule } from './modules/footer/footer.module';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://dienthoainb:ylc0309@cluster0.mqkxzkf.mongodb.net/"),
    CategoriesModule,
    ProductsModule,
    UsersModule,
    AuthModule,
    UploadModule,
    CartModule,
    OrderModule,
    HeaderModule,
    FooterModule
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule { }
