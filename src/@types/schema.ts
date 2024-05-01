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
  