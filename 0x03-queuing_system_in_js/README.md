<h1> QUEUING SYSTEM IN JS (REDIS SERVER) </h1>
Redis (REmote DIctionary Server) is an in-memory key-value data store, often used for caching, real-time analytics, message brokering etc.

<h2> Step-by-step how to run Redis on a machine</h2>
<ol>
    <li>
      Install Redis on Ubuntu
      <code>
       $ wget http://download.redis.io/releases/redis-6.0.10.tar.gz
       $ tar xzf redis-6.0.10.tar.gz
       $ cd redis-6.0.10
       $ make
      </code>
    </li>

    <li>
      Start Redis in the background
      <code>
       src/redis-server
      </code>

      Or run in the Background as service
      <code>
       sudo systemctl start redis
       sudo systemctl enable redis
      </code>
    </li>

    <li>
      Check that it is running
      <code>
       src/redis-cli ping
      </code>
      Expected response
      <code>
       PONG
      </code>
    </li>
</ol>

<h3> Required files for the Project </h3>
  <ul>
    <li> package.json (configuration file)</li>
    <li> .babelrc</li>
  </ul>
  Then run <code> $ npm install </code>

<h3> Run node js file on redis</h3>
install redis-server: <code> sudo apt install redis-server </code>
run server: <code> $ redis-server </code>
run file: <code> npm run dev <filename> </code>
