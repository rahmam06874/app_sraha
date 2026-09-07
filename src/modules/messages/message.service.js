import messageModel from "../../DB/models/message.model.js";
import userModel from "../../DB/models/user.model.js";

// send message
export const sendMessageService = async (req, res, next) => {
  const { content, receiverId } = req.body;

  const receiver = await userModel.findById(receiverId);
  if (!receiver) {
    return res.status(404).json({ message: "Receiver not found" });
  }

  const message = await messageModel.create({
    content,
    receiverId,
  });

  return res.status(201).json({ message: "Message sent successfully", messageData: message });
};

// استلام الرسايل
export const getMessagesService = async (req, res, next) => {
  const messages = await messageModel.find({ receiverId: req.user._id });

  return res.status(200).json({ 
    message: "Messages retrieved successfully", 
    count: messages.length, 
    messages 
  });
};

// delete message
export const deleteMessageService = async (req, res, next) => {
  const { id } = req.params;

  const deletedMessage = await messageModel.findOneAndDelete({
    _id: id,
    receiverId: req.user._id,
  });

  if (!deletedMessage) {
    return res.status(404).json({ message: "Message not found or unauthorized" });
  }

  return res.status(200).json({ message: "Message deleted successfully" });
};