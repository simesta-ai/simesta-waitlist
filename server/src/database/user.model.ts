import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  phone: string;
  name: string;
}

const UserSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    name: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
