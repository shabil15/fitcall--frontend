export interface FormLogin {
  email: string;
  password: string
}

export interface MyError {
  data?:{
    message?:string;
  };
  error?:string;
}

