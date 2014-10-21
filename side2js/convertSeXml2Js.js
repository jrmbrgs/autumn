GLOBAL.ROOT_AD= __dirname;
GLOBAL.LOG_LVL= 'debug';

var logger=          require(ROOT_AD + '/libs/logger'),
    SeIde2JS=        require(ROOT_AD + '/libs/seIde2JS'),
    CasperFormatter= require(ROOT_AD + '/libs/formatters/casper');


var inFilePath =  '/autumn/tests/seIDE/loginFailed.xml';
var outFilePath =  '/autumn/tests/seIDE/loginFailed.js';
var casperFormatter= new CasperFormatter();
var seide2JS = new SeIde2JS(casperFormatter);
seide2JS.makeJSUnitTestFile(inFilePath, outFilePath);
