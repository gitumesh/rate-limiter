const ratelimiterService = require("../services/ratelimiter.service")

const rateLimiterMiddleWare = (req, res, next) => {
    const {clientId} = req.params;

    if (!clientId){
        return res.status(400).json({
            error: "clientId is required."
        })
    }

    const allowed = ratelimiterService.isRateLimited(clientId)

    if (allowed){
        next();
    } else{
        res.status(429).json({
            allowed: false,
            message: "Too many request"
        })
    }

}
module.exports = rateLimiterMiddleWare;
