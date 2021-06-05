class ValidationError extends Error {
  constructor(errors) {
    super();
    this.errors = errors;
  }

  formatError() {
    return this.errors.map((e) => ({
      field: e.param,
      msg: e.msg,
    }));
  }
}

module.exports = ValidationError;
