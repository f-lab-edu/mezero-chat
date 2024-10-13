import { ChatLogService } from './ChatLogService.1';

describe('ChatLogService', () => {
  it('채팅 로그를 생성한다.', async () => {
    const messages = [
      {
        role: 'user',
        content: '초보자에게 추천하는 영어 단어 3개 알려줘.',
      },
    ];

    const result = await ChatLogService.getAnswer(messages);
    console.log(result);
  });
});
