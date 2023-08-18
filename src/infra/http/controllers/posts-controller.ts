import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreatePost } from '../../../app/use-cases/create-post';
import { EnsureAuthenticatedGuard } from '../middlewares/ensure-authenticated';
import { EnsureAdministratorGuard } from '../middlewares/ensure-administrator';
import { CreatePostBody } from '../dtos/create-post-body';
import { FileInterceptor } from '@nestjs/platform-express';
import { FirebaseStorageService } from '@infra/upload/firebase/firebase-storage-service';
import { RemovePost } from '@app/use-cases/remove-post';
import { UpdatePost } from '@app/use-cases/update-post';
import { UpdatePostbody } from '../dtos/update-post-body';
import { FindAllPost } from '@app/use-cases/find-all-post';
import { FindPost } from '@app/use-cases/find-post';
import { ViewPost } from '@app/use-cases/view-post';

@Controller('post')
export class PostsController {
  constructor(
    private createPost: CreatePost,
    private firebaseStorageService: FirebaseStorageService,
    private findAllPost: FindAllPost,
    private removePost: RemovePost,
    private updatePost: UpdatePost,
    private findPost: FindPost,
    private viewPost: ViewPost,
  ) {}

  @UseGuards(EnsureAuthenticatedGuard, EnsureAdministratorGuard)
  @Post()
  async create(@Body() body: CreatePostBody, @Request() request) {
    const {
      isPublish,
      title,
      description,
      content,
      imageUrl,
      author,
      authorUrl,
    } = body;

    const { post } = await this.createPost.execute({
      isPublish,
      title,
      description,
      content,
      imageUrl,
      userId: request.user.sub,
      author,
      authorUrl,
    });

    return post;
  }

  @Get('all')
  async viewAll() {
    return this.findAllPost.execute();
  }

  @Get('/:id')
  async viewUnique(@Param() { id }: { id: string }) {
    await this.viewPost.execute(id);

    const post = await this.findPost.execute(id);

    return post;
  }

  @Put('update/:id')
  async update(@Body() body: UpdatePostbody, @Param() { id }: { id: string }) {
    const { content, imageUrl, isPublish, title } = body;

    await this.updatePost.execute({ id, content, imageUrl, isPublish, title });
  }

  @Delete('remove/:id')
  async Delete(@Param() { id }: { id: string }) {
    await this.removePost.execute(id);
  }

  @UseGuards(EnsureAuthenticatedGuard, EnsureAdministratorGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File) {
    const url = await this.firebaseStorageService.uploadFile(file);

    return url;
  }
}
