// Import createClient and print
import { createClient } from 'redis';
import { print } from 'redis';

// Create a client
const client = createClient();

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

// Log error message
client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err.message}`);
});

// Function to set a new key with value and display confirmation msg
function setNewSchool(schoolName, value) {
  client.set(schoolName, value, print);
}

// Function to get set value
function displaySchoolValue(schoolName) {
  client.get(schoolName, (err, reply) => {
    if (err) {
      console.error(`Error getting value: ${error.message}`);
      return;
    }
    console.log(reply);
  });
}

// Call functions
displaySchoolValue('ALX');
setNewSchool('ALXSanFrancisco', '100');
displaySchoolValue('ALXSanFrancisco');
