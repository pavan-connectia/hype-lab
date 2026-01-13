import mongoose, { Document } from "mongoose";
export interface AdminDocument extends Document {
    name: string;
    email: string;
    password: string;
    role: "super-admin" | "admin";
    isActive: boolean;
    mustChangePassword: boolean;
}
declare const _default: mongoose.Model<AdminDocument, {}, {}, {}, mongoose.Document<unknown, {}, AdminDocument, {}, mongoose.DefaultSchemaOptions> & AdminDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any, AdminDocument>;
export default _default;
//# sourceMappingURL=admin.model.d.ts.map