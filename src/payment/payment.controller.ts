import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { CreatePaymentDto } from "./payment.dto";
import { BasePaymentController } from "./base.payment.controller";

@Controller("payment")
export class PaymentController extends BasePaymentController {
  constructor(protected readonly paymentService: PaymentService) {
    super(paymentService);
  }

  @Get("create")
  @UsePipes(new ValidationPipe({ transform: true }))
  async createPayment(@Query() query: CreatePaymentDto) {
    return await this.paymentService.createPaymentLink(query);
  }

  @Post("callback")
  async handleCallbackPay(@Body() body: any) {
    return await this.handleCallback(body);
  }
}
