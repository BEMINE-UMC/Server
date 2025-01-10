export class InvalidTemplateIdError extends Error {
    errorCode = "T001";
    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

export class NonexistentTemplateError extends Error {
    errorCode = "T002";
    constructor(reason, data){
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}