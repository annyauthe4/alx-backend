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

// Subscribe to ALXchannel
client.subscribe('ALXchannel');

// Listen for messages
client.on('message', (channel, message) => {
  console.log(message);
  if (message === 'KILL_SERVER') {
    client.unsubscribe('ALXchannel');
    client.quit();
  }
});
