import { Router } from "express";
import * as userService from "./user.service.js";

const userRouter = Router();

// Routes Definition
userRouter.get("/", userService.getAllUsersService);
userRouter.put("/:userId", userService.updateUserService);
userRouter.delete("/:userId", userService.deleteUserService);

export default userRouter;