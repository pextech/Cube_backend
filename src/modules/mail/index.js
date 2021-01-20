import { Router } from "express";
import mail from "./mail.controller";

const mailRouter = Router();

mailRouter.post("/", mail);

export default mailRouter;
