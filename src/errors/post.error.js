export class alreadyExistPostLike extends Error {
    errorCode = "P030";
  
    constructor(reason,data) {
      super(reason);
      this.reason = reason;
      this.statusCode = 400;
      this.data = data;
    }
}

export class NonExistUserError extends Error {
    errorCode = "P031";
    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.statusCode = 400;
        this.data = data;
    }
}

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
// 제목 누락 에러러
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