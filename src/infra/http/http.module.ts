import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users-controller';
import { CreateUser } from 'src/app/use-cases/create-user';
import { DatabaseModule } from '../database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthenticateController } from './controllers/authenticate-controller';
import { AuthenticateUser } from 'src/app/use-cases/authenticate-user';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [CreateUser, AuthenticateUser],
  controllers: [UsersController, AuthenticateController],
})
export class HttpModule {}
