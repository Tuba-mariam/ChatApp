import jwt from 'jsonwebtoken';

const generateToken = (userId: String, role: String): string => {
  const screte = process.env.JWT_SECRET!;
  return jwt.sign({ userId, role }, screte, {
    expiresIn: '7d',
  });
};
export default generateToken;
