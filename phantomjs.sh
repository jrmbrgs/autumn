#!/bin/bash
SELENIUM_URL="http://127.0.0.1:4444"
PHANTOMJS_DIR="/usr/lib/node_modules/phantomjs/lib/phantom/bin"
PHANTOMJS_BIN="$PHANTOMJS_DIR/phantomjs"
LOG_DIR=/var/log/phantomjs
ERROR_LOG=$LOG_DIR/phantomjs_error.log
LOG=$LOG_DIR/phantomjs.log
PID_FILE=/var/run/phantomjs.pid
WEBDRIVER_PORT=8081


do_start()
{
    if test -f $PID_FILE; then
        PID=`cat $PID_FILE`
        if  ps --pid $PID >/dev/null; then
            echo "Phantomjs is running...$PID"
            exit 0 
        else
            echo "Phantomjs isn't running..."
            echo "Removing stale pid file: $PID_FILE"
        fi
    fi
    echo "Starting Phantomjs..."
    phantomjs --webdriver=$WEBDRIVER_PORT --webdriver-selenium-grid-hub=$SELENIUM_URL >$LOG 2>$ERROR_LOG &
    error=$?
    if test $error -gt 0; then
        echo "Error $error! Couldn't start Phantomjs!"
    fi
    ps axf | grep "$PHANTOMJS_BIN" | grep -v grep  | awk {'print $1'} > $PID_FILE

}

do_stop()
{
   if test -f $PID_FILE; then
       echo "Stopping PhantomJS..."
       PID=`cat $PID_FILE`
       kill -3 $PID
       if kill -9 $PID; then
           sleep 2
           test -f $PID_FILE && rm -f $PID_FILE
       else
           echo "PhantomJS could not be stopped..."
       fi
   else
       echo "PhantomJS is not running."
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
        sleep 1
        do_start
        ;;
    'status')
        if test -f $PID_FILE; then
          PID=`cat $PID_FILE`
          if  ps --pid $PID >/dev/null; then
            echo "PhantomJS is running...$PID"
          else
             echo "PhantomJS isn't running..."
          fi
        else
            echo "PhantomJS isn't running..."
        fi
        ;;
    *)
        echo "Usage: $SELF start|stop|restart|status"
        exit 1
        ;;
esac
