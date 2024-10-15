import {
  Body,
  Controller,
  Get, HttpCode,
  HttpStatus, Post,
  Query,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { CreatePaymentDto } from "./payment.dto";
import { MessagePattern, Payload } from "@nestjs/microservices";

@Controller("payment")
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Get("create")
  @UsePipes(new ValidationPipe({ transform: true }))
  async createPayment(@Query() query: CreatePaymentDto) {
    return await this.paymentService.createPaymentLink(query);
  }

  @MessagePattern("createPayment")
  async handleCreatePayment(@Payload() payload: CreatePaymentDto) {
    return await this.paymentService.createPaymentLink(payload);
  }

  @Post("callback")
  @HttpCode(200)
  async handleCallback(@Body() body: any) {
    const { data, signature } = body;


    const isValid = this.paymentService.validateSignature(data, signature);
    if (!isValid) {
      console.error("Invalid signature");
      return { status: "error", message: "Invalid signature" };
    }

    const paymentInfo = JSON.parse(
      Buffer.from(data, "base64").toString("utf8"),
    );

    console.log("Payment Info:", paymentInfo);

    if (paymentInfo.status === "success") {
      // Оновлюємо дані у БД або виконуємо іншу логіку
      console.log("Status successul");
      return { status: HttpStatus.OK };
    }

    return { status: HttpStatus.BAD_REQUEST };
  }
}
