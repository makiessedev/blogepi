import { Post } from '../entities/post';

export abstract class PostsRepository {
  abstract create(post: Post): Promise<void>;
  abstract findById(id: string): Promise<Post | null>;
}
