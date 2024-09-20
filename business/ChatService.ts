import { ChatServiceRepository } from './ChatServiceRepository';

export class ChatService {
  static returnLog() {
    return 'ChatServiceLog';
  }

  static async getAnswer(values: string) {
    return await ChatServiceRepository.getAnswer(values);
  }
}
