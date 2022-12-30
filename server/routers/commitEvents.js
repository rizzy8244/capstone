const { Router } = require("express");
const newEvent = require("../models/cEvents");
const router = Router();

// Create record in MongoDB Atlas using Mongoose.js ORM
router.post("/", (request, response) => {
  const nEvent = new newEvent(request.body);
  nEvent.save((error, record) => {
    if (error) return response.status(500).json(error);
    return response.json(record);
  });
});

module.exports = router;
