import { Injectable } from '@nestjs/common';
import { Post } from '../entities/post';
import { PostsRepository } from '../repositories/posts-repository';

interface CreatePostRequest {
  isPublish?: boolean;
  title: string;
  content: string;
  imageUrl?: string;
  authorId: string;
}

interface CreatePostResponse {
  post: Post;
}

@Injectable()
export class CreatePost {
  constructor(private postsRepository: PostsRepository) {}

  async execute(request: CreatePostRequest): Promise<CreatePostResponse> {
    const { isPublish, title, content, authorId, imageUrl } = request;

    const post = new Post({ isPublish, title, content, imageUrl, authorId });

    await this.postsRepository.create(post);

    return {
      post,
    };
  }
}
