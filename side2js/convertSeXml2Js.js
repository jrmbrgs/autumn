GLOBAL.ROOT_AD= __dirname;
GLOBAL.LOG_LVL= 'debug';

///
var fs= require('fs');

/// 
var logger=          require(ROOT_AD + '/libs/logger'),
    SeIde2JS=        require(ROOT_AD + '/libs/seIde2JS'),
    CasperFormatter= require(ROOT_AD + '/libs/formatters/casper');



/// Argv handling
var regen= false;
process.argv.forEach(function(val, index, array) {
    var argx= val.split('=');
    console.log(argx);
    switch(argx[0]) {
        case 'regen':
            regen= true;
            break;
    }
});


//var inFilePath =  '/autumn/tests/seIDE/loginFailed.xml';
//var outFilePath =  '/autumn/tests/seIDE/loginFailed.js';
var inFilePath =  '/autumn/tests/seIDE/loginSuccessful.xml';
var outFilePath =  '/autumn/tests/seIDE/loginSuccessful.js';
var casperFormatter= new CasperFormatter();
var seide2JS = new SeIde2JS(casperFormatter, regen);
seide2JS.makeJSUnitTestFile(inFilePath, outFilePath);
