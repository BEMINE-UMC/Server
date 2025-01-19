// 유효하지 않은 TemplateId 에러
export class InvalidTemplateIdError extends Error {
    errorCode = "T20";
    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

// 존재하지 않은 TemplateId 에러
export class NonexistentTemplateError extends Error {
    errorCode = "T21";
    constructor(reason, data){
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

// Inactive한 Template 다시 삭제하려 할 때 에러
export class InactiveTemplateError extends Error {
    errorCode = "T22";
    constructor(reason, data){
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

// Status 값이 null인 템플렛에 대한 유의 문구
export class NullStatusTemplateError extends Error {
    errorCode = "T23";
    constructor(reason, data){
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}