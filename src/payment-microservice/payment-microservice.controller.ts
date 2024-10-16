import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { CreatePaymentDto } from "../payment/payment.dto";
import { PaymentService } from "../payment/payment.service";
import { BasePaymentController } from "../payment/base.payment.controller";

@Controller("payment-microservice")
export class PaymentMicroserviceController extends BasePaymentController {
  constructor(protected readonly paymentService: PaymentService) {
    super(paymentService);
  }

  @MessagePattern("payment.create")
  async handleCreatePayment(@Payload() payload: CreatePaymentDto) {
    return await this.paymentService.createPaymentLink(payload);
  }

  @MessagePattern("payment.callback")
  async handleCallbackPay(@Payload() payload: any) {
    return await this.handleCallback(payload);
  }
}
