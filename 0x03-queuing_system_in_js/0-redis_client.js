// Import redis
import { createClient } from 'redis';

// Create a client
const client = createClient();

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

// Log error message
client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err.message}`);
});
