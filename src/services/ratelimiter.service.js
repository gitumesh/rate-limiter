class RateLimiterService {

    constructor() {
        this.clientMap = new Map(); // Map used as we can get client in O(1);
        // set Interval could be implemented here for cleaning up memory

        // setInterval(() => this.cleanupInactiveClients, 5 * 60 * 1000);// runs every 5 minutes
        // another better way to run this would be recursion with setTimeout
    }

    // this is a sync function, could also be run on a worker thread
    cleanupInactiveClients(){
        const now = Date.now();
        const oneMinuteAgo = now  - (60 * 1000); // Time calculated in milliseconds

        for (const [clientId, data] of this.clientMap.entries()){
            data.timestamps = data.timestamps.filter(timestamps => timestamps > oneMinuteAgo);

            if (data.timestamps.length === 0){
                this.clientMap.delete(clientId);
            }
        }
    }

       // this is a sync function, could also be run on a worker thread
    cleanupInactiveClientsRecusively(){
        const now = Date.now();
        const oneMinuteAgo = now  - (60 * 1000); // Time calculated in milliseconds

        for (const [clientId, data] of this.clientMap.entries()){
            data.timestamps = data.timestamps.filter(timestamps => timestamps > oneMinuteAgo);

            if (data.timestamps.length === 0){
                this.clientMap.delete(clientId);
            }
        }
        setTimeout(this.cleanupInactiveClientsRecusively(),  5 * 60 * 1000)
    }

    registerClient(clientId, limitPerMinute){
        this.clientMap.set(clientId, {
            limit: limitPerMinute,
            request: 0,
            timestamps : [] 
        })
    }

    isRateLimited(clientId){
        const client = this.clientMap.get(clientId);

        if (!client){
            return false;
        }

        const now = Date.now();
        const oneMinuteAgo = now - (60 * 1000); // Time calculated in milliseconds

         // filtering and replacing remove all time logs older than a minute
        client.timestamps = client.timestamps.filter(ts => ts > oneMinuteAgo);

        if (client.timestamps.length < client.limit){
            client.timestamps.push(now)
            return true
        }

        return false;
    }

}

module.exports = new RateLimiterService();