import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";
import { Transform } from "class-transformer";

export class CreatePaymentDto {
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @Min(1)
  amount: number;

  @IsString()
  @IsNotEmpty()
  currency: string;

  @IsString()
  @IsNotEmpty()
  orderId: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
