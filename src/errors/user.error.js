
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
