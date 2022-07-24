import express from "express";
import { ProductController } from "../ProductController";

export const productRouter = express.Router();

const productController = new ProductController();

productRouter.post("/create", productController.createProduct);
