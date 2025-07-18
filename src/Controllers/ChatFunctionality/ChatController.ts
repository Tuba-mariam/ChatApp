


import { Request, Response } from 'express';
import GenericNameSpace from '../../interfaces/Generic.interface';
import ChatRepo from '../../repos/ChatRepo';
import ChatNameSpace from '../../interfaces/ChatInterface';



class ChatController {
   public static async Send(req: Request, res: Response): Promise<void> {
    const message  = req.body
    try {
        const senMess = await ChatRepo.sendMessage(message)
          const Response : GenericNameSpace.IApiResponse<ChatNameSpace.IModel> ={
                success: true,
                message: 'Message sent successfully',
                data : senMess,
              };
              res.status(200).json(Response);
        
    } catch (error) {
        const errorResponse: GenericNameSpace.IApiResponse = {
        success: false,
        message: 'Message sent failed',
       
      };
      res.status(500).json(errorResponse);
        
    }
}
 public static async getMess(req: Request, res: Response): Promise<void> {
    const {sender , reciver} = req.query
    try {
        const getMess = await ChatRepo.getMessage({sender , reciver})
          const Response : GenericNameSpace.IApiResponse<ChatNameSpace.IModel> ={
                success: true,
                data : getMess,
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
    
}
export default ChatController