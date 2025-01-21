import { prisma } from "../db.config.js";
import { pool } from "../db.config.js";
import bcrypt from 'bcrypt';
import { ExistEmailError, ExistNameError, UserNotExistError, InvalidPasswordError } from "../errors/auth.error.js";

// 회원가입
export const postUserInformation = async ({ name, email, password }) => {
    const conn = await pool.getConnection();

    try {
        // 이메일 중복 검사
        const [existingUser] = await pool.query("SELECT * FROM user WHERE email = ?", [email]);
        if (existingUser.length > 0) {
            throw new ExistEmailError("해당 이메일은 이미 존재합니다.", { email: email });
        }

        // 닉네임 중복 검사
        const [existingName] = await pool.query("SELECT * FROM user WHERE name = ?", [name]);
        if (existingName.length > 0) {
            throw new ExistNameError("해당 닉네임은 이미 존재합니다.", { name: name });
        }

        // 사용자 정보 삽입
        const query = `INSERT INTO user (name, email, password) VALUES (?, ?, ?);`;
        const [result] = await conn.query(query, [name, email, password]);

        const [user] = await conn.query(`SELECT id, name, email, created_at FROM user WHERE id = ?;`, [result.insertId]);

        return user[0];
    } catch (error) {
        console.error("Error in postUserInformation: ", error);
        throw error;
    }
};

// 로그인
export const getUserInfo = async ({email, password}) => {
    const conn = await pool.getConnection();

    try {
        const [user] = await conn.query('SELECT id, email, password, name, created_at FROM user WHERE email = ?;', [email]);

        if (!user[0]) {
            throw new UserNotExistError("해당 이메일을 가진 사용자가 존재하지 않습니다.", { email: email });
        }

        const isPasswordValid = await bcrypt.compare(password, user[0].password);
         if (!isPasswordValid) {
             throw new InvalidPasswordError("비밀번호가 일치하지 않습니다.");
         }

        return user[0];

    } catch (error) {
        console.error("Error in getUserInfo: ", error);
        throw error;
    }
};