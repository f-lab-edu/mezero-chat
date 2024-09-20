import { ChatService } from './ChatService';

describe('ChatService Class를 가져온다.', () => {
  test('returnLog 함수의 return은 ChatServiceLog이다.', () => {
    expect(ChatService.returnLog()).toEqual('ChatServiceLog');
  });
});
