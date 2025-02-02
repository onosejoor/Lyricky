import mongoose, { model, Model, Schema } from "mongoose";

interface IUser {
  username: string;
  email: string;
  password: string;
  avatar: string;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String, required: false },
});

// userSchema.pre('save', (next)=> {

// })

const User: Model<IUser, {}> =
  mongoose.models?.User || model<IUser>("User", userSchema);

export default User;
