import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users-controller';
import { CreateUser } from 'src/app/use-cases/create-user';
import { DatabaseModule } from '../database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthenticateController } from './controllers/authenticate-controller';
import { AuthenticateUser } from 'src/app/use-cases/authenticate-user';
import { CreatePost } from 'src/app/use-cases/create-post';
import { PostsController } from './controllers/posts-controller';
import { SubscriptionPost } from 'src/app/use-cases/subscribe-post';
import { UploadService } from '@infra/upload/supabase/upload-service';
import { FirebaseStorageService } from '@infra/upload/firebase/firebase-storage-service';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: 60 * 15 }, // 15 min
    }),
  ],
  providers: [
    CreateUser,
    AuthenticateUser,
    CreatePost,
    SubscriptionPost,
    FirebaseStorageService,
  ],
  controllers: [UsersController, AuthenticateController, PostsController],
})
export class HttpModule {}
