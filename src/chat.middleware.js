import { Server } from 'socket.io';

let io;

/*
    사용자가 소켓을 열면 소켓주소가 부여되는데 이게 연결을 끊고 다시 열면 새로운 주소가 부여됨 -> map으로 userId를 키, socketid를 value로 두고 하면딜거 같아여..
    더 나은 방법있으면 알려주세용
*/
const userSockets = new Map();

// ✅ 서버 실행 시 소켓 초기화
export const initSocket = (server) => {
    io = new Server(server, { path: '/socket.io' });

    io.on('connection', (socket) => {
        console.log(`소켓 연결됨: ${socket.id}`);

        // 사용자 정보 저장
        socket.on('register', (userId) => {
            console.log(`🔗 사용자 ${userId} 소켓 연결`);
            socket.userId = userId;
            userSockets.set(userId, socket);
        });

        socket.on('disconnect', () => {
            console.log(`소켓 연결 해제됨: ${socket.id}`);
            userSockets.delete(socket.userId);
        });
    });
};

//소켓을 API 호출 전에 자동으로 설정
export const socketMiddleware = (req, res, next) => {
    if (!io) {
        return res.status(500).send('소켓 서버가 아직 초기화되지 않았습니다.');
    }
    console.log(req.user)
    // 이부분 지피티가 짜줬는데 미들웨어에서 이렇게 에러처리 해도 괜찮을라나..?
    const userId = req.user?.userId; // JWT 인증된 사용자 ID
    if (!userId) {
        return res.status(401).send('사용자 인증이 필요합니다.');
    }

    let socket = userSockets.get(userId);

    if (!socket) {
        return res.status(400).send('소켓 연결이 필요합니다.');
    }

    req.io = io; // 소켓 서버 객체 저장
    req.socketId = socket.id; // 사용자 소켓 ID 저장
    req.roomId = req.body.roomId || null; // 채팅방 ID 저장

    next();
};