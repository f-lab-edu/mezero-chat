import { ChatLogService } from '@/business/ChatLogService';

describe('ChatLogService', () => {
  it('채팅 로그를 생성한다.', async () => {
    const question = '초보자에게 추천하는 영어 단어 3개 알려줘.';
    const result = await ChatLogService.getAnswer(question);
    console.log(result);
  });
});
