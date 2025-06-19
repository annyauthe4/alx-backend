import { expect } from 'chai';
import kue from 'kue';
import createPushNotificationsJobs from './8-job.js';

const queue = kue.createQueue();

describe('createPushNotificationsJobs', function () {
  before(function () {
    // Enter test mode before tests run
    queue.testMode.enter();
  });

  afterEach(function () {
    // Clear the queue after each test
    queue.testMode.clear();
  });

  after(function () {
    // Exit test mode after all tests
    queue.testMode.exit();
  });

  it('should throw an error if jobs is not an array', function () {
    expect(() => createPushNotificationsJobs('not array', queue)).to.throw('Jobs is not an array');
  });

  it('should create jobs in the queue', function () {
    const jobs = [
      { phoneNumber: '1234567890', message: 'Test 1' },
      { phoneNumber: '0987654321', message: 'Test 2' },
    ];

    createPushNotificationsJobs(jobs, queue);

    expect(queue.testMode.jobs.length).to.equal(2);
    expect(queue.testMode.jobs[0].type).to.equal('push_notification_code_3');
    expect(queue.testMode.jobs[0].data).to.deep.equal(jobs[0]);
    expect(queue.testMode.jobs[1].data).to.deep.equal(jobs[1]);
  });
});
