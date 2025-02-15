import { io } from 'socket.io-client';

const socket = io('http://localhost:3000', { path: '/socket.io' });

socket.on('connect', () => {
    console.log('✅ 서버 연결됨:', socket.id);
    socket.emit('register', 'testUser'); // 사용자 ID 등록
});

socket.on('disconnect', () => {
    console.log('❌ 서버와 연결 해제됨');
});

setTimeout(() => {
    console.log('📨 5초 후 연결 종료');
    socket.disconnect();
}, 5000);
