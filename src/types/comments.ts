import { Entity } from "./entity";

export interface CommentModel extends Entity {
  body: string;
  email: string;
  name: string;
  postId: number;
}
