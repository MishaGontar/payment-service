import { NestFactory } from "@nestjs/core";
import { PaymentModule } from "./payment/payment.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

async function bootstrap() {
  // const app = await NestFactory.createMicroservice<MicroserviceOptions>(
  //   PaymentModule,
  //   {
  //     transport: Transport.TCP,
  //     options: { host: "localhost", port: 3003 },
  //   },
  // );
  const app = await NestFactory.create(PaymentModule);

  await app.listen(3003);
  console.log("Payment microservice is running...");
}

bootstrap();
