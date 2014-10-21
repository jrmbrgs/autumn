var winston = require('winston');

var l= new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({ level: LOG_LVL, json: false, timestamp: true }),
        new winston.transports.File({ level: LOG_LVL, filename: ROOT_AD + '/logs/error.log', json: false })
    ],
    exceptionHandlers: [
        new (winston.transports.Console)({ json: false, timestamp: true }),
        new winston.transports.File({ filename: ROOT_AD + '/logs/error.log', json: false })
    ],
    exitOnError: false
});
module.exports=l;
