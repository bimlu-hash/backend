import { Request } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

export interface IUserRequest extends Request {
  user?: any;
}

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  isAdmin: boolean;
  token?: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(enteredPassword: string): Promise<Boolean>;
}

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },

    password: {
      type: String,
      required: true,
    },

    avatar: {
      type: String,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.comparePassword = function (enteredPassword: string) {
  const user = this as IUser;
  return bcrypt.compareSync(enteredPassword, user.password);
};

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
