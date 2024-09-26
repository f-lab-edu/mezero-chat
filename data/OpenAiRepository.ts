import OpenAI from 'openai';
import { IOpenAiParam } from '@/types/OpenAiParam';

export class OpenAiRepository {
  static client = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  public static async getAnswer(chatLogList: IOpenAiParam[]): Promise<string | undefined> {
    console.log(chatLogList);
    try {
      const chatCompletion = await this.client.chat.completions.create({
        messages: chatLogList,
        model: 'gpt-3.5-turbo',
        max_tokens: 1024,
        top_p: 0.5,
        frequency_penalty: 0.5,
        presence_penalty: 0.5,
      });

      console.log(chatCompletion);
      const response = chatCompletion.choices[0].message.content;
      if (response === null && typeof response !== 'string') {
        throw new Error();
      }
      return response;
    } catch (error) {
      console.error('오류가 발생했습니다');
      console.log(error);
    }
  }
}
