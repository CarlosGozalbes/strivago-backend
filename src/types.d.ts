interface IUser {
  _id: string;
  role: "host" | "guest";
}

interface IAccomodation {
  name: String;
  city: String;
  maxGuest: Number;
  image: String;
  host: IUser;
  description: String;
  minLength:number;
  comments: Comment;
  timestamp: number;
}
interface Comment {
  text: string;
  rate: number;
}
