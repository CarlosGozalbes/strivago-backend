import passport from 'passport'


interface Error {
  status: number;
  errorsList: string;
}

interface Request {
   user:IUser
}

interface Response{
    status:number
}



 interface IUser {
  email: string;
  password: string;
  role: string;
  facebookId: string;
  timestamps: boolean;
  _id:string
}

interface IAccomodation {
  name: string;
  city: string;
  maxGuest: number;
  image: string;
  host: IUser;
  description: string;
  comments:{
    text: string;
  rate: number;
  user: {
    name: string;
    avatar: string;
  };
  }[]
}


export interface Profile extends passport.Profile {
    id: string;
    displayName: string;
    gender?: string | undefined;
    ageRange?: {
        min: number;
        max?: number | undefined;
    } | undefined;
    profileUrl?: string | undefined;
    username?: string | undefined;
    birthday: string;

    _raw: string;
    _json: any;
}