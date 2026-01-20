import jwt from 'jsonwebtoken';

const key = process.env.JWT_SECRET || "tu_clave_secreta_para_jwt";

export const generateToken = (payload) => {
  return jwt.sign(payload, key, {
    expiresIn: '7d',
  });
};

export const verifyToken = (token) => {
  return jwt.verify(token, key);
};