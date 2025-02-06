
// 존재하지 않는 사용자일 경우
export class NotExsistsUserError extends Error {
    errorCode = "U001";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.statusCode = 400;
        this.data = data;
    }
}

// 이미지 파일이 아닌경우(프로필 사진 수정)
export class NotFileAllowedError extends Error {
    errorCode = "U002";

    constructor(reason,allowed) {
        super(reason);
        this.reason = reason;
        this.statusCode = 401;
        this.allowed = allowed
    }
}
export class UpdateHistoryError extends Error {
    errorCode = "U041";
    constructor(reason = "연혁 수정에 실패했습니다.") {
        super(reason);
        this.reason = reason;
        this.statusCode = 400;
        this.data = {};
    }
}