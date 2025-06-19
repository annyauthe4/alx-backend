const kue = require('kue');

const queue = kue.createQueue();

// Create an object for job data
const jobData = {
 phoneNumber: '1234567890',
 message: 'A test notification',
}

// Create job in the push_notifify
const job = queue.create('push_notification_code', jobData)
  .save((err) => {
    if (!err) {
       console.log(`Notification job create: ${job.id}`);
    }
});

// Job event listeners
job.on('complete', () => {
  console.log('Notification job completed');
});

job.on('failed', () => {
  console.log('Notification job failed');
});
