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

//DB 연결 오류 

export class DatabaseConnectionError extends Error {
    errorCode = "T40";
    constructor(reason = "데이터베이스 연결에 실패했습니다.") {
        super(reason);
        this.reason = reason;
    }
}

// userId와 templateId가 매칭되는 템플릿 좋아요 정보가 존재하지 않을 때
export class NonexistentTemplateLike extends Error {
    errorCode = "TL24";
    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

// user가 templateId에 좋아요를 한 status null일 때
export class NullTemplateLike extends Error {
    errorCode = "TL25";
    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

//사용자가 이미 해당 템플릿 좋아요를 눌렀을 경우
export class alreadyExistTemplateLike extends Error {
    errorCode = "T30"
    constructor(reason, data){
        super(reason);
        this.statusCode = 400;
        this.reason = reason;
        this.data = data;
    }
}