import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Logger } from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private readonly logger = new Logger('UserRepository');

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    const user = await this.insert({
      username,
      password,
    });
    this.logger.log('User');
  }
}
