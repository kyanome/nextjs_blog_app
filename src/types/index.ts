export interface Post {
  id: number;
  title: string;
  content: string;
  thumbnailUrl: string;
  created_at: string | Date;
  updated_at: string | Date;
  PostCategory: PostCategory[];
}

export interface PostCategory {
  id: number;
  post_id: number;
  category_id: number;
  createdAt: string | Date;
  updatedAt: string | Date;
  category: Category;
}

export interface Category {
  id: number;
  name: string;
}
