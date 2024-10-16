import { PaymentService } from "./payment.service";

export class BasePaymentController {
  constructor(protected readonly paymentService: PaymentService) {}

  protected async handleCallback(payload: any) {
    const { data, signature } = payload;
    const isValid = this.paymentService.validateSignature(data, signature);
    if (!isValid) {
      console.error("Invalid signature");
      return { status: "error", message: "Invalid signature" };
    }

    const paymentInfo = JSON.parse(
      Buffer.from(data, "base64").toString("utf8"),
    );
    console.log("Payment Info:", paymentInfo);
    return { paymentInfo };
  }
}
