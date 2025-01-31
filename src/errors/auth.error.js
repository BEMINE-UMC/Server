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

export class EmailFormError extends Error {
    errorCode = "A018";
    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.statusCode = 400;
        this.data = data;
    }
}

export class CodeFormError extends Error {
    errorCode = "A019";
    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.statusCode = 400;
        this.data = data;
    }
}

export class CodeNotValidateError extends Error {
    errorCode = "A020";
    constructor(reason) {
        super(reason);
        this.reason = reason;
        this.statusCode = 400;
    }
}

export class NameNotExistError extends Error {
    errorCode = "A021";
    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.statusCode = 400;
        this.data = data;
    }
}

export class EmailNotExistError extends Error {
    errorCode = "A022";
    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.statusCode = 400;
        this.data = data;
    }
}

export class SamePasswordError extends Error {
    errorCode = "A023";
    constructor(reason) {
        super(reason);
        this.reason = reason;
        this.statusCode = 400;
    }
}

//사용자가 입력한 정보와 일치한 이메일이 존재하지 않을 때,
export class NoCorrectUserEmail extends Error {
    errorCode = "A030";

    constructor(reason,data) {
        super(reason);
        this.reason = reason;
        this.statusCode = 400;
        this.data = {userName: data};
    }
}