import express from "express";
import { PurchaseController } from "../PurchaseController";

export const purchaseRouter = express.Router();

const purchaseController = new PurchaseController();

purchaseRouter.post("/create", purchaseController.createPurchase);
