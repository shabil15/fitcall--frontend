export interface IMessage {
    _id:string;
    conversationId : string;
    senderId : string;
    text: string;
    status?: boolean;
    createdAt: string;
}