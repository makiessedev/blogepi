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
import { FirebaseStorageService } from '@infra/upload/firebase/firebase-storage-service';
import { RemovePost } from '@app/use-cases/remove-post';
import { UpdatePost } from '@app/use-cases/update-post';
import { Subscribe } from '@app/use-cases/subscribe';
import { SubscriptionsController } from './controllers/subscriptions-controller';
import { FindAllPost } from '@app/use-cases/find-all-post';
import { FindPost } from '@app/use-cases/find-post';
import { ViewPost } from '@app/use-cases/view-post';

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
    Subscribe,
    FirebaseStorageService,
    FindAllPost,
    RemovePost,
    UpdatePost,
    FindPost,
    ViewPost,
  ],
  controllers: [
    UsersController,
    AuthenticateController,
    PostsController,
    SubscriptionsController,
  ],
})
export class HttpModule {}
