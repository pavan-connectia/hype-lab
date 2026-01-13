import { Request, Response } from "express";
export declare const createAdmin: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getAllAdmins: (_req: Request, res: Response) => Promise<void>;
export declare const getAdminById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateAdmin: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteAdmin: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=admin.manage.controller.d.ts.map