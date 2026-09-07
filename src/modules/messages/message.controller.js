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

// إرسال رسالة (مع الـ Auth والـ Validation)
messageRouter.post("/", auth, validation(sendMessageSchema), sendMessageService);

// عرض كل الرسائل الخاصة بالمستخدم
messageRouter.get("/", auth, getMessagesService);

// حذف رسالة بواسطة ID
messageRouter.delete("/:id", auth, deleteMessageService);

export default messageRouter;