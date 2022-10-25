import { IsEmail, IsNotEmpty } from "class-validator";

export class PromoSchema {
  @IsNotEmpty({
    message: "required"
  })
  name: string;

  @IsEmail({}, {
    message: "email"
  })
  @IsNotEmpty({
    message: "required"
  })
  email: string;

  @IsNotEmpty({
    message: "required"
  })
  comment: string;
}
