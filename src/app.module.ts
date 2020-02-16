import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmOptions } from './config/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmOptions), TasksModule],
})
export class AppModule {}
