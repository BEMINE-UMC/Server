export class PasswordLengthError extends Error {
    errorCode = "A010";
    constructor(reason) {
        super(reason);
        this.reason = reason;
        this.statusCode = 400;
    }
}

export class ExistNameError extends Error {
    errorCode = "A011";
    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.statusCode = 401;
        this.data = data;
    }
}

export class ExistEmailError extends Error {
    errorCode = "A012";
    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.statusCode = 402;
        this.data = data;
    }
}