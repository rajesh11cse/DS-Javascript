const { Kafka } = require("kafkajs");

// exports.kafka = new Kafka({
//   clientId: "my-app",
//   brokers: ["<PRIVATE_IP>:9092"],
// });

exports.kafka = new Kafka({
  clientId: "my-app",
  brokers: ["192.168.1.3:9092"],
});