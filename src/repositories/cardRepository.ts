import { text } from "stream/consumers";
import { prisma } from "../database";
import { Card } from "../interfaces/card";

export async function createCard(id: number, newCard: Card) {
  const card = await prisma.card.create({
    data: {
      title: newCard.title,
      text: newCard.text,
      authorId: id,
    },
  });
  return card;
}

export async function getAllCards(id: number) {
  const allCards = await prisma.card.findMany({
    where: {
      authorId: id,
    },
  });
  return allCards;
}

export async function getOneCard(userId: number, cardId: number) {
  const card = await prisma.card.findFirst({
    where: {
      AND: [
        {
          id: cardId,
        },
        {
          authorId: userId,
        },
      ],
    },
  });
  return card;
}

export async function checkCard(cardId: number) {
  const checkedCard = await prisma.card.update({
    where: {
      id: cardId,
    },
    data: {
      isDone: {
        set: true,
      },
    },
  });
  return checkedCard;
}

export async function uncheckCard(cardId: number) {
  const checkedCard = await prisma.card.update({
    where: {
      id: cardId,
    },
    data: {
      isDone: {
        set: false,
      },
    },
  });
  return checkedCard;
}

export async function editCard(cardId: number, card: Card) {
  const editedCard = await prisma.card.update({
    where: {
      id: cardId,
    },
    data: {
      title: card.title,
      text: card.text,
    },
  });
  return editedCard;
}

export async function deleteCard(cardId: number) {
  const deletedCard = await prisma.card.delete({
    where: {
      id: cardId,
    },
  });
  return deletedCard;
}
