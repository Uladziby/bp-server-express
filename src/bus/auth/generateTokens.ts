import { IUser, mongooseId } from '../users/types';
import jwt from 'jsonwebtoken';
import { TokenPair } from './type';

export const generateTokens = (id: mongooseId, email: string): TokenPair => {
  const secretKey = process.env.JWT_SECRET_KEY as string;
  const expiresIn = '1h';

  const accessToken = jwt.sign({ userId: id, email: email }, secretKey, {
    expiresIn,
  });

  const refreshToken = jwt.sign({ userId: id, email: email }, secretKey, {
    expiresIn: '7d',
  });

  return { accessToken, refreshToken };
};
