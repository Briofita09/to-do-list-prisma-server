import { Request, Response } from "express";
import { Card } from "../interfaces/card";
import * as cardService from "../services/cardServices";

export async function newCard(req: Request, res: Response) {
  try {
    const { user } = res.locals;
    const newCard: Card = req.body;
    const createdCard = await cardService.newCard(user[0].id, newCard);
    if (!createdCard)
      return res.status(400).json({ message: "Falha ao criar o card!" });
    return res.status(201).json({ message: "Novo card criado!", createdCard });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Problemas no servidor" });
  }
}
export async function getAllCards(_req: Request, res: Response) {
  try {
    const { user } = res.locals;
    const allCards = await cardService.getAllCards(user[0].id);
    if (!allCards)
      return res.status(400).json({ message: "Falha ao pegar os cards" });
    return res.status(200).json(allCards);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Problemas no servidor" });
  }
}

export async function getOneCard(req: Request, res: Response) {
  try {
    const { user } = res.locals;
    const { id } = req.params;
    const oneCard = await cardService.getOneCard(user[0].id, parseInt(id));
    if (!oneCard)
      return res.status(404).json({ message: "Card não encontrado" });
    return res.status(200).json(oneCard);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Problemas no servidor" });
  }
}

export async function checkCard(req: Request, res: Response) {
  try {
    const { user } = res.locals;
    const { id } = req.params;

    const checkedCard = await cardService.checkCard(user[0].id, parseInt(id));

    if (!checkedCard)
      return res.status(404).json({ message: "Card não encontrado" });
    return res
      .status(200)
      .json({ message: "Card editado com sucesso!", checkCard });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Problemas no servidor" });
  }
}

export async function uncheckCard(req: Request, res: Response) {
  try {
    const { user } = res.locals;
    const { id } = req.params;

    const checkedCard = await cardService.uncheckCard(user[0].id, parseInt(id));

    if (!checkedCard)
      return res.status(404).json({ message: "Card não encontrado" });
    return res
      .status(200)
      .json({ message: "Card editado com sucesso!", checkCard });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Problemas no servidor" });
  }
}

export async function editCard(req: Request, res: Response) {
  try {
    const { user } = res.locals;
    const { id } = req.params;
    const card: Card = req.body;

    const editedCard = await cardService.editCard(
      user[0].id,
      parseInt(id),
      card
    );

    if (!editedCard)
      return res.status(404).json({ message: "Card não encontrado" });

    return res
      .status(200)
      .json({ message: "Card editado com sucesso", editedCard });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}

export async function deleteCard(req: Request, res: Response) {
  try {
    const { user } = res.locals;
    const { id } = req.params;

    const deletedCard = await cardService.deleteCard(user[0].id, parseInt(id));

    if (deletedCard)
      return res.status(404).json({ message: "Card não encontdado" });

    return res.status(204).json({ message: "Card deletado com sucesso" });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}
