import { Comment } from './comment';

describe('Comment Interface', () => {
  it('should create a Comment object with required properties', () => {
    const comment: Comment = {
      id: 1,
      text: 'This is a comment.',
      author: 'Author Name',
      createdAt: new Date(),
    };

    expect(comment.id).toBe(1);
    expect(comment.text).toBe('This is a comment.');
    expect(comment.author).toBe('Author Name');
    expect(comment.editedAt).toBeUndefined();
    expect(comment.replies).toBeUndefined();
    expect(comment.isEditing).toBeUndefined();
    expect(comment.editText).toBeUndefined();
  });

  it('should allow optional properties to be set', () => {
    const comment: Comment = {
      id: 2,
      text: 'Another comment.',
      author: 'Another Author',
      createdAt: new Date(),
      editedAt: new Date(),
      replies: [],
      isEditing: true,
      editText: 'Updated comment text',
    };

    expect(comment.id).toBe(2);
    expect(comment.text).toBe('Another comment.');
    expect(comment.author).toBe('Another Author');
    expect(comment.replies).toEqual([]);
    expect(comment.isEditing).toBe(true);
    expect(comment.editText).toBe('Updated comment text');
  });

  it('should allow nested comments in replies', () => {
    const comment: Comment = {
      id: 3,
      text: 'Comment with replies.',
      author: 'Author With Replies',
      createdAt: new Date(),
      replies: [
        {
          id: 4,
          text: 'First reply.',
          author: 'Reply Author 1',
          createdAt: new Date(),
        },
        {
          id: 5,
          text: 'Second reply.',
          author: 'Reply Author 2',
          createdAt: new Date(),
        }
      ]
    };
    expect(comment.replies![0].text).toBe('First reply.');
    expect(comment.replies![1].text).toBe('Second reply.');
  });
});
