const express = require('express');
const rateLimiterService = require('./services/ratelimiter.service');
const rateLimiterMiddleWare = require('./middleware/rateLimiter')

const app = express();

app.use(express.json());

app.post('/clients', (req,res) => {
    console.log(JSON.stringify(req.body));
    try{
        const {clientId, limitPerMinute} = req.body;
        rateLimiterService.registerClient(clientId, limitPerMinute);
        res.status(201).json({message: "Client Regitered"});
    }catch{
        res.status(500).json({message: "Internal server error"});
    }
})

app.get('/allow/:clientId', rateLimiterMiddleWare, (req, res) => {
    res.status(200).json({allowed: true});
})

// This code was for testing purpose only. 
// app.get('/', (req, res) => {
//     console.log("App running on port 3000");
//     res.status(200).json({message: "App running on port 3000"});
// });

app.listen(3000, () => console.log("App running on port 3000")); // this could be set in .env