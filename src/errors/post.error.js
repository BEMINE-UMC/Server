export class NonExistUserError extends Error {
    errorCode = "P002";
    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.statusCode = 400;
        this.data = data;
    }
}