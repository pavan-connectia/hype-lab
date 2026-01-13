import mongoose, { Document } from "mongoose";
export interface IBlog extends Document {
    title: string;
    excerpt: string;
    date: string;
    category: string;
    imageUrl: string;
    type: "blog" | "case-study";
}
declare const _default: mongoose.Model<IBlog, {}, {}, {}, mongoose.Document<unknown, {}, IBlog, {}, mongoose.DefaultSchemaOptions> & IBlog & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any, IBlog>;
export default _default;
//# sourceMappingURL=blog.model.d.ts.map