import { io } from 'socket.io-client';

const socket = io('http://localhost:3000', { path: '/socket.io' });

socket.on('connect', () => {
    console.log('✅ 서버 연결됨:', socket.id);

    //사용자를 서버에 등록할 때 사용
    socket.emit('register', 'userId');
});



socket.on('disconnect', () => {
    console.log('❌ 서버와 연결 해제됨');
});

// 서버에서 메시지 받으면 출력
socket.on('newMessage', (msg) => {
    console.log('📩 서버로부터 메시지:', msg);
});

// 3초 후 서버에 테스트 메시지 전송
setTimeout(() => {
    console.log('📨 메시지 전송: "테스트 메시지!"');
    socket.emit('send-message', { message: '테스트 메시지!' });
}, 3000);

// 강제 연결 종료
setTimeout(() => {
    console.log('📨 10초 후 연결 종료');
    socket.disconnect();
}, 10000);
