export interface News {
  id: number;
  title: string;
  description: string;
  image: File | null;
  date_added: string;
}

export type NewsWithoutId = Omit<News, 'id' | 'date_added'>;