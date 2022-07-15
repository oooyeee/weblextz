#!/bin/bash
service zookeeper start
sleep 2s
# service kafka start

if [ -n "${PORT}" ]
then
    LINE1="listeners=PLAINTEXT://:$PORT"
    LINE2="advertised.listeners=PLAINTEXT://oooyeee-test.herokuapp.com:80"
    echo "$LINE1" >> /container/kafkadir/config/server.properties
    echo "$LINE2" >> /container/kafkadir/config/server.properties
fi


isRunning="running"
KAFKA_STATUS=/container/tmp/kafka_status

echo -n "$isRunning" > $KAFKA_STATUS

/container/kafkadir/bin/kafka-server-start.sh /container/kafkadir/config/server.properties