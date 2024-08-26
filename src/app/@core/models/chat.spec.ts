import { Chat } from './chat';
import { MessageType } from './message-type';

describe('Chat', () => {
  it('should create an instance of Chat with given parameters', () => {
    const type: MessageType = MessageType.TEXT; // Replace with actual MessageType value if necessary
    const message = 'Hello, World!';
    const user = 1;

    const chat = new Chat(type, message, user);

    expect(chat).toBeTruthy();
    expect(chat.type).toBe(type);
    expect(chat.message).toBe(message);
    expect(chat.user).toBe(user);
    expect(chat.idChat).toBeUndefined(); // idChat is optional and should be undefined if not set
  });

  it('should allow setting and getting optional idChat property', () => {
    const type: MessageType = MessageType.TEXT; // Replace with actual MessageType value if necessary
    const message = 'Hello, World!';
    const user = 1;
    const idChat = 123;

    const chat = new Chat(type, message, user);
    chat.idChat = idChat;

    expect(chat.idChat).toBe(idChat);
  });
});
