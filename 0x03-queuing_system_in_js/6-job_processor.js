const kue = require('kue');

const queue = kue.createQueue();


const sendNotification = (phoneNumber, message) => {
  console.log(
    `Sending notification to ${phoneNumber}, with message: ${message}`
  )
}
// Create an object for job data
const jobData = {
 phoneNumber: '4153518780',
 message: 'This is the code to verify your account',
}

// Create job in the push_notifify
const job = queue.create('push_notification_code', jobData)
  .save((err) => {
    if (!err) {
      console.log(`Notification job created: ${job.id}`);
    }
});

// Process jobs
queue.process('push_notification_code', (job, done) => {
  const { phoneNumber, message } = jobData;
  sendNotification(phoneNumber, message);
  done();
});

job.on('failed', () => {
  console.log('Notification job failed');
});
