import { Request, Response, NextFunction } from "express";
export declare const protect: (req: Request & {
    user?: any;
}, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export declare const superAdminOnly: (req: Request & {
    user?: any;
}, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=auth.d.ts.map