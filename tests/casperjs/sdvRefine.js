//casper.options.clientScripts = ["/autumn/vendors/jquery.min.js"];
var cnf = require('../config.js')
var utils = require('clientutils').create();

if(cnf.debug) {
    casper.options.logLevel = 'debug';
}

casper.test.begin('Refine SDV sales', 6, function suite(test) {

    /**
     * Load the login page and try to log in w/ a valid user
     */
    casper.start( cnf.vpg.loginUrl, function() {
        test.assertHttpStatus(200, 'Connected to login page');
        test.assertTitle("Voyage Privé : séjour luxe, vacances haut gamme et vente privée sur internet", "Title is correct");
        casper.waitForSelector('form#login-form', function() {
            test.assertExists('form[id="login-form"]', "Login form is found");
            this.fill('form#login-form', {
                'email':    cnf.vpg.validEmail,
                'password': cnf.vpg.validPass
            }, false);
        });
    })
    casper.then(function() {
        this.click( '#login-form input[type="submit"]');
    });

    
    /**
     * Wait for SDV to load
     */
    casper.waitForSelector('div#sales-container-now', function() {
        var saleNB = this.evaluate( function(){
            return $('div#sales-container-now article').length;
        });
        test.assert( saleNB > 50, "More than 50 sales displayed on SDV");
        this.echo('SDV loaded : ' + saleNB);
    });
    
    /**
     * Refine sdv w/ France
     */
    casper.then(function() {
        casper.sendKeys('#destinationOther input', 'France', {keepFocus: false});
   // casper.echo(casper.getPageContent());
        casper.waitForSelector('div[data-group="Pays"]', function() {
            var country = this.evaluate( function(){
                 return $('div[data-group="Pays"] span.highlight').html();
            });
            test.assertEquals( country, 'France', 'France found in autocomplete filter "Pays"');
                
        });
    });
    casper.then(function(){
        casper.click('div[data-group="Pays"] div[data-value="fra"]');
    });

    /**
     * Wait for refined SDV to load
     */
    casper.waitForSelector('div.filter_choice[data-value="fra"]', function() {
        var titleSaleNB = this.evaluate( function(){
            return parseInt($('h2#nbSales>span').html());
        });
        var saleNB = this.evaluate( function(){
            return $('div#sales-container-now article').length;
        });
        this.echo('France SDV loaded : ' + saleNB);
        test.assert( saleNB > 0, 'France sales loaded correctly');
    });
    casper.run(function() {
        test.done();
    });

});
