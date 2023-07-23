import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CreatePost } from '../../../app/use-cases/create-post';
import { EnsureAuthenticatedGuard } from '../middlewares/ensure-authenticated';
import { EnsureAdministratorGuard } from '../middlewares/ensure-administrator';
import { CreatePostBody } from '../dtos/create-post-body';

@Controller('post')
export class PostsController {
  constructor(private createPost: CreatePost) {}

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
}
