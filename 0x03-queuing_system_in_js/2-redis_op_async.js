// Import createClient and print
import { createClient } from 'redis';
import { print } from 'redis';
import { promisify } from 'util'

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

const getAsync = promisify(client.get).bind();

// Modify Function to get set value
async function displaySchoolValue(schoolName) {
  try{
    const value = await getAsync(schoolName);
    console.log(value);
  } catch (err) {
    console.error(`Error: err.massage`);
  }
}

// Call functions
displaySchoolValue('ALX');
setNewSchool('ALXSanFrancisco', '100');
displaySchoolValue('ALXSanFrancisco');
