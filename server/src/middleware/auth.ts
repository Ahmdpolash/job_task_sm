import { NextFunction } from "express";
import { UserRole } from "../modules/auth/auth.interface";

export const auth = (...role: UserRole[]) => {
    return (req: Request, res: Response, next: NextFunction) => { };
    


    
};
