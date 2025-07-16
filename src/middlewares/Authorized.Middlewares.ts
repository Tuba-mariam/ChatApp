// import { Response, NextFunction } from 'express';
// import { UserroleEnum } from '../enums';
// import AuthNameSpace from '../interfaces/Auth.interface';

// const authorizeRole = (requiredRole: UserroleEnum) => {
//   return (req: AuthNameSpace.IRequest, res: Response, next: NextFunction) => {
//     if (!req.user || req.user.role !== requiredRole) {
//       res.status(403).json({
//         message: `Access denied. Only ${requiredRole}s are allowed.`,
//       });
//       return;
//     }

//     next();
//   };
// };
// export default authorizeRole;
