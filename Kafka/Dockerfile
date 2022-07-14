FROM ubuntu:20.04

RUN apt-get update

# RUN apt-get install -y default-jre
# RUN apt-get install -y openjdk-8-jre-headless
RUN apt-get install -y openjdk-11-jre-headless

RUN mkdir -p /container/tmp/kafka-logs
RUN mkdir -p /container/tmp/zookeeper

WORKDIR /container

RUN apt-get install -y curl
RUN curl "https://dlcdn.apache.org/kafka/3.2.0/kafka_2.13-3.2.0.tgz" -o kafka_2.13-3.2.0.tgz
# RUN wget "https://dlcdn.apache.org/kafka/3.2.0/kafka_2.13-3.2.0.tgz"

RUN tar -xzf kafka_2.13-3.2.0.tgz

RUN rm *.tgz

RUN mv kafka* kafkadir

COPY  ./files/zookeeper /etc/init.d/zookeeper
COPY  ./files/kafka /etc/init.d/kafka

RUN chmod 751 /etc/init.d/zookeeper
RUN chmod 751 /etc/init.d/kafka

COPY ./files/zookeeper.properties /container/kafkadir/config/zookeeper.properties
COPY ./files/server.properties /container/kafkadir/config/server.properties

EXPOSE 9092

# RUN apt-get install -y systemd

# RUN systemctl start zookeeper.service

RUN update-rc.d zookeeper defaults
RUN update-rc.d kafka defaults

COPY ./files/start_services.sh /container/start_services.sh
RUN chmod 751 /container/start_services.sh

ENTRYPOINT [ "bash", "/container/start_services.sh" ]
