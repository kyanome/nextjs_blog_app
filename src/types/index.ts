export interface Post {
  id: number;
  title: string;
  content: string;
  thumbnailUrl: string;
  created_at: string;
  updated_at: string;
  PostCategory: PostCategory[];
}

export interface PostCategory {
  id: number;
  post_id: number;
  category_id: number;
  createdAt: string;
  updatedAt: string;
  category: Category;
}

export interface Category {
  id: number;
  name: string;
}

export interface UpdatePostRequest {
  title: string;
  content: string;
  thumbnailUrl: string;
  categories: { id: number }[];
}

export type CreatePostRequest = {
  title: string;
  content: string;
  thumbnailUrl: string;
  categories: { id: number }[];
};
