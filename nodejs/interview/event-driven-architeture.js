/* 
Consider an application where you need to perform an asynchronous operation (like reading a file) 
and trigger further actions based on the completion of that operation.
*/


const EventEmitter = require('events');
const fs = require('fs');

class FileReader extends EventEmitter {
    readFile(filePath) {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                this.emit('error', err);
            } else {
                this.emit('data', data);
            }
        });
    }
}

const fileReader = new FileReader();

// Register event listeners
fileReader.on('data', (data) => {
    console.log('File data received:', data);
});

fileReader.on('error', (err) => {
    console.error('Error reading file:', err);
});

// Trigger the readFile method
fileReader.readFile('example.txt');


/* 


Real-World Use Cases of Event-Driven Architecture in Node.js

Web Servers: Handling HTTP requests and responses. Each request can be an event, and the server can respond to these events.
Real-Time Applications: Chat applications, online gaming, and live streaming where events like messages, game moves, or video chunks are emitted and processed.
Microservices Communication: Services emitting events to a message broker (like RabbitMQ or Kafka) and other services listening to those events to perform actions.

Benefits of Event-Driven Architecture

Decoupling: Components are loosely coupled, making it easier to manage and extend the system.
Scalability: It is easier to scale individual components without affecting the entire system.
Asynchronous Processing: Enhances performance by allowing non-blocking operations.

Challenges of Event-Driven Architecture

Complexity: Managing many events and ensuring correct sequencing can become complex.
Debugging: Tracing issues in an event-driven system can be more challenging than in a linear, synchronous system.
Error Handling: Proper error handling needs to be implemented to handle failures gracefully.



*/