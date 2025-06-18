export interface Book {
  id?: string;
  title: string;  
  author: string;
  pageCount: number;
  publishedDate?: string;
  isbn?: string;
  summary?: string;
  coverImageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}