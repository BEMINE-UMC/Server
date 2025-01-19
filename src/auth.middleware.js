import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { NonExistTokenError, InvalidTokenError } from "./errors/auth.error.js";

dotenv.config();

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;

// JWT 토큰 검증 미들웨어
export const authenticateJWT = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        throw new NonExistTokenError("엑세스 토큰 값을 입력해주세요.");
    }

    jwt.verify(token, JWT_ACCESS_SECRET, (err, decoded) => {
        if (err) {
            throw new InvalidTokenError("토큰 값이 다르거나 만료되었습니다.");
        }

        req.user = decoded;  // decoded는 userId, name, email 정보 포함
        next();
    });
};
