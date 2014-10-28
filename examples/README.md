#sIde2JS examples
Convert Selenium IDE XML macro into CapserJs test suite

## Run convertion script
  nodejs convertSeXml2Js.js --infile /autumn/examples/seIDE/loginFailed.XML -o /autumn/examples/casperjs/ -r

## Run casper test
  casperjs test /autumn/examples/casperjs/loginFailed.js
