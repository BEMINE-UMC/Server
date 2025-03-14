import { prisma } from "../db.config.js";
import { pool } from "../db.config.js";
import bcrypt from 'bcrypt';
import { ExistEmailError, ExistNameError, UserNotExistError, InvalidPasswordError, PasswordLengthError, 
    NameNotExistError, EmailNotExistError, SamePasswordError, UserIdNotExistError, UserNicknameExist } from "../errors/auth.error.js";

// 메모리 기반 임시 저장소
const verificationStore = new Map();

// 회원가입
export const postUserInformation = async ({ name, email, password }) => {
    const conn = await pool.getConnection();

    try {
        // 이메일 및 닉네임 정보 검사
        const [existingUser] = await conn.query("SELECT email, name FROM user WHERE email = ? OR name = ?", [email, name]);
        if (existingUser.length > 0) {
            if (existingUser[0].email === email) {
                throw new ExistEmailError("해당 이메일은 이미 존재합니다.", { email });
            }
            if (existingUser[0].name === name) {
                throw new ExistNameError("해당 닉네임은 이미 존재합니다.", { name });
            }
        }

        // 사용자 정보 삽입
        const query = `INSERT INTO user (name, email, password) VALUES (?, ?, ?);`;
        const [result] = await conn.query(query, [name, email, password]);

        const [user] = await conn.query(`SELECT id, name, email, created_at FROM user WHERE id = ?;`, [result.insertId]);

        return user[0];
    } catch (error) {
        console.error("Error in postUserInformation: ", error);
        throw error;
    } finally {
        conn.release(); //커넥션 반환
    }
};


// 로그인
export const getUserInfo = async ({ email, password }) => {
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
    } finally {
        conn.release(); // 커넥션을 반환
    }
};


// 인증번호 저장
export const saveVerificationCode = async (email, code) => {
    verificationStore.set(email, code);

    // 5분 후 인증번호 자동 삭제
    setTimeout(() => verificationStore.delete(email), 5 * 60 * 1000);
};

// 인증번호 조회
export const getVerificationCode = async (email) => {
    return verificationStore.get(email);
};

// 비밀번호 재발급
export const patchNewPw = async (userId, password) => {
    const conn = await pool.getConnection();

    try {
        const [userName] = await conn.query("SELECT id FROM user WHERE id = ?", [userId]);
        if (userName.length === 0) {
            throw new UserIdNotExistError("존재하지 않는 사용자입니다.", { userId: userId });
        }

        const [user] = await conn.query('SELECT password FROM user WHERE id = ?', [userId]);

        const existingHashedPassword = user[0].password;

        const isSamePassword = await bcrypt.compare(password, existingHashedPassword);
        if (isSamePassword) {
            throw new SamePasswordError("새로운 비밀번호가 기존 비밀번호와 동일합니다.");
        }

        if (!password || password.length < 4 || password.length > 15) {
            throw new PasswordLengthError("비밀번호는 4자 이상, 15자 이하여야 합니다.");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [updatePW] = await conn.query(
            'UPDATE user SET password = ? WHERE id = ?;',
            [hashedPassword, userId]
        );

        return { id: userId };

    } catch (error) {
        console.error("Error in patchNewPw: ", error);
        throw error;
    } finally {
        conn.release(); // 커넥션 반환
    }
};

// 사용자 이메일 조회
export const getUserEmail = async(data) => {
    try{
        const user = await prisma.user.findFirst({
            where: {
                name: data.name
            }
        });
    
        //해당 이름을 가진 사용자가 없을 때
        if(user==null)
        {
            return null;
        }
    
        //사용자가 임력한 비밀번호가 일치하지 않을때
        const isCorrectPassword = await bcrypt.compare(data.password,user.password);
        if(!isCorrectPassword)
        {
            return null;
        }
        return user;
    }catch(error){
        throw error;
    }
};

// 닉네임, 이메일 검증
export const verifyUserData = async (name, email) => {
    const conn = await pool.getConnection();

    try {
        const [userName] = await conn.query("SELECT * FROM user WHERE name = ?", [name]);
        if (userName.length === 0) {
            throw new NameNotExistError("존재하지 않는 닉네임입니다.", { name: name });
        }

        const [userEmail] = await conn.query("SELECT * FROM user WHERE email = ?", [email]);
        if (userEmail.length === 0) {
            throw new EmailNotExistError("존재하지 않는 이메일입니다.", { email: email });
        }

        const [getUser] = await conn.query(
            'SELECT id FROM user WHERE name = ? AND email = ?;', [name, email]);

        return getUser[0];

    } catch (error) {
        console.error("Error in verifyUserData: ", error);
        throw error;
    } finally {
        conn.release(); // 커넥션 반환
    }
};

// 닉네임 중복 검사
export const verifyName = async (name) => {
    const conn = await pool.getConnection();

    try {
        const [nickName] = await conn.query("SELECT name FROM user WHERE name = ?", [name]);
        if (nickName.length !== 0) {
            throw new UserNicknameExist("중복되는 닉네임입니다.", { name: name });
        }
        if (nickName.length === 0) {
            return {name: name};
        }

    } catch (error) {
        console.error("Error in verifyName: ", error);
        throw error;
    } finally {
        conn.release(); // 커넥션 반환
    }
};
