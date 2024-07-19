 export interface IUser {
    _id: string;
    name: string;
    email: string;
    mobile : string;
    goal?:string;
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
  trainer:string,
  trainer_profile: string;
}


export interface TrainerDetails {
  _id: string;
  name: string;
  profile_img: string;
  specialisation: string;
  description: string;
  experience: string;
  certificate: string;
}

export interface DashCard {
  totalRevenue: number;
  totalProfit: number;
  totalUsers: number;
  totalTrainers: number;
}

export interface Client {
  _id: string;
  name: string;
}

export interface Session {
  sessionId: string;
  startTime: string;
  clientName: string;
}