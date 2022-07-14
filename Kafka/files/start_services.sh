#!/bin/bash
service zookeeper start
sleep 2s
# service kafka start

isRunning="running"
KAFKA_STATUS=/container/tmp/kafka_status

echo -n "$isRunning" > $KAFKA_STATUS

/container/kafkadir/bin/kafka-server-start.sh /container/kafkadir/config/server.properties