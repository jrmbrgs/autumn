#!/bin/sh
trap exit ERR

# Update app-get
#apt-get update


# Install base
apt-get -y install curl openjdk-7-jre

# NodeJS
node -v
if [ $? -ne 0 ]; then
    curl -sL https://deb.nodesource.com/setup | bash -
    apt-get -y install nodejs
fi

# PhantomJS, WebdriverJS and test FW
phantomjs -v
if [ $? -ne 0 ]; then
    npm install -g phantomjs
fi
casperjs --version
if [ $? -ne 0 ]; then
    npm install -g casperjs
fi
#npm install -g webdriverjs
#npm install -g mocha chai

# SlimerJS
apt-get -y install libc6 libstdc++6 libgcc1 libgtk2.0-0 libasound2 libxrender1
apt-get -y install xvfb
if [ ! -f /usr/local/slimerjs/slimerjs ]; then
    curl -o slimerjs.tar.bz2 http://download.slimerjs.org/releases/0.9.3/slimerjs-0.9.3-linux-x86_64.tar.bz2
    tar -jxf slimerjs.tar.bz2
    mv slimerjs-0.9.3 /usr/local/slimerjs
    ln -s /usr/local/slimerjs/slimerjs /usr/bin/slimerjs
    export SLIMERJSLAUNCHER=/usr/local/slimerjs/xulrunner/xulrunner
fi

# Selenium
if [ ! -f /usr/local/selenium/selenium-server-standalone-2.42.2.jar ]; then
    mkdir /usr/local/selenium
    mkdir /var/log/selenium
    echo 'Downloading Selenium'
    wget http://selenium-release.storage.googleapis.com/2.42/selenium-server-standalone-2.42.2.jar
    mv selenium-server-standalone-2.42.2.jar /usr/local/selenium/
    # init.d
    cp selenium-grid /etc/init.d/
    update-rc.d selenium-grid defaults
    cp selenium-node /etc/init.d/
    update-rc.d selenium-node defaults
fi
#service selenium-grid start
#service selenium-node start


echo 'Starting phantomJS'
#nohup phantomjs --webdriver=8080 --webdriver-selenium-grid-hub=http://127.0.0.1:4444
