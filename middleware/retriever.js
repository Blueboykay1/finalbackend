const User = require("../Models/userModel");
const Flight = require("../Models/flightModel");

async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);

    if (!user) res.status(404).json({ message: "Could not find user" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.user = user;
  next();
}

async function getFlight(req, res, next) {
  let flight;
  try {
    flight = await Flight.findById(req.params.id);
    if (!flight) res.status(404).json({ message: "Could not find flight" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.flight = flight;
  next();
}

module.exports = { getUser, getFlight };