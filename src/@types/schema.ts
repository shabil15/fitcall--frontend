 export interface IUser {
    _id: string;
    name: string;
    email: string;
    mobile : string;
    profile_img: string;
    isBlocked: boolean;
    createdAt: string;
  }

  export interface ITrainer {
    _id?: string;
    name: string;
    mobile: string;
    email: string;
    password: string;
    description:string;
    language: string;
    specialisation: string;
    certificate: string;
    profile_img?: string;
    status?: string;
    isBlocked?: boolean;
    createdAt?: Date;
  }
  
  
  export interface IMessage {
    _id:string;
    conversationId : string;
    senderId : string;
    text: string;
    status?: boolean;
    createdAt: string;
}


export interface IConversation {
  _id: string;
  members: string[];
  user:string,
  userEmail:string,
  user_profile:string,
  worker:string,
  worker_profile:string
}