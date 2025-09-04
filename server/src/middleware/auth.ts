// import { NextFunction, Request, Response } from "express";
// import { UserRole } from "../modules/auth/auth.interface";
// import AppError from "../errors/AppError";
// import httpStatus from "http-status";
// import { jwtHelper } from "../helper/jwtHelper";
// import config from "../config";
// import { JwtPayload } from "jsonwebtoken";
// import { User } from "../modules/auth/auth.model";

// // export const auth = (...role: UserRole[]) => {
// //   return (req: Request, res: Response, next: NextFunction) => {
// //     const token = req.cookies.accessToken;

// //     //check if token is exist
// //     if (!token) {
// //       throw new AppError(
// //         "You are not Authorized!! Please login First",
// //         httpStatus.UNAUTHORIZED
// //       );
// //     }

// //     // verify token
// //     const decoded = jwtHelper.verifyToken(token, config.jwt.secret as string);

// //     if (!decoded) {
// //       throw new AppError("access token is not valid", httpStatus.UNAUTHORIZED);
// //     }

// //     if (role.length && !role.includes(decoded.role)) {
// //       throw new AppError(
// //         `Role : ${decoded.role} is not allowed to access this resource`,
// //         httpStatus.FORBIDDEN
// //       );
// //     }

// //     req.user = decoded as JwtPayload;
// //     next();
// //   };
// // };

// export const auth = () => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     // get  token from cookies
//     const token = req.cookies?.accessToken;

//     if (!token) {
//       return next(
//         new AppError(
//           "You are not Authorized!! Please login First",
//           httpStatus.UNAUTHORIZED
//         )
//       );
//     }

//     try {
//       const decoded = jwtHelper.verifyToken(
//         token,
//         config.jwt.secret as string
//       ) as JwtPayload;

//       if (!decoded) {
//         return next(
//           new AppError("Access token is not valid", httpStatus.UNAUTHORIZED)
//         );
//       }

//       const user = await User.findOne({ email: decoded?.email });

//       if (!user) {
//         return next(new AppError("User not found", httpStatus.NOT_FOUND));
//       }

//       req.user = decoded;
//       next();
//     } catch (error) {
//       return next(new AppError("Invalid token", httpStatus.UNAUTHORIZED));
//     }
//   };
// };

import { NextFunction, Request, Response } from "express";
import { UserRole } from "../modules/auth/auth.interface";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import { jwtHelper } from "../helper/jwtHelper";
import config from "../config";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../modules/auth/auth.model";

export const auth = (...roles: UserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.accessToken;

    if (!token) {
      return next(
        new AppError(
          "You are not Authorized!! Please login First",
          httpStatus.UNAUTHORIZED
        )
      );
    }

    try {
      const decoded = jwtHelper.verifyToken(
        token,
        config.jwt.secret as string
      ) as JwtPayload;

      if (!decoded) {
        return next(
          new AppError("Access token is not valid", httpStatus.UNAUTHORIZED)
        );
      }

      const user = await User.findOne({ email: decoded?.email });

      if (!user) {
        return next(new AppError("User not found", httpStatus.NOT_FOUND));
      }

      // Role check
      if (roles.length && !roles.includes(user.role as UserRole)) {
        return next(
          new AppError(
            `Role '${user.role}' is not allowed to access this resource`,
            httpStatus.FORBIDDEN
          )
        );
      }

      req.user = decoded;
      next();
    } catch (error) {
      return next(new AppError("Invalid token", httpStatus.UNAUTHORIZED));
    }
  };
};
