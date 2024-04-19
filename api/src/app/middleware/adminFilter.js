const User = require("../models/User");

module.exports = async (req, res, next) => {
    req.isAdminFilter = true
    next()
}