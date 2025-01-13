export class alreadyExistPostLike extends Error {
    errorCode = "P001";
  
    constructor(reason,data) {
      super(reason);
      this.reason = reason;
      this.statusCode = 400;
      this.data = data;
    }
}

export class NonExistUserError extends Error {
    errorCode = "P002";
    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.statusCode = 400;
        this.data = data;
    }
}

export class alreadyExistPostScrap extends Error {
    errorCode = "P003";
  
    constructor(reason,data) {
      super(reason);
      this.reason = reason;
      this.statusCode = 400;
      this.data = data;

    }
}