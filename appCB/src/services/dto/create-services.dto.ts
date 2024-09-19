import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateServicesDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
}