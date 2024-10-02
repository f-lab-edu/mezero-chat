export interface IChat {
  id: number;
  displayId: string;
  chatLogList: IChatLog[];
}

export interface IChatLog {
  role: ChatLogRole.system | ChatLogRole.user | ChatLogRole.assistant;
  content: string;
  name?: string;
}

export enum ChatLogRole {
  system = 'system',
  user = 'user',
  assistant = 'assistant',
}
