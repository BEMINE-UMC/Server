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

export class NotPostAuthorError extends Error {
    errorCode = "P047";
    constructor(reason = "작성자가 아닙니다.") {
        super(reason);
        this.reason = reason;
        this.statusCode = 403;
        this.data = {};
    }
}