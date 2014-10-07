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

# Selenium
if [ ! -f /usr/local/selenium/selenium-server-standalone-2.42.2.jar ]; then
    mkdir /usr/local/selenium
    mkdir /var/log/selenium
    echo 'Downloading Selenium'
    wget http://selenium-release.storage.googleapis.com/2.42/selenium-server-standalone-2.42.2.jar
    mv selenium-server-standalone-2.42.2.jar /usr/local/selenium/
fi
cp selenium-grid /etc/init.d/
update-rc.d selenium-grid defaults
cp selenium-node /etc/init.d/
update-rc.d selenium-node defaults

service selenium-grid start
service selenium-node start


echo 'Starting phantomJS'
#nohup phantomjs --webdriver=8080 --webdriver-selenium-grid-hub=http://127.0.0.1:4444
