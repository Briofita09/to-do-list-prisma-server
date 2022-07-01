import { User } from "./user";

export interface Card {
  title: string;
  text: string;
  authorId: User;
}
