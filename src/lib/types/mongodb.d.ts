import { Types } from "mongoose";
// import { MongoClient } from "mongodb";

declare global {
  var mongoose: any;

  interface IUser {
    _id: string;
    username: string;
    email: string;
    password: string;
    avatar: string;
  }

  interface ILyric {
    title: string;
    user_id: Types.ObjectId;
    lyric: string;
    artist: string;
  }
}
