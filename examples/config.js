var config = {};
config.debug= true;

config.vpg= {};
config.vpg.loginUrl=        'https://www.voyage-prive.com/login/index';
config.vpg.validEmail=      'jer0me@hotmail.fr';
config.vpg.validPass=       '**********';
config.vpg.invalidEmail=    'foo@foo.com';
config.vpg.invalidPass=     'bar';

config.capturesAD= '/autumn/tests/seIDE/captures/';
config.viewports= [
      {name: 'smartphone-portrait',  width: 320,  height: 480},
      {name: 'smartphone-landscape', width: 480,  height: 320},
      {name: 'tablet-portrait',      width: 768,  height: 1024},
      {name: 'tablet-landscape',     width: 1024, height: 768},
      {name: 'desktop-standard',     width: 1280, height: 1024}
    ];
 

module.exports = config;
