import { PostsRepository } from '@app/repositories/posts-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RemovePost {
  constructor(private postsRepository: PostsRepository) {}

  async execute(postId: string): Promise<void> {
    await this.postsRepository.delete(postId);
  }
}
