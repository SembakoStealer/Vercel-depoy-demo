export interface Post {
  id: number;
  title: string;
  description: string;
  author: string;
  createdAt: string;
  image?: string;
}

export interface PostFormData {
  title: string;
  description: string;
  author: string;
  image?: string;
}
