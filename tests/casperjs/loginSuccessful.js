var cnf = require('../config.js')
if(cnf.debug) {
    casper.options.logLevel = 'debug';
}
casper.test.begin('testing VPG login successful', 4, function suite(test) {

    /**
     * Load the login page and try to log in w/ a valid user
     */
    casper.start( cnf.vpg.loginUrl, function() {
        test.assertHttpStatus(200, 'Connected to login page');
        test.assertTitle("Voyage Privé : séjour luxe, vacances haut gamme et vente privée sur internet", "OK");
        casper.waitForSelector('form[id="login-form"]', function() {
            test.assertExists('form[id="login-form"]', "Login form is found");
            this.fill('form#login-form', {
                'email':    cnf.vpg.validEmail,
                'password': cnf.vpg.validPass
            }, false);
        });
    });
    casper.then(function() {
        this.click( '#login-form input[type="submit"]');
        this.echo('Form submitted');
    });

    casper.then(function() {
        casper.waitForSelector('div#sales-container-now', function() {
            this.echo('SDV loaded');
        
            test.assertEval(function() {
                var saleNB = $('div#sales-container-now article').length;
                return saleNB >50;
            }, "More than 50 sales displayed on SDV");
        });
    });

    casper.run(function() {
        test.done();
    });

});
