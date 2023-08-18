import { Injectable } from '@nestjs/common';
import { Post } from '../entities/post';
import { PostsRepository } from '../repositories/posts-repository';

interface CreatePostRequest {
  isPublish?: boolean;
  title: string;
  description: string;
  content: string;
  imageUrl?: string;
  userId: string;
  author?: string;
  authorUrl?: string;
}

interface CreatePostResponse {
  post: Post;
}

@Injectable()
export class CreatePost {
  constructor(private postsRepository: PostsRepository) {}

  async execute(request: CreatePostRequest): Promise<CreatePostResponse> {
    const {
      isPublish,
      title,
      content,
      author,
      authorUrl,
      imageUrl,
      userId,
      description,
    } = request;

    const post = new Post({
      isPublish,
      title,
      content,
      description,
      imageUrl,
      userId,
      author,
      authorUrl,
    });

    await this.postsRepository.create(post);

    return {
      post,
    };
  }
}
