import { Dispatch, SetStateAction } from "react";

export interface Selected {
    link: string;
    setSelectedLink: Dispatch<SetStateAction<string>>;
  }

export  interface Open {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
  }  




 