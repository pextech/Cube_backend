import { Router } from "express";
import home from "./home.controller";

const homeRouter = Router();

homeRouter.get("/", home);

export default homeRouter;
