import { PostsRepository } from '@app/repositories/posts-repository';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class ViewPost {
  constructor(private postsRepository: PostsRepository) {}

  async execute(postId: string): Promise<void> {
    const post = await this.postsRepository.findById(postId);

    if (!post) throw new BadRequestException('post does not exists!');

    post.toView();

    await this.postsRepository.update(post);
  }
}
