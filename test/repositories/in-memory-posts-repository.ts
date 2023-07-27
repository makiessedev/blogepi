import { Post } from '@app/entities/post';
import {
  PostsRepository,
  UpdatePostDTO,
} from '@app/repositories/posts-repository';

export class InMemoryPostsRepository implements PostsRepository {
  public posts: Post[] = [];

  async create(props: Post): Promise<void> {
    const post = new Post(props);
    this.posts.push(post);
  }

  async findById(id: string): Promise<Post | null> {
    const post = this.posts.find((post) => post.id === id);

    if (!post) return null;

    return post;
  }

  delete(postId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  update(post: UpdatePostDTO): Promise<void> {
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<Post[]> {
    throw new Error('Method not implemented.');
  }
}
