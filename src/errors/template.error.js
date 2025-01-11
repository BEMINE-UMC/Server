// 유효하지 않은 TemplateId 에러
export class InvalidTemplateIdError extends Error {
    errorCode = "T001";
    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

// 존재하지 않은 TemplateId 에러
export class NonexistentTemplateError extends Error {
    errorCode = "T002";
    constructor(reason, data){
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}