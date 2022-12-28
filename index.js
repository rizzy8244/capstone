/* eslint-disable no-inner-declarations */
import { Header, Nav, Main, Footer } from "./components";
import * as store from "./store";
import Navigo from "navigo";
import { capitalize } from "lodash";
import axios from "axios";
import dotenv from "dotenv";
import serpApi from "google-search-results-nodejs";

dotenv.config();

const router = new Navigo("/");

function render(state = store.Home) {
  document.querySelector("#root").innerHTML = `
  ${Header(state)}
  ${Nav(store.Links)}
  ${Main(state)}
  ${Footer()}
  `;
  // afterRender(state);
  router.updatePageLinks();
}
//Event Function
// function afterRender(state) {
//   if (state.view === "Home") {
//     const cityForm = document.getElementById("city-form");
//     const getCity = document.querySelector("#city");

//     cityForm.addEventListener("submit", function(e) {
//       e.preventDefault();
//       localStorage.setItem("userInput", getCity.value);
//       store.Events.city = getCity.value;
//     });

//     const getIt = localStorage.getItem("userInput");

//     console.log(getCity.value);
//     axios
//       .get(
//         `https://api.openweathermap.org/data/2.5/weather?q=${getIt}&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}`
//       )
//       .then(response => {
//         // console.log(response);
//         store.Events.weather = response.data;
//         console.log(store.Events.weather);
//         console.log(store.Events.weather.sys.country);
//         console.log(store.Events.main);
//         done();
//       })
//       .catch(err => console.log(err));
//   }
//   if (state.view === "Events") {
//     axios
//       .get(
//         `https://serpapi.com/search.json?engine=google_events&q=Events+in+Austin&hl=en&gl=us`
//       )
//       .then(response => {
//         // console.log(response);
//         // store.Events.weather = response.data;
//         // console.log(store.Events.weather);
//         // console.log(store.Events.weather.sys.country);
//         // console.log(store.Events.main);
//         // done();
//       })
//       .catch(err => console.log(err));
//   }
// }
//Event Function Above
router.hooks({
  before: (done, params) => {
    const view =
      params && params.data && params.data.view
        ? capitalize(params.data.view)
        : "Home"; // Add a switch case statement to handle multiple routes
    switch (view) {
      case "Home":
        // eslint-disable-next-line no-case-declarations
        function getWeather() {
          let latitude = "";
          let longitude = "";
          navigator.geolocation.getCurrentPosition(position => {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;

            axios
              .get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}&units=imperial`
              )
              .then(function(response) {
                // handle success

                let weatherInfo = response.data;
                console.log(weatherInfo);
                console.log(weatherInfo.main.temp);
                console.log(weatherInfo.weather[0].icon);
                store.Home.weather.icon = weatherInfo.weather[0].icon;
                // console.log(weatherInfo.sys.country);
                document.querySelector("#openTemp").innerText =
                  weatherInfo.main.temp;

                done();
              })
              .catch(function(error) {
                // handle error
                console.log(error);
                done();
              })
              .finally(function() {
                // always executed
              });
          });
        }
        getWeather();
        break;
      case "Events":
        axios
          .get("http://localhost:4040/serpApi")
          .then(function(response) {
            // handle success
            console.log(response.data);
            let localEventInfo = {};
            localEventInfo = response.data;
            console.log(localEventInfo);
            done();
          })
          .catch(function(error) {
            // handle error
            console.log(error);
            done();
          })
          .finally(function() {
            // always executed
          });

        break;
      default:
    }
  }
});

router
  .on({
    "/": () => render(),
    ":view": params => {
      let view = capitalize(params.data.view);
      render(store[view]);
    }
  })
  .resolve();
