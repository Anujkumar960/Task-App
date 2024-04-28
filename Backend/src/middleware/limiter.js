const rateLimit = require("express-rate-limit");

// Define rate limiter middleware
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 100, // Limit each IP to 1 request per 6 windowMs
  message: "Too many requests from this IP, please try again later after 6 second."
});

module.exports={limiter}