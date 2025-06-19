import express from 'express';
import { createClient } from 'redis';
import { promisify } from 'util';
import kue from 'kue';

const app = express();
const port = 1245;
const queue = kue.createQueue();

// Redis client
const client = createClient();
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

// Initialize reservation availability
let reservationEnabled = true;

// Reserve seat in Redis
async function reserveSeat(number) {
  await setAsync('available_seats', number);
}

// Get current seats from Redis
async function getCurrentAvailableSeats() {
  const seats = await getAsync('available_seats');
  return parseInt(seats || '0', 10);
}

// Set initial seats to 50
reserveSeat(50);

// Route to get available seats
app.get('/available_seats', async (req, res) => {
  const numberOfAvailableSeats = await getCurrentAvailableSeats();
  res.json({ numberOfAvailableSeats: numberOfAvailableSeats.toString() });
});

// Route to reserve a seat
app.get('/reserve_seat', (req, res) => {
  if (!reservationEnabled) {
    return res.json({ status: 'Reservation are blocked' });
  }

  const job = queue.create('reserve_seat').save(err => {
    if (!err) {
      res.json({ status: 'Reservation in process' });
    } else {
      res.json({ status: 'Reservation failed' });
    }
  });

  job.on('complete', () => {
    console.log(`Seat reservation job ${job.id} completed`);
  });

  job.on('failed', err => {
    console.log(`Seat reservation job ${job.id} failed: ${err.message}`);
  });
});

// Route to process the queue
app.get('/process', (req, res) => {
  res.json({ status: 'Queue processing' });

  queue.process('reserve_seat', async (job, done) => {
    let seats = await getCurrentAvailableSeats();

    if (seats <= 0) {
      reservationEnabled = false;
      return done(new Error('Not enough seats available'));
    }

    seats -= 1;
    await reserveSeat(seats);

    if (seats === 0) {
      reservationEnabled = false;
    }

    done();
  });
});

// Start server
app.listen(port, () => {
  console.log(`API available on localhost port ${port}`);
});
