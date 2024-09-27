import { OpenAiRepository } from '@/data/OpenAiRepository';
import { IOpenAiParam } from '@/types/OpenAiParam';

export class ChatLogService {
  private openAiRepository: OpenAiRepository;

  constructor() {
    this.openAiRepository = new OpenAiRepository();
  }

  async getAnswer(chatLogList: IOpenAiParam[]) {
    const response = await this.openAiRepository.getAnswer(chatLogList);
    if (typeof response !== 'string') {
      throw new Error('값이 없습니다.');
    }
    return response;
  }
}
