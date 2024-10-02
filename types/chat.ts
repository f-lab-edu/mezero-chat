export interface IChatParam {
  role: 'system' | 'user' | 'assistant';
  content: string;
  name?: string;
}
