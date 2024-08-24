export interface News {
  id: number;
  title: string;
  description: string;
  image: File | null;
  date_added: string;
}

export type NewsWithoutId = Omit<News, 'id' | 'date_added'>;

export interface Comment {
  id: number;
  news_id: number;
  author: string | null;
  text: string;
}

export interface CommentMutation {
  news_id: number;
  author: string;
  text: string;
}