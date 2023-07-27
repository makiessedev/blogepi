import {
  Body,
  Controller,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreatePost } from '../../../app/use-cases/create-post';
import { EnsureAuthenticatedGuard } from '../middlewares/ensure-authenticated';
import { EnsureAdministratorGuard } from '../middlewares/ensure-administrator';
import { CreatePostBody } from '../dtos/create-post-body';
import { SubscriptionPost } from 'src/app/use-cases/subscribe-post';
import { SubscriptionBody } from '../dtos/subscription-body';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from '@infra/upload/supabase/upload-service';
import { FirebaseStorageService } from '@infra/upload/firebase/firebase-storage-service';

@Controller('post')
export class PostsController {
  constructor(
    private createPost: CreatePost,
    private subscription: SubscriptionPost,
    private firebaseStorageService: FirebaseStorageService,
  ) {}

  @UseGuards(EnsureAuthenticatedGuard, EnsureAdministratorGuard)
  @Post()
  async create(@Body() body: CreatePostBody, @Request() request) {
    const { isPublish, title, content, imageUrl } = body;

    const { post } = await this.createPost.execute({
      isPublish,
      title,
      content,
      imageUrl,
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

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File) {
    const url = await this.firebaseStorageService.uploadFile(file);

    return url;
  }
}
