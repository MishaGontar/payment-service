import { NestFactory } from "@nestjs/core";
import { PaymentModule } from "./payment/payment.module";
import { ConfigService } from "@nestjs/config";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.create(PaymentModule);
  const configService = app.get(ConfigService);

  const isMicroservice =
    configService.get<string>("IS_MICROSERVICE") === "true";
  const port = configService.get<number>("PORT") || 3003;

  if (isMicroservice) {
    const host = configService.get<string>("HOST") || "localhost";

    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.TCP,
      options: { host, port },
    });
    await app.startAllMicroservices();
    console.log(`Payment microservice is running on port ${port}...`);
  } else {
    await app.listen(port);
    console.log(`Payment service is running on port ${port}...`);
  }
}

bootstrap();
