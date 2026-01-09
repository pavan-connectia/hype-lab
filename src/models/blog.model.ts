import mongoose, { Schema, Document } from "mongoose";

export interface IBlog extends Document {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  imageUrl: string;
  type: "blog" | "case-study";
}

const BlogSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    date: { type: String, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String, required: true },
    type: {
      type: String,
      enum: ["blog", "case-study"],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IBlog>("Blog", BlogSchema);