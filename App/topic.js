import Kafka from "kafkajs"

const log = console.log;

async function run() {
    try {
        const kafka = new Kafka.Kafka({
            "clientId": "myapp",
            "brokers": ["oooyeee-test.herokuapp.com:80"],
            "connectionTimeout": 30_000,
            "authenticationTimeout": 30_000
        })

        const admin = kafka.admin()
        console.log("Connecting...")

        await admin.connect();
        console.log("Connected!!");
        //A-M, N-Z
        await admin.createTopics({
            topics: [
                {
                    "topic": "Users",
                    "numPartitions": 2
                }
            ]
        })

        log("Created Topic Successfully")
        await admin.disconnect();
    } catch (err) {
        console.log(err ?? "somthing wrong");
    }
}

run();

