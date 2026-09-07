import { Router } from "express";
import { auth } from "../../middleware/auth.middleware.js";
import { validation } from "../../middleware/validation.middleware.js";
import { sendMessageSchema } from "./message.validation.js";

import { 
  sendMessageService, 
  getMessagesService, 
  deleteMessageService 
} from "./message.service.js";

const messageRouter = Router();

// post for message
messageRouter.post("/", auth, validation(sendMessageSchema), sendMessageService);

// get for message
messageRouter.get("/", auth, getMessagesService);

// delete for message
messageRouter.delete("/:id", auth, deleteMessageService);

export default messageRouter;
