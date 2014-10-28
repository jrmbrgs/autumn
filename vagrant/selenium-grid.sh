#!/bin/bash
SELENIUM_DIR=/usr/local/selenium
SELENIUM_APP="$SELENIUM_DIR/selenium-server-standalone-2.42.2.jar"
LOG_DIR=/var/log/selenium
ERROR_LOG=$LOG_DIR/selenium_error.log
LOG=$LOG_DIR/selenium.log
PID_FILE=/var/run/selenium-grid.pid
PHANTOMJS_BIN_PATH=/usr/lib/node_modules/phantomjs/bin

do_start()
{
    if test -f $PID_FILE; then
        PID=`cat $PID_FILE`
        if  ps --pid $PID >/dev/null; then
            echo "Selenium is running...$PID"
            exit 0 
        else
            echo "Selenium isn't running..."
            echo "Removing stale pid file: $PID_FILE"
        fi
    fi
    echo "Starting Selenium..."
    echo "COMMAND: java -jar $SELENIUM_APP -Dphantomjs.binary.path=$PHANTOMJS_BIN_PATH -role hub >$LOG 2>$ERROR_LOG &"
    java -jar $SELENIUM_APP -Dphantomjs.binary.path=$PHANTOMJS_BIN_PATH -role hub >$LOG 2>$ERROR_LOG &
    error=$?
    if test $error -gt 0; then
        echo "Error $error! Couldn't start Selenium!"
    fi
    ps -C java -o pid,cmd | grep $SELENIUM_APP  | awk {'print $1 '} > $PID_FILE

}

do_stop()
{
    if test -f $PID_FILE; then
        echo "Stopping Selenium..."
        PID=`cat $PID_FILE`
        kill -3 $PID
        if kill -9 $PID; then
            sleep 2
            test -f $PID_FILE && rm -f $PID_FILE
        else
            echo "Selenium could not be stopped..."
        fi
    else
        echo "Selenium is not running."
    fi
}


case "${1:-''}" in
    'start')
        do_start
        ;;
    'stop')
        do_stop
        ;;
    'restart')
        do_stop
        do_start
        ;;
    'status')
        if test -f $PID_FILE; then
          PID=`cat $PID_FILE`
          if  ps --pid $PID >/dev/null; then
            echo "Selenium is running...$PID"
          else
             echo "Selenium isn't running..."
          fi
        else
            echo "Selenium isn't running..."
        fi
        ;;
    *)
        echo "Usage: $SELF start|stop|restart|status"
        exit 1
        ;;
esac
