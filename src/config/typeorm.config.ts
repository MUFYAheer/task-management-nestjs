import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'mufy.aheer',
  password: 'secret',
  database: 'taskmanagement',
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
  synchronize: true,
};
