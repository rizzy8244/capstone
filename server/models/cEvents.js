const mongoose = require("mongoose");

const cEventSchema = new mongoose.Schema({
  thumbnail: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  }
});

const newEvent = mongoose.model("newEvent", cEventSchema);

module.exports = newEvent;
