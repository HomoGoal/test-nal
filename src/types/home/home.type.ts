export type ImageType = {
  url: string;
};

export type ItemListblog = {
  id: number;
  content: string;
  created_at: string;
  comments_count: string;
  title: string;
  image: ImageType;
  updated_at: string;
};

export type ListBlogType = Array<ItemListblog>;
