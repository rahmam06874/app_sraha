import { Router } from "express";
import * as authService from "./auth.service.js";

const authRouter = Router();

authRouter.post("/signup", authService.signupService);
authRouter.post("/login", authService.loginService);


authRouter.post("/forget-password", authService.forgetPasswordService);
authRouter.patch("/reset-password", authService.resetPasswordService);
export default authRouter;