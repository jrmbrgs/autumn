var winston = require('winston');
var logFileAF = ROOT_AD + 'logs/error.log';
console.log("Loging in '" + logFileAF + "'");

var l= new (winston.Logger)({
    transports: [
        //new (winston.transports.Console)({ level: LOG_LVL, json: false, timestamp: true }),
        new winston.transports.File({ level: LOG_LVL, filename: logFileAF, json: false })
    ],
    exceptionHandlers: [
        //new (winston.transports.Console)({ json: false, timestamp: true }),
        new winston.transports.File({ filename: logFileAF, json: false })
    ],
    exitOnError: false
});
module.exports=l;
