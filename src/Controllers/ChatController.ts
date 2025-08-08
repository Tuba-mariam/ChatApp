import { Request, Response } from 'express';
import AuthNameSpace from '../Interfaces/AuthInterface';
import ChatRepo from '../Repos/ChatRepo';
import GenericNameSpace from '../Interfaces/GenericInterface';
import ChatNameSpace from '../Interfaces/ChatInterface';

class ChatController {
  public static async sendMessage(req: AuthNameSpace.IRequest, res: Response): Promise<void> {
    const sender = req.user?._id;
    const { content, type, chatId, receiverId, members } = req.body;

    const message = { content, type, sender, readBy: [sender] } as ChatNameSpace.Message;

    try {
      if (chatId) {
        const updateChat = await ChatRepo.addMessageToChat(chatId, message);
        if (!updateChat) {
          const errorResponse: GenericNameSpace.IApiResponse = {
            success: false,
            message: 'ChatId not found',
          };
          res.status(400).json(errorResponse);
          return;
        }

        const Response: GenericNameSpace.IApiResponse<ChatNameSpace.IModel> = {
          success: true,
          message: 'Message added to existing chat',
          data: updateChat,
        };
        console.log(updateChat);
        res.status(200).json(Response);
        return;
      }

      if (receiverId) {
        const existingChat = await ChatRepo.findOneToOneChat(sender, receiverId);

        if (existingChat) {
          if (existingChat.members.length !== 2) {
            const errorResponse: GenericNameSpace.IApiResponse = {
              success: false,
              message: 'One-to-one chat must have exactly 2 members',
            };
            res.status(400).json(errorResponse);
            return;
          }

          const updateChat = await ChatRepo.addMessageToChat(existingChat._id, message);
          if (updateChat) {
            const Response: GenericNameSpace.IApiResponse<ChatNameSpace.IModel> = {
              success: true,
              message: 'Message added to one-to-one chat',
              data: updateChat,
            };
            res.status(200).json(Response);
            return;
          }
        }
        const newChat = await ChatRepo.createNewChat([sender, receiverId], message);
        const Response: GenericNameSpace.IApiResponse<ChatNameSpace.IModel> = {
          success: true,
          message: 'New one-to-one chat created and message sent',
          data: newChat,
        };
        res.status(200).json(Response);
        return;
      }
      if (Array.isArray(members) && members.length > 1) {
        const newGroupChat = await ChatRepo.createNewChat(members, message);
        const Response: GenericNameSpace.IApiResponse<ChatNameSpace.IModel> = {
          success: true,
          message: 'New group chat created and message sent',
          data: newGroupChat,
        };
        res.status(200).json(Response);
        return;
      }
      const errorResponse: GenericNameSpace.IApiResponse = {
        success: false,
        message: 'Missing chatId, receiverId, or valid members array',
      };
      res.status(400).json(errorResponse);
      return;
    } catch (error) {
      console.log(error);
      const errorResponse: GenericNameSpace.IApiResponse = {
        success: false,
        message: 'Message send failed',
      };
      res.status(500).json(errorResponse);
    }
  }

  public static async getMessages(req: AuthNameSpace.IRequest, res: Response): Promise<void> {
    const { chatId } = req.params;
    try {
      const messages = await ChatRepo.getAllMessage(chatId);
      if (!messages) {
        const notFoundResponse: GenericNameSpace.IApiResponse = {
          success: false,
          message: 'Chat not found',
        };
        res.status(404).json(notFoundResponse);
        return;
      }
      const Response: GenericNameSpace.IApiResponse<ChatNameSpace.IModel> = {
        success: true,
        data: messages,
      };
      res.status(200).json(Response);
    } catch (error) {
      console.log(error);
      const errorResponse: GenericNameSpace.IApiResponse = {
        success: false,
        message: 'Failed to fetch messages',
      };
      res.status(500).json(errorResponse);
    }
  }

  public static async markAsRead(req: AuthNameSpace.IRequest, res: Response): Promise<void> {
    const userId = req.user?._id;
    const { chatId } = req.params;

    try {
      const result = await ChatRepo.markMessageAsRead(userId, chatId);
      console.log(result);
      const Response: GenericNameSpace.IApiResponse<ChatNameSpace.IModel> = {
        success: true,
        message: 'Messages marked as read successfully',
      };
      res.status(200).json(Response);
    } catch (error) {
      const errorResponse: GenericNameSpace.IApiResponse = {
        success: false,
        message: 'Error marking message as read',
      };
      res.status(500).json(errorResponse);
    }
  }
}

export default ChatController;
