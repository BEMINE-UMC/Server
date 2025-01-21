import {DeleteObjectCommand, S3Client} from "@aws-sdk/client-s3"; // AWS SDK v3
import multer from "multer";
import multerS3 from "multer-s3";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import session from "express-session";
import passport from "passport";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// 확장자 검사 목록
const allowedExtensions = [".png", ".jpg", ".jpeg", ".bmp", ".gif",".TXT"];

export const imageUploader = multer({
  storage: multerS3({
    s3: s3, // S3Client 객체 사용
    bucket: process.env.AWS_S3_BUCKET_NAME, // Bucket 이름
    contentType: multerS3.AUTO_CONTENT_TYPE, // Content-type, 자동으로 찾도록 설정
    key: (req, file, callback) => {
      // 파일명
      const uploadDirectory = "bemine-images"; // 디렉토리 path 설정을 위해서
      const extension = path.extname(file.originalname); // 파일 이름 얻어오기
      const uuid = uuidv4(); // UUID 생성

      // extension 확인을 위한 코드 (확장자 검사용)
      if (!allowedExtensions.includes(extension)) {
        return callback(new Error("Invalid file extension"));
      }
      callback(null, `${uploadDirectory}/${uuid}_${file.originalname}`);
    },
    acl: "public-read-write", // 파일 액세스 권한
  }),
  // 이미지 용량 제한 (5MB)
  limits: { fileSize: 5 * 1024 * 1024 },
});

export const configureMiddleware = (app) => {
  // Session 설정
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "your-secret-key",
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000,
      },
    })
  );

  // Passport 초기화
  app.use(passport.initialize());
  app.use(passport.session());

  // Passport 직렬화/역직렬화
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};

// 파일 삭제
export const deleteImage = async (key) => {
  try {
    const command = new DeleteObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: new URL(key).pathname.substring(1),
    });
    const response = await s3.send(command);
    console.log("파일 삭제 성공:", response);
    return response;
  } catch (err) {
    throw err;
  }
};
