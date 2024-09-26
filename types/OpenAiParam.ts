export enum OpenAiRole {
  system = 'system',
  user = 'user',
  assistant = 'assistant',
}

export interface IOpenAiParam {
  role: OpenAiRole.system | OpenAiRole.user | OpenAiRole.assistant;
  content: string;
  name?: string;
}
