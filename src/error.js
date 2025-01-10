export class alreadyExistPostLike extends Error {
    errorCode = "P001";
  
    constructor(reason) {
      super(reason);
      this.reason = reason;
      this.statusCode = 400;
    }
  }