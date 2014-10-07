var cnf = require('../config.js')
if(cnf.debug) {
    casper.options.logLevel = 'debug';
}

casper.test.begin('testing VPG login fail', 5, function suite(test) {

    /**
     * Load the login page and try to log in w/ a wrong user
     */
    casper.start( cnf.vpg.loginUrl, function() {
        test.assertHttpStatus(200, 'Connected to login page');
        test.assertTitle("Voyage Privé : séjour luxe, vacances haut gamme et vente privée sur internet", "OK");
        casper.waitForSelector('form[id="login-form"]', function() {
            test.assertExists('form[id="login-form"]', "Login form is found");
            this.fill('form#login-form', {
                'email':    cnf.vpg.invalidEmail,
                'password': cnf.vpg.invalidPass
            }, false);
        });
    })
    casper.then(function() {
        this.click( '#login-form input[type="submit"]');
    });

    casper.then(function() {
        test.assertUrlMatch(/login\/index/, "Still on login page");         
        test.assertExists('div.error.flashMessage', "Error found");

    });

    casper.run(function() {
        test.done();
    });

});
