import { Post } from '../entities/post';

describe('Create Post', () => {
  it('Should be able to create post', () => {
    const post = new Post({
      title: 'titulo do post',
      content: 'content do post',
      authorId: '898-233-2323',
    });

    expect(post.id).toBeTruthy();
    expect(post.createdAt).toBeInstanceOf(Date);
    expect(post.isPublish).toBe(true);
    expect(post.imageUrl).toBeUndefined();
  });

  it('Should be able to create post with image', () => {
    const post = new Post({
      title: 'titulo do post',
      content: 'content do post',
      imageUrl: 'imageUrl',
      authorId: '898-233-2323',
    });

    expect(post.imageUrl).toBeTruthy();
  });

  it('Should be able to create a private post', () => {
    const post = new Post({
      title: 'titulo do post',
      content: 'content do post',
      authorId: '898-233-2323',
      isPublish: false,
    });

    expect(post.isPublish).toBe(false);
  });
});
