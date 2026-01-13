import mongoose, { Schema, Document } from "mongoose";

export interface AdminDocument extends Document {
  name: string;
  email: string;
  password: string;
  role: "super-admin" | "admin";
  isActive: boolean;
  mustChangePassword: boolean;
}

const adminSchema = new Schema<AdminDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["super-admin", "admin"],
      default: "admin",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
    mustChangePassword: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model<AdminDocument>("Admin", adminSchema);
