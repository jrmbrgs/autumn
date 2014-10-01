#!/bin/sh
trap exit ERR

# Update app-get
#apt-get update


# Install base
apt-get -y install curl openjdk-7-jre 

# NodeJS
curl -sL https://deb.nodesource.com/setup | bash -
apt-get -y install nodejs

# PhantomJS, WebdriverJS and test FW
npm install -g phantomjs
npm install -g webdriverjs
#npm install -g casperjs
npm install -g mocha chai
phantomjsBin=$(which phantomjs);
phantomjsBinPath="/usr/lib/node_modules/phantomjs/bin"

# Selenium
if [ ! -f /usr/local/bin/selenium-server-standalone-2.42.2.jar ]; then
    echo 'Downloading Selenium'
    wget http://selenium-release.storage.googleapis.com/2.42/selenium-server-standalone-2.42.2.jar
    mv selenium-server-standalone-2.42.2.jar /usr/local/bin
fi
echo 'Starting Selenium'
PATH="$phantomjsBinPath:$PATH"
nohup java -jar /usr/local/bin/selenium-server-standalone-1.42.2.jar -Dphantomjs.binary.path=$phantomjsBinPath


echo 'Starting phantomJS'
nohup phantomjs --webdriver=8080 --webdriver-selenium-grid-hub=http://127.0.0.1:4444
