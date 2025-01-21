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
        this.statusCode = 400;
        this.data = data;
    }
}

export class ExistEmailError extends Error {
    errorCode = "A012";
    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.statusCode = 400;
        this.data = data;
    }
}

export class UserNotExistError extends Error {
    errorCode = "A013";
    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.statusCode = 400;
        this.data = data;
    }
}

export class InvalidPasswordError extends Error {
    errorCode = "A014";
    constructor(reason) {
        super(reason);
        this.reason = reason;
        this.statusCode = 400;
    }
}

export class NonExistRefreshError extends Error {
    errorCode = "A015";
    constructor(reason) {
        super(reason);
        this.reason = reason;
        this.statusCode = 400;
    }
}

export class NonExistTokenError extends Error {
    errorCode = "A016";
    constructor(reason) {
        super(reason);
        this.reason = reason;
        this.statusCode = 400;
    }
}

export class InvalidTokenError extends Error {
    errorCode = "A017";
    constructor(reason) {
        super(reason);
        this.reason = reason;
        this.statusCode = 400;
    }
}