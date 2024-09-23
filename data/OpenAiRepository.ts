import OpenAI from 'openai';

export class OpenAiRepository {
  static returnLog() {
    return 'OpenAiRepositoryLog';
  }

  static apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

  static client = new OpenAI({
    apiKey: OpenAiRepository.apiKey,
    dangerouslyAllowBrowser: true,
  });

  static async getAnswer(values: string) {
    const question = values;
    const chatCompletion = await OpenAiRepository.client.chat.completions.create({
      messages: [{ role: 'user', content: question }],
      model: 'gpt-3.5-turbo',
      max_tokens: 1024,
      top_p: 0.5,
      frequency_penalty: 0.5,
      presence_penalty: 0.5,
    });

    try {
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
