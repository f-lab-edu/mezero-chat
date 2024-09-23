import { OpenAiRepository } from '@/data/OpenAiRepository';

export class ChatLogService {
  static returnLog() {
    return 'ChatLogServiceLog';
  }

  static async getAnswer(values: string) {
    return await OpenAiRepository.getAnswer(values);
  }
}
