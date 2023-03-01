import { StateStatus } from "~/src/constant";

export interface WebArticle {
  id: number;
  title: string;
  thumbnail: string;
  description: string;
  category: number;
  category_name?: string;
  content: string;
  source: string;
  index: number;
  state: StateStatus;
  created_at: number;
  updated_at: number;
}
