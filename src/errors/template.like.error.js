import { pool } from "../db.config.js";

export class NonexistentTemplateLike extends Error {
    errorCode = "TL20";
    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}