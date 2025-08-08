import ConversationModel from '../Models/ConversationModel';

class ConversationRepo {
  static async createConversation(participants: string[]) {
    return await ConversationModel.create({ participants });
  }
  static async getConversationParticipants(participants: string[]) {
    // if (participants.length !== 2) throw new Error('Exactly 2 participants are required');

    return await ConversationModel.findOne({
      participant: { $all: participants },
    });
  }
}
export default ConversationRepo;
