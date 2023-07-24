import { InMemoryPostsRepository } from 'test/repositories/in-memory-posts-repository';
import { PostsRepository } from '../repositories/posts-repository';
import { CreatePost } from './create-post';

let postsRepository: PostsRepository;
let createPost: CreatePost;

describe('Create Post', () => {
  beforeAll(() => {
    postsRepository = new InMemoryPostsRepository();
    createPost = new CreatePost(postsRepository);
  });
});
