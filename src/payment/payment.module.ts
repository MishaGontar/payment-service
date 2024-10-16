import { Module } from "@nestjs/common";
import { PaymentController } from "./payment.controller";
import { PaymentService } from "./payment.service";
import { ConfigModule } from "@nestjs/config";
import { PaymentMicroserviceController } from '../payment-microservice/payment-microservice.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [PaymentController, PaymentMicroserviceController],
  providers: [PaymentService],
})
export class PaymentModule {}
