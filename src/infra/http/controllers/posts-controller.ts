import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CreatePost } from '../../../app/use-cases/create-post';
import { EnsureAuthenticatedGuard } from '../middlewares/ensure-authenticated';
import { EnsureAdministratorGuard } from '../middlewares/ensure-administrator';
import { CreatePostBody } from '../dtos/create-post-body';
import { SubscriptionPost } from 'src/app/use-cases/subscribe-post';
import { SubscriptionBody } from '../dtos/subscription-body';

@Controller('post')
export class PostsController {
  constructor(
    private createPost: CreatePost,
    private subscription: SubscriptionPost,
  ) {}

  @UseGuards(EnsureAuthenticatedGuard, EnsureAdministratorGuard)
  @Post()
  async create(@Body() body: CreatePostBody, @Request() request) {
    const { isPublish, title, content } = body;

    const { post } = await this.createPost.execute({
      isPublish,
      title,
      content,
      authorId: request.user.sub,
    });

    return post;
  }

  @Post('subscribe')
  async subscribe(@Body() body: SubscriptionBody) {
    const { email, postId } = body;

    const { subscription } = await this.subscription.execute({ email, postId });

    return { subscription };
  }
}
