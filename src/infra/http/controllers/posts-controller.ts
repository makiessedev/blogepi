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
import { ViewAllPost } from '@app/use-cases/veiw-all-post';
import { RemovePost } from '@app/use-cases/remove-post';
import { UpdatePost } from '@app/use-cases/update-post';
import { UpdatePostbody } from '../dtos/update-post-body';
import { ViewPost } from '@app/use-cases/view-post';

@Controller('post')
export class PostsController {
  constructor(
    private createPost: CreatePost,
    private firebaseStorageService: FirebaseStorageService,
    private viewAllPost: ViewAllPost,
    private removePost: RemovePost,
    private updatePost: UpdatePost,
    private viewPost: ViewPost,
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

  @Get('all')
  async viewAll() {
    return this.viewAllPost.execute();
  }

  @Get('/:id')
  async viewUnique(@Param() { id }: { id: string }) {
    return this.viewPost.execute(id);
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
