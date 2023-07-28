import { Post } from '@app/entities/post';
import { PostsRepository } from '@app/repositories/posts-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindAllPost {
  constructor(private postsRepository: PostsRepository) {}

  async execute(): Promise<Post[]> {
    return this.postsRepository.findAll();
  }
}
