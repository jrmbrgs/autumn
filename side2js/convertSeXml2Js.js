/**
 *
 */


/// NodeJS modules
var fs=   require('fs'),
    path= require('path'),
    argx= require('yargs'); // argv parser

/// SIde2JS modules
var config=          require('./config.js'),
    l=               require(ROOT_AD + 'libs/logger'),
    SIde2JS=         require(ROOT_AD + 'libs/sIde2JS'),
    CasperFormatter= require(ROOT_AD + 'libs/formatters/casper');

/// Argv def
var argv= argx.usage("(-i|-I) [options]",{
        infile: { alias:'i', description:'The Selenium IDE XML absolute file path to convert'},
        indir:  { alias:'d', description:'The absolute dir path containing Selenium IDE XML file to convert'},
        outdir: { alias:'o', description:'The absolute dir path storing results out files'},
        regen:  { alias:'r', help:'Remove existing outfile'}
    }).argv;

l.info(argv);

/// Argv check
var outDir= ROOT_AD;
if(argv.outdir){
    try{
        fs.statSync(argv.outdir).isDirectory();
        outDir= argv.outdir
    }
    catch (fsE) {
        l.error('--outdir' + argv.outdir + ' is not a directory');
        argx.showHelp();
        process.exit(1);
    }

}

if(!argv.infile && !argv.indir){
    argx.showHelp();
    process.exit(1);
}

var inFiles= [];
if(argv.indir){
    try{
        var inDirFiles= fs.readdirSync(argv.indir);
        var inDirXmlFiles= inDirFiles.filter( function(item){ return /\.xml$/i.test(item)});
        inFiles = inDirXmlFiles.map( function(item){ return argv.indir + '/' + item });
        
    }
    catch (fsE) {
        l.error('--indir' + argv.indir + ' is not a directory');
        argx.showHelp();
        process.exit(1);
    }
}
if(argv.infile){
    inFiles.push(argv.infile);
}


/// Convert the given files
var casperFormatter= new CasperFormatter();
var side2JS = new SIde2JS(casperFormatter, argv.regen);
inFiles.forEach( function(inFilePath, ifile){
    var outFileName= path.basename(inFilePath).replace( /\.xml$/i,'\.js');
    var outFilePath= outDir + outFileName;
    side2JS.makeJSUnitTestFile(inFilePath, outFilePath);
});
