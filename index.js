const myValidator = require('./libs/validator');

function pm2Desc(pm2, descOptions) {
    myValidator.init();

    /**
     * Variables
     */

    descOptions = descOptions || null;
    descOptions.descInterval = descOptions.descInterval || 2000;
    pm2.descOptions = descOptions;
    pm2.descHander = null;
    pm2.errorHandler = null;
    pm2.descTask = null;


    /**
     * Describe pm2 list
     * @return {Object} pm2
     * @api private
     */
    
    let descList = function () {
        pm2.list((err, list) => {
            if (err) {
                pm2.errorHandler && pm2.errorHandler(err);
            } else {
                pm2.descHander && pm2.descHander(list);
            }
        });
    };

    /**
     * Create describe task
     *
     * @api private
     */

    let descListInterval = function () {
        pm2.descTask = setInterval(descList, pm2.descOptions.descInterval);
    };
    
    /**
     * On describe pm2 list
     *
     * @param {Function} callback
     * @return {Object} pm2
     * @api public
     */
    
    pm2.onDescribe = function (callback) {
        myValidator.isFunction(callback);
        pm2.descHander = callback;
        return pm2;
    };
    
    /**
     * On errors
     *
     * @param {Function} callback
     * @return {Object} pm2
     * @api public
     */
    
    pm2.descError = function (callback) {
        myValidator.isFunction(callback);
        pm2.errorHandler = callback;
        return pm2;
    };
    
    /**
     * Connect pm2 and start describe pm2 list interval 
     *
     * @param {Number} interval, optional
     * @return {Object} pm2
     * @api public
     */
    
    pm2.descStart = function (interval) {
        pm2.descOptions.descInterval = interval || pm2.descOptions.descInterval;
        // Create describe pm2 list interval
        descListInterval();
    
        return pm2;
    };
    
    /**
     * Reset describe pm2 list interval
     *
     * @param {Number} interval
     * @return {Object} pm2
     * @api public
     */
    
    pm2.resetDescInterval = function (interval) {
        myValidator.isNumber(interval);
        pm2.descOptions.descInterval = interval;
    
        pm2.descClear();
        descListInterval();
    
        return pm2;
    };
    
    /**
     * Clear pm2Desc 
     *
     * @return {Object} pm2
     * @api public
     */
    
    pm2.descClear = function () {
        try {
            clearInterval(pm2.descTask);
        } catch (e) {
            pm2.errorHandler && pm2.errorHandler(e);
        }
    
        return pm2;
    };
}

/**
 * Expose pm2Desc 
 */

module.exports = pm2Desc;
