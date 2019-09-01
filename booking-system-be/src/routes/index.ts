const app = module.exports = require('express')()

export module routes {
    app.use("/users", require('./user.ts'))
    app.use("/bookings", require('./booking.ts'))
}

