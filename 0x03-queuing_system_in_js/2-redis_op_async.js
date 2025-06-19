// Import createClient and print
import { createClient } from 'redis';
import { print } from 'redis';
import { promisify } from 'util'

// Create a client
const client = createClient();

// Log error message
client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err.message}`);
});

// Function to set a new key with value and display confirmation msg
function setNewSchool(schoolName, value) {
  client.set(schoolName, value, print);
}

const getAsync = promisify(client.get).bind();

// Modify Function to get set value
async function displaySchoolValue(schoolName) {
  try{
    const value = await getAsync(schoolName);
    console.log(value);
  } catch (err) {
    console.error('Error:', err.message);
  }
}

// Call functions
async function main() {
  await displaySchoolValue('ALX');
  setNewSchool('ALXSanFrancisco', '100');
  await displaySchoolValue('ALXSanFrancisco');
}

client.on('connect', async () => {
  console.log('Redis client connected to the server');
  await main();
});
