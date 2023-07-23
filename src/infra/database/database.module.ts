import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaUsersRepository } from './prisma/repositories/prisma-users-repository';
import { UsersRepository } from '../../app/repositories/users-repository';
import { PostsRepository } from '../../app/repositories/posts-repository';
import { PrismaPostsRepository } from './prisma/repositories/prisma-posts-repository';
import { SubscriptionRepository } from 'src/app/repositories/subscriptions-repository';
import { PrismaSubscriptionsRepository } from './prisma/repositories/prisma-subscriptions-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: PostsRepository,
      useClass: PrismaPostsRepository,
    },
    {
      provide: SubscriptionRepository,
      useClass: PrismaSubscriptionsRepository,
    },
  ],
  exports: [UsersRepository, PostsRepository, SubscriptionRepository],
})
export class DatabaseModule {}
