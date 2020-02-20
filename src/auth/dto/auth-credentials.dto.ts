import { MinLength, MaxLength } from 'class-validator';

export class AuthCredentialsDto {
  @MinLength(4)
  @MaxLength(28)
  username: string;

  @MinLength(8)
  @MaxLength(32)
  password: string;
}
