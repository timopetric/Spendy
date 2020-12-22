module.exports = class SpendyError extends Error {
    constructor(message, respCode) {
        super(message);
        this.name = "SpendyError";
        this.message = message;
        this.respCode = respCode;
    }
};
