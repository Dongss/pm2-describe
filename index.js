const pm2 = require('pm2');
const myValidator = require('./libs/validator');

function pm2Desc(options) {
    myValidator.init();
    this.init(options);
}

pm2Desc.prototype = pm2;

/**
 * Describe pm2 list
 *
 * @return {Context} this
 * @api private
 */

pm2Desc.prototype.descList = function () {
    pm2.list((err, list) => {
        if (err) {
            this.errorHandler && this.errorHandler(err);
        } else {
            this.descHander && this.descHander(list);
        }
    });
    return this;
};

/**
 * On describe pm2 list
 *
 * @param {Function} callback
 * @return {Context} this
 * @api public
 */

pm2Desc.prototype.onDescribe = function (callback) {
    myValidator.isFunction(callback);
    this.descHander = callback;
    return this;
};

/**
 * On errors
 *
 * @param {Function} callback
 * @return {Context} this
 * @api public
 */

pm2Desc.prototype.error = function (callback) {
    myValidator.isFunction(callback);
    this.errorHandler = callback;
    return this;
};

/**
 * On pm2 connected
 *
 * @param {Function} callback
 * @return {Context} this
 * @api public
 */

pm2Desc.prototype.onConnect = function (callback) {
    myValidator.isFunction(callback);
    this.connectHandler = callback;
    return this;
};

/**
 * Init options
 *
 * @param {Object} options
 * @api private
 */

pm2Desc.prototype.init = function (options) {
    this.options = null;
    this.errorHandler = null;
    this.descHander = null;
    this.descInternal = null;
    this.connectHandler = null;

    options = options || {};
    // Default internal 10000 ms
    options.internal = options.internal || 10000;
    this.options = options;
};

/**
 * Connect pm2 and start describe pm2 list internal 
 * @api public
 */

pm2Desc.prototype.start = function () {
    this.connect(err => {
        if (err) {
            this.connectHandler && this.connectHandler(err);
            return;
        }

        // On pm2 connected
        this.connectHandler && this.connectHandler();

        // Create describe pm2 list internal
        this.descInternal = setInterval(() => {
            this.descList.call(this);
        }, this.options.internal);
    });

    return this;
};

/**
 * Reset describe pm2 list internal
 *
 * @param {Number} internal
 * @return {Context} this
 * @api public
 */

pm2Desc.prototype.resetInternal = function (internal) {
    myValidator.isNumber(internal);
    this.options.internal = internal;

    clearInterval(this.descInternal);
    this.descInternal = setInterval(() => {
        this.descList.call(this);
    }, this.options.internal);

    return this;
};

/**
 * Pause pm2Desc 
 *
 * @return {Context} this
 * @api public
 */

pm2Desc.prototype.pause = function () {
    try {
        clearInterval(this.descInternal);
        pm2.disconnect();
    } catch (e) {
        this.errorHandler && this.errorHandler(e);
    }

    return this;
};

/**
 * Clear pm2Desc 
 *
 * @return {Context} this
 * @api public
 */

pm2Desc.prototype.clear = function () {
    try {
        clearInterval(this.descInternal);
        pm2.disconnect();
        this.init();
    } catch (e) {
        this.errorHandler && this.errorHandler(e);
    }

    return this;
};

/**
 * Expose pm2Desc 
 */

module.exports = pm2Desc;
