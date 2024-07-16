import type { Request } from 'express';

export const getTokenFromRequest = (req: Request): string | null => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  return token;
};
