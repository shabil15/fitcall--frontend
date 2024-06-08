export interface FormValues {
  name: string;
  mobile: string;
  password: string;
  cpassword: string;
  email: string;
}

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


// interface for forgot password
export interface forgetValues {
  password: string;
  cpassword: string;
}

// Interface for worker join
export interface ITrainerJoin extends FormValues{
  language : string,
  specialisation: string;
  certificate:string;
  profile_img: string;
  description : string
}


export interface UpdateUser {
    name:string;
    mobile : string;
  }

export interface UpdateHealth {
  age:string;
  height:string;
  weight:string;
  goal:string;
}

  export interface UpdateTrainer {
    name:string;
    mobile : string;
  }