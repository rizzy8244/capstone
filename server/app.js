// 'Import' the Express module instead of http
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const SerpApi = require("google-search-results-nodejs");
const events = require("./routers/commitEvents");
const axios = require("axios");
const {
  Client: GoogleMapsClient
} = require("@googlemaps/google-maps-services-js");
const eventModel = require("./models/cEvents");

// const serpAPI = require("./routers/SerpApi");

dotenv.config();

const PORT = process.env.PORT || 4040; // we use || to provide a default value
// Initialize the Express application
const app = express();
const googleMapsClient = new GoogleMapsClient({});

mongoose.connect(process.env.MONGODB);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error:"));
db.once(
  "open",
  console.log.bind(console, "Successfully opened connection to Mongo!")
);

// CORS Middleware
const cors = (req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Accept,Authorization,Origin"
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
};

const logging = (request, response, next) => {
  console.log(`${request.method} ${request.url} ${Date.now()}`);
  next();
};

app.use(cors);
app.use(express.json());
app.use(logging);

// Handle the request with HTTP GET method from http://localhost:4040/status
app.get("/status", (request, response) => {
  response.status(200).json({ message: "Service healthy" });
});

app.get("/users/:id", (request, response) => {
  // express adds a "params" Object to requests
  const id = request.params.id;
  // handle GET request for post with an id of "id"
  response.send(JSON.stringify({ user_id: id }));
});

app.post("/add", (request, response) => {
  const num1 = request.body.numberOne;
  const num2 = request.body.numberTwo;
  const responseBody = {
    sum: num1 + num2
  };
  response.json(responseBody);
});
app.use("/commitEvents", events);

// app.use("/serpApi", serpAPI);
// Tell the Express app to start listening
// Let the humans know I am running and listening on 4040
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

const search = new SerpApi.GoogleSearch(process.env.SERPAPI);
app.get("/api/events", (request, response) => {
  const latitude = request.query.latitude;
  const longitude = request.query.longitude;

  googleMapsClient
    .reverseGeocode({
      params: {
        latlng: { lat: latitude, lng: longitude },
        key: process.env.GOOGLE_MAPS_API_KEY
      }
    })
    .then(function(geocodingResponse) {
      console.log(geocodingResponse.data.results[0].address_components);
      const addressComponents =
        geocodingResponse.data.results[0].address_components;
      const localityComponent = addressComponents.find(component => {
        return component.types.includes("locality");
      });
      const params = {
        engine: "google_events",
        q: `Events in ${localityComponent.long_name}`,
        hl: "en",
        gl: "us"
      };

      const callback = function(data) {
        response.json(data.events_results);
      };

      // Show result as JSON
      search.json(params, callback);
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    })
    .finally(function() {
      // always executed
    });
});

app.get("/api/weather", (request, response) => {
  // const { latitude, longitude } = request.query;
  const latitude = request.query.latitude;
  const longitude = request.query.longitude;
  //request is an object that represents the properties of an incoming request from the client
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}&units=imperial`
    )

    .then(function(openWeatherResponse) {
      response.json(openWeatherResponse.data);
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    })
    .finally(function() {
      // always executed
    });
});

app.post("/api/favorite", (request, response) => {
  eventModel
    .create(request.body)
    .then(newEvent => {
      response.json(newEvent);
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    })
    .finally(function() {
      // always executed
    });
});
