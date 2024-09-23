import { ChatRepository } from '@/data/ChatRepository';

export class ChatService {
  static returnLog() {
    return 'ChatServiceLog';
  }

  static async getAnswer(values: string) {
    return await ChatRepository.getAnswer(values);
  }
}
