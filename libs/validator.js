let validator = {
    init: function(errorHandler) {
        errorHandler && this.isFunction(errorHandler);
        this.fail = errorHandler || this.fail;
    },

    fail: function(msg) {
        throw new Error(msg);
    },

    isFunction: function(param) {
        return typeof param === 'function' || this.fail(param + ' is not a function');
    },

    isNumber: function(param) {
        return !isNaN(param) || this.fail(param + ' is not a number');
    }
};

module.exports = Object.create(validator);
