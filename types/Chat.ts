export interface IChat {
  id: string;
  title: string;
  chatLogList: IChatLog[];
}

export interface IChatLog {
  role: ChatLogRole;
  content: string;
  name?: string;
}

export enum ChatLogRole {
  system = 'system',
  user = 'user',
  assistant = 'assistant',
}
