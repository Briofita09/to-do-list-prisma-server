import { Card } from "../interfaces/card";
import * as cardRepository from "../repositories/cardRepository";

export async function newCard(id: number, newCard: Card) {
  const createdCard = await cardRepository.createCard(id, newCard);
  return createdCard;
}

export async function getAllCards(id: number) {
  const allCards = await cardRepository.getAllCards(id);
  return allCards;
}

export async function getOneCard(userId: number, cardId: number) {
  const oneCard = await cardRepository.getOneCard(userId, cardId);
  return oneCard;
}

export async function checkCard(userId: number, cardId: number) {
  const findCard = await cardRepository.getOneCard(userId, cardId);

  if (!findCard) return null;

  const checkedCard = await cardRepository.checkCard(cardId);

  return checkedCard;
}

export async function uncheckCard(userId: number, cardId: number) {
  const findCard = await cardRepository.getOneCard(userId, cardId);

  if (!findCard) return null;

  const checkedCard = await cardRepository.uncheckCard(cardId);

  return checkedCard;
}

export async function editCard(userId: number, cardId: number, card: Card) {
  const findCard = await cardRepository.getOneCard(userId, cardId);

  if (!findCard) return null;

  const editedCard = await cardRepository.editCard(cardId, card);

  return editedCard;
}

export async function deleteCard(userId: number, cardId: number) {
  const findCard = await cardRepository.getOneCard(userId, cardId);

  if (!findCard) return null;

  return await cardRepository.deleteCard(cardId);
}
