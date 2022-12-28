const { Router } = require("express");
const router = Router();
const SerpApi = require("google-search-results-nodejs");

router.get("/serpApi", (request, response) => {
  const search = new SerpApi.GoogleSearch(process.env.SERPAPI);

  const params = {
    engine: "google_events",
    q: "Events in Austin",
    hl: "en",
    gl: "us"
  };

  const callback = function(data) {
    console.log(data["events_results"]);
  };

  // Show result as JSON
  search.json(params, callback);
});

module.exports = router;
