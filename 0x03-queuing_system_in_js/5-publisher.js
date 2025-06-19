// Import redis
import { createClient } from 'redis';

// Create client
const client = createClient();

// On error
client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err.message}`);
});

// On connect
client.on('connect', () => {
  console.log('Redis client connected to the server');
});

// publishMessage function
function publishMessage(message, time) {
  setTimeout(() => {
    console.log(`About to send ${message}`);
    client.publish('ALXchannel', message);
  }, time);
}

// Publish messages
publishMessage("ALX Student #1 starts course", 100);
publishMessage("ALX Student #2 starts course", 200);
publishMessage("KILL_SERVER", 300);
publishMessage("ALX Student #3 starts course", 400);
