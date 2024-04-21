# Here's how you can start Docker Desktop on macOS:

`1` Open Docker Desktop from your Applications folder by double-clicking on Docker.app.
`2` Docker Desktop should start up automatically and display a Docker icon in the menu bar at the top of your screen.
`2` If Docker Desktop doesn't start automatically, you can start it manually by locating Docker.app in your Applications folder and double-clicking on it.



## Commands
# Start Zookeper Container and expose PORT 2181.
`docker run -p 2181:2181 zookeeper`

## Start Kafka Container, expose PORT 9092 and setup ENV variables.
docker run -p 9092:9092 \
-e KAFKA_ZOOKEEPER_CONNECT=<PRIVATE_IP>:2181 \
-e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://<PRIVATE_IP>:9092 \
-e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 \ // Optional
confluentinc/cp-kafka

<PRIVATE_IP> =: Wifi IP address


1. Start `node admin.js`
2. Start `node producer.js`
3. Start `node consumer.js user-1` or `node consumer.js user-2` etc.