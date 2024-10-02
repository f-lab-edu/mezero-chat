export enum ChatLogRole {
  system = 'system',
  user = 'user',
  assistant = 'assistant',
}

export interface IChatLogParam {
  role: ChatLogRole.system | ChatLogRole.user | ChatLogRole.assistant;
  content: string;
  name?: string;
}
