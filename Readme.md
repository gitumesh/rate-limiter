For testing

-> run npm install && npm run start incase not using docker image

=> For docker
-> docker build -t rate-limiter .
-> docker run -p 3000:3000 rate-limiter


=> Concurrency / thread safety
-> Node.js has single-threaded event loop. Code is Atomic in our case. There are no race conditionsa

=> Scalability approach 
-> For now the logic is for server instance. The code should be migrated to valkey (redis fork) for multiple instances to run simulatneously.


=> Memory growth handling
-> we have pruned all request older than 1 minute using filter. For inactive users, data needs to be cleaned. This could be done using a cron job and/or setInterval and/or using LRU cahe here.


