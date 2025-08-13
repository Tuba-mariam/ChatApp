import { Response } from 'express';
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
        const chat = await ChatRepo.findByQuery({ _id: chatId });
        if (!chat) {
          const errorResponse: GenericNameSpace.IApiResponse = {
            success: false,
            message: 'ChatId not found',
          };
          res.status(400).json(errorResponse);
          return;
        }

        await ChatRepo.addMessageToChat(chatId, message);

        const Response: GenericNameSpace.IApiResponse<ChatNameSpace.IModel> = {
          success: true,
          message: 'Message added to existing chat',
        };
        res.status(200).json(Response);
        return;
      }
      if (receiverId) {
        let existChat = await ChatRepo.findOneToOneChat(sender, receiverId);

        if (!existChat) {
          existChat = await ChatRepo.createNewChat([sender, receiverId], message);
          const Response: GenericNameSpace.IApiResponse<ChatNameSpace.IModel> = {
            success: true,
            message: 'New one to one chat created',
            data: existChat,
          };
          res.status(200).json(Response);
          return;
        }

        if (existChat.members.length !== 2) {
          const errorResponse: GenericNameSpace.IApiResponse = {
            success: false,
            message: 'One-to-one chat must have exactly 2 members',
          };
          res.status(400).json(errorResponse);
          return;
        } else if (members && members.length > 1) {
          const newGroupChat = await ChatRepo.createNewChat(members, message);
          const Response: GenericNameSpace.IApiResponse<ChatNameSpace.IModel> = {
            success: true,
            message: 'New group chat created and message sent',
            data: newGroupChat,
          };
          res.status(200).json(Response);
          return;
        }
      }
    } catch (error) {
      const errorResponse: GenericNameSpace.IApiResponse = {
        success: false,
        message: 'Message send failed',
      };
      res.status(500).json(errorResponse);
    }
  }

  public static async getMessages(req: AuthNameSpace.IRequest, res: Response): Promise<void> {
    const chatId = req.params;
    const userId = req.user?._id;
    try {
      const messages = await ChatRepo.findByQuery({ _id: chatId, userId });
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
      const errorResponse: GenericNameSpace.IApiResponse = {
        success: false,
        message: 'Failed to fetch messages',
      };
      res.status(500).json(errorResponse);
    }
  }

  public static async getChats(req: AuthNameSpace.IRequest, res: Response): Promise<void> {
    const userId = req.user?._id;
    try {
      const chats = await ChatRepo.findAllByMember(userId);
      const chatsWithUnread = chats.map(chat => {
        const unreadCount = chat.messages.reduce((count, msg) => {
          const isRead = msg.readBy?.some(readerId => readerId.toString() === userId);
          return isRead ? count : count + 1;
        }, 0);
        return {
          ...chat,
          unreadCount,
        };
      });
      const Response: GenericNameSpace.IApiResponse<ChatNameSpace.IModel[]> = {
        success: true,
        data: chatsWithUnread,
      };
      res.status(200).json(Response);
    } catch (error) {
      console.log(error);
      const errorResponse: GenericNameSpace.IApiResponse = {
        success: false,
        message: 'Failed to fetch chats',
      };
      res.status(500).json(errorResponse);
    }
  }

  public static async markAsRead(req: AuthNameSpace.IRequest, res: Response): Promise<void> {
    const userId = req.user?._id;
    const { chatId } = req.params;
    try {
      await ChatRepo.markMessageAsRead(userId, chatId);
      const Response: GenericNameSpace.IApiResponse<ChatNameSpace.IModel> = {
        success: true,
        message: 'Messages marked as read successfully',
      };
      res.status(200).json(Response);
    } catch (error) {
      console.log(error);
      const errorResponse: GenericNameSpace.IApiResponse = {
        success: false,
        message: 'Error marking message as read',
      };
      res.status(500).json(errorResponse);
    }
  }
}

export default ChatController;
