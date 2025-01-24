//이미 좋아요를 누른 게시물인 경우
export class alreadyExistPostLike extends Error {
    errorCode = "P030";
  
    constructor(reason,data) {
      super(reason);
      this.reason = reason;
      this.statusCode = 400;
      this.data = data;
    }
}

//존재하지 않는 사용자인 경우
export class NonExistUserError extends Error {
    errorCode = "P031";
    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.statusCode = 400;
        this.data = data;
    }
}

//이미 스크랩을 누른 게시물인 경우
export class alreadyExistPostScrap extends Error {
    errorCode = "P032";
  
    constructor(reason,data) {
      super(reason);
      this.reason = reason;
      this.statusCode = 400;
      this.data = data;

    }
}


// 유저가 최근 본 게시물이 없을 때 (최근 본 게시물 조회)
export class NotRecentPostsErrors extends Error {
    errorCode = "P001";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.statusCode = 400;
        this.data = {
            userId: data.userId
        };
    }
}

// 유저가 스크랩한 게시물이 없을 때 (북마크 조회)
export class NotScrapPostsErrors extends Error {
    errorCode = "P002";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.statusCode = 400;
        this.data = {
            userId: data.userId
        }
    }
}

//검색한 내용의 게시물이 없을 경우
export class NotFoundSearchedPost extends Error {
    errorCode = "P033"

    constructor(reason,data) {
        super(reason);
        this.reason = reason;
        this.statusCode = 400;
        this.data = {
            SearchWord: data.SearchWord
        };
    }
}

// 게시물 작성자가 아닌 경우의 에러
export class NotPostAuthorError extends Error {
    errorCode = "P047";
    constructor(reason = "작성자가 아닙니다.") {
        super(reason);
        this.reason = reason;
        this.statusCode = 403;
        this.data = {};
    }
}

// 제목 누락 에러
export class TitleRequiredError extends Error {
    errorCode = "P041";
    constructor(reason = "제목을 입력해주세요.") {
        super(reason);
        this.reason = reason;
        this.statusCode = 400;
    }
}

// 내용 누락 에러
export class ContentRequiredError extends Error {
    errorCode = "P042";
    constructor(reason = "내용을 입력해주세요.") {
        super(reason);
        this.reason = reason;
        this.statusCode = 400;
    }
}

// 이미지 형식 관련 에러
export class InvalidImageFormatError extends Error {
    errorCode = "P043";
    constructor(reason = "지원하지 않는 이미지 형식입니다.") {
        super(reason);
        this.reason = reason;
        this.statusCode = 400;
    }
}

// 이미지 크기 초과 에러
export class ImageSizeExceededError extends Error {
    errorCode = "P044";
    constructor(reason = "이미지 크기는 5MB를 초과할 수 없습니다.") {
        super(reason);
        this.reason = reason;
        this.statusCode = 400;
    }
}

// 조회한 게시글이 없는 게시글일 때
export class PostNotFoundError extends Error {
    errorCode = "P046";
    constructor(reason = "게시글을 찾을 수 없습니다.") {
        super(reason);
        this.reason = reason;
        this.statusCode = 404;
        this.data = {};
    }
}

// 유효하지 않은 categoryId 에러
export class InvalidCategoryIdError extends Error {
    errorCode = "P20";
    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.statusCode = 400;
        this.data = data;
    }
}

// 유효하지 않은 offset 에러
export class InvalidOffsetError extends Error {
    errorCode = "P21";
    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.statusCode = 400;
        this.data = data;
    }
}

// 유효하지 않은 limit 에러
export class InvalidLimitError extends Error {
    errorCode = "P22";
    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

// 존재하지 않는 categoryId 에러
export class NonexistentCategoryIdError extends Error {
    errorCode = "P23";
    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}
