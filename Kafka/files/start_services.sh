#!/bin/bash
service zookeeper start
sleep 2s
# service kafka start

if [ -n "${PORT}" ]
then
    LINE1="listeners=INTERNAL://0.0.0.0:19092,EXTERNAL://0.0.0.0:$PORT"
    LINE2="listener.security.protocol.map=INTERNAL:PLAINTEXT,EXTERNAL:PLAINTEXT"
    LINE3="advertised.listeners=INTERNAL://localhost:19092,EXTERNAL://yaro.dev:80"
    LINE4="inter.broker.listener.name=INTERNAL"
    echo "$LINE1" >> /container/kafkadir/config/server.properties
    echo "$LINE2" >> /container/kafkadir/config/server.properties
    echo "$LINE3" >> /container/kafkadir/config/server.properties
    echo "$LINE4" >> /container/kafkadir/config/server.properties
fi

isRunning="running"
KAFKA_STATUS=/container/tmp/kafka_status

echo -n "$isRunning" > $KAFKA_STATUS

/container/kafkadir/bin/kafka-server-start.sh /container/kafkadir/config/server.properties