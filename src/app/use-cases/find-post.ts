import { Post } from '@app/entities/post';
import { PostsRepository } from '@app/repositories/posts-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindPost {
  constructor(private postsRepository: PostsRepository) {}

  async execute(id: string): Promise<Post | null> {
    const post = await this.postsRepository.findById(id);

    return post ? post : null;
  }
}
