import Kafka from "kafkajs"

const log = console.log;

async function run() {
    try {
        const kafka = new Kafka.Kafka({
            "clientId": "myapp",
            "brokers": ["localhost:9092"]
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
        console.log(err.msg ?? "somthing wrong");
    }
}

run();

