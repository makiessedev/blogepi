import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users-controller';
import { CreateUser } from 'src/app/use-cases/create-user';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [CreateUser],
})
export class HttpModule {}
