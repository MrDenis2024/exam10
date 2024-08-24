export interface News {
  id: number;
  title: string;
  description: string;
  image: string | null;
  date_added: string;
}

export type NewsWithoutId = Omit<News, 'id' | 'date_added'>;

export interface Comment {
  id: number;
  news_id: number;
  author: string | null;
  text: string;
}

export type CommentWithoutId = Omit<Comment, 'id'>;