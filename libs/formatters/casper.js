var l= require(ROOT_AD + '/libs/logger');

var CasperFormatter = function(){

    this.buildSelector = function (target){
        var x = target.split("=",2);
        var selector = '';
        switch(x[0]) {
            case 'id':
                selector = '#' + x[1];
                break;
            case 'css':
                selector = x[1];
                break;
            case 'name':
                selector = "[" + target + "]";
                break;
            default:
                //throw "Unknown selector : '" +x[1]+ "'";
        }
        l.debug(selector);
        return selector;
    };
};



CasperFormatter.prototype.header = function (testName, nbTest, logLevel){
    l.debug('header');
    return 'if(cnf.debug) {\n' +
           '    casper.options.verbose = true;\n' +
           '    casper.options.logLevel = "' + logLevel + '";\n' +
           '}\n' +
           '\n' +
           'casper.test.begin("' + testName + '", ' + nbTest + ', function suite(test) {\n';
};

CasperFormatter.prototype.footer = function (url){
    l.debug('footer');
    return '    casper.run(function() {\n' +
           '        test.done();\n' +
           '    });\n' +
           '});\n';

};


/**
 *
 */
CasperFormatter.prototype.open = function (url){
    l.debug('open');
    return "    casper.start('" + url + "', function() {\n" +
           "        test.assertHttpStatus(200, 'Connected to login page');\n" +
           "    });\n";
};


/**
 *
 */
CasperFormatter.prototype.type = function (target, value){
    l.debug('type');
    var selector = this.buildSelector(target);
    return "    casper.then(function() {\n" +
           "        this.sendKeys('" + selector + "', '" + value + "');\n" +
           "    });\n";
};


/**
 *
 */
CasperFormatter.prototype.clickAndWait = function (target, value){
    l.debug('clickAndWait');
    var selector = this.buildSelector(target);
    return "    casper.then(function() {\n" +
           "        this.click( '" + selector + "');\n" +
           "    });\n";
};


/**
 *
 */
CasperFormatter.prototype.verifyElementPresent = function (target){
    l.debug('verifyElementPresent');
    var selector = this.buildSelector(target);
    return "    casper.then(function() {\n" +
           "        test.assertExists('" + selector +"', '" + selector + " found');\n" +
           "    });\n";
};


/**
 *
 */
CasperFormatter.prototype.capture = function (target){
    l.debug('capture');
    return [
        "    casper.each( cnf.viewports, function(casper, vp){",
        "        casper.then(function() {",
        "            this.viewport(vp.width, vp.height);",
        "        });",
        "        casper.then(function() {",
        "            var filePath= cnf.capturesAD + vp.name + '-' + vp.width + 'x' + vp.height + '.png';",
        "            this.capture( filePath, {top: 0, left: 0, width: vp.width, height:vp.height});",
        "        });",
        "    });",
        ""
    ].join("\n");
};


module.exports = CasperFormatter;
