export class alreadyExistPostLike extends Error {
    errorCode = "P041";
  
    constructor(reason,data) {
      super(reason);
      this.reason = reason;
      this.statusCode = 400;
      this.data = data;
    }
}

export class NonExistUserError extends Error {
    errorCode = "P042";
    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.statusCode = 400;
        this.data = data;
    }
}

export class alreadyExistPostScrap extends Error {
    errorCode = "P043";
  
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