import { Router } from "express";
import * as cardController from "../controllers/cardController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware";
import { CardSchema } from "../schemas/CardSchema";

const cardRouter = Router();

cardRouter.post(
  "/new-card",
  authMiddleware,
  validateSchemaMiddleware(CardSchema),
  cardController.newCard
);

cardRouter.get("/get-all", authMiddleware, cardController.getAllCards);
cardRouter.get("/get-one/:id", authMiddleware, cardController.getOneCard);
cardRouter.post("/check/:id", authMiddleware, cardController.checkCard);
cardRouter.post("/uncheck/:id", authMiddleware, cardController.uncheckCard);
cardRouter.post("/edit-card/:id", authMiddleware, cardController.editCard);
cardRouter.delete("delete-card/:id", authMiddleware, cardController.deleteCard);
export { cardRouter };
