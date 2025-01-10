

// 연혁 조회 요청 DTO
export const userToHistory = (params) =>{
    return{
        userId: parseInt(params.userId)
    }
}

// 연혁 조회 전송 DTO
export const responseFromHistory = (data) =>{
    return {
        userId: data.userId,
        history: data.history
    }
}