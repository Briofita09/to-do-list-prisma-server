import { Card } from "./card";

export interface User {
  name: string;
  password: string;
  email: string;
  question: string;
  answer: string;
  cards: Card[];
}
