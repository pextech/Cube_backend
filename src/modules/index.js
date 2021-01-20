import { Router } from "express";
import homeRouter from "./home";
import mailRouter from "./mail";

const indexRouter = Router();

indexRouter.use("/home", homeRouter);
indexRouter.use("/mail", mailRouter);

export default indexRouter;
