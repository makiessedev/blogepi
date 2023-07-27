import { Post } from '@app/entities/post';
import { PostsRepository } from '@app/repositories/posts-repository';
import { Injectable } from '@nestjs/common';

interface UpdatePostRequest {
  id: string;
  isPublish?: boolean;
  title?: string;
  content?: string;
  imageUrl?: string;
}

type UpdatePostResponse = void;

@Injectable()
export class UpdatePost {
  constructor(private postsRepository: PostsRepository) {}

  async execute(request: UpdatePostRequest): Promise<UpdatePostResponse> {
    const { id, content, imageUrl, isPublish, title } = request;

    await this.postsRepository.update({
      id,
      content,
      imageUrl,
      isPublish,
      title,
    });
  }
}
