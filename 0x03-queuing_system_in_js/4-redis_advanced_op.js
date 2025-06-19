// Import createClient and print
import { createClient } from 'redis';
import { print } from 'redis';

// Create Redis client
const client = createClient();

// Handle connection errors
client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err.message}`);
});

// Log when connected
client.on('connect', () => {
  console.log('Redis client connected to the server');

  // Create Hash values
  client.hset('ALX', 'Portland', 50, print);
  client.hset('ALX', 'Seattle', 80, print);
  client.hset('ALX', 'New York', 20, print);
  client.hset('ALX', 'Bogota', 20, print);
  client.hset('ALX', 'Cali', 40, print);
  client.hset('ALX', 'Paris', 2, print);

  // Display Hash
  client.hgetall('ALX', (err, result) => {
    if (err) {
      console.error('Error:', err);
      return;
    }
    console.log(result);
  });
});
