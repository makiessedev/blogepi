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

  async delete(postId: string): Promise<void> {
    const postIndex = this.posts.findIndex((post) => post.id === postId);

    if (postIndex >= 0) {
      this.posts.splice(postIndex, 1);
    }
  }

  async update(props: Post): Promise<void> {
    const postIndex = this.posts.findIndex((post) => post.id === props.id);

    if (postIndex >= 0) {
      this.posts[postIndex] = props;
    }
  }

  async findAll(): Promise<Post[]> {
    return this.posts;
  }
}
