class ValidationError extends Error {
  constructor(massege) {
    super(message);
    this.status = 400;
  }
}
class WrongParametersError extends Error {
  constructor(massege) {
    super(message);
    this.status = 400;
  }
}

module.exports = {
  ValidationError,
  WrongParametersError,
};
