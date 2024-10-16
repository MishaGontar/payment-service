import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as crypto from "crypto";
import { CreatePaymentDto } from "./payment.dto";

@Injectable()
export class PaymentService {
  private readonly publicKey: string;
  private readonly privateKey: string;

  constructor(private configService: ConfigService) {
    this.publicKey = this.configService.get<string>("LIQPAY_PUBLIC_KEY");
    this.privateKey = this.configService.get<string>("LIQPAY_PRIVATE_KEY");
  }

  generateSignature(data: string): string {
    const hash = crypto.createHash("sha1");
    hash.update(this.privateKey + data + this.privateKey);
    return hash.digest("base64");
  }

  generatePaymentData({
    amount,
    currency,
    orderId,
    description,
  }: CreatePaymentDto) {
    const server_url = this.configService.get<string>(
      "LIQPAY_SERVER_SUCCESS_URL",
    );
    const result_url = this.configService.get<string>(
      "LIQPAY_RESULT_SUCCESS_URL",
    );

    const data = {
      version: 3,
      public_key: this.publicKey,
      action: "pay",
      amount,
      currency,
      description,
      order_id: orderId,
      result_url: result_url,
      server_url: server_url,
    };

    const dataString = Buffer.from(JSON.stringify(data)).toString("base64");
    const signature = this.generateSignature(dataString);

    return { data: dataString, signature };
  }

  async createPaymentLink(payment: CreatePaymentDto) {
    const { data, signature } = this.generatePaymentData(payment);
    const url = `https://www.liqpay.ua/api/3/checkout?data=${data}&signature=${signature}`;
    return { url };
  }

  validateSignature(data: string, signature: string): boolean {
    const generatedSignature = crypto
      .createHash("sha1")
      .update(this.privateKey + data + this.privateKey)
      .digest("base64");
    return generatedSignature === signature;
  }
}
