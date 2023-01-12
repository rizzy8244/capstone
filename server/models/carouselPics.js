const mongoose = require("mongoose");

const cPicSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true
  },
  mimetype: {
    type: String,
    required: true
  }
});

const newImage = mongoose.model("newPic", cPicSchema);

module.exports = newImage;
