/* eslint-disable no-inner-declarations */
import { Header, Nav, Main, Footer } from "./components";
import * as store from "./store";
import Navigo from "navigo";
import { capitalize } from "lodash";
import axios from "axios";
import dotenv from "dotenv";
// import serpApi from "google-search-results-nodejs";

dotenv.config();

const router = new Navigo("/");

function render(state = store.Home) {
  document.querySelector("#root").innerHTML = `
  ${Header(state)}
  ${Nav(store.Links)}
  ${Main(state)}
  ${Footer()}
  `;
  afterRender(state);
  router.updatePageLinks();
}

function afterRender(state) {
  // document.querySelector(".fa-bars").addEventListener("click", () => {
  //   document.querySelector("nav > ul").classList.toggle("hidden--mobile");
  // });

  if (state.view === "Events") {
    document.querySelectorAll(".favoriteButton").forEach(favoriteButton => {
      favoriteButton.addEventListener("click", () => {
        axios
          .post("http://localhost:4040/api/favorite", {
            ...favoriteButton.dataset
          })
          .then(function(response) {
            alert("Event Successfully Added ");
          })
          .catch(function(error) {
            // handle error
            console.log(error);
          })
          .finally(function() {
            // always executed
          });
      });
    });
  }
  if (state.view === "Photos") {
    document.querySelector("#photoForm").addEventListener("submit", e => {
      e.preventDefault();
      const formData = new FormData(e.target);
      axios.post("http://localhost:4040/api/carousel", formData);
    });
  }
}
function getWeather() {
  return new Promise((resolve, reject) => {
    let latitude = "";
    let longitude = "";
    navigator.geolocation.getCurrentPosition(position => {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      axios
        .get(
          `http://localhost:4040/api/weather?latitude=${latitude}&longitude=${longitude}`
        )
        .then(function(response) {
          // handle success

          let weatherInfo = response.data;
          console.log(weatherInfo);
          console.log(weatherInfo.main.temp);
          console.log(weatherInfo.weather[0].icon);
          console.log(weatherInfo.name);
          store.Home.weather.temperature = weatherInfo.main.temp;
          store.Home.weather.name = weatherInfo.name;
          store.Home.weather.icon = weatherInfo.weather[0].icon;
          // console.log(weatherInfo.sys.country);
          // document.querySelector("#openTemp").innerHTML =
          //   weatherInfo.main.temp;
          // document.querySelector("#locationName").innerHTML =
          //   weatherInfo.name;
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        })
        .finally(function() {
          // always executed
          resolve();
        });
    });
  });
}
function getCarouselImages() {
  return axios
    .get("http://localhost:4040/api/carousel")
    .then(function(response) {
      // handle success
      // console.log(response.data);

      store.Home.imageInfo = response.data;
      console.log(response.data);
    });
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
        getWeather()
          .then(getCarouselImages)
          .catch(error => {
            console.error(error);
          })
          .finally(done);

        break;
      case "Events":
        navigator.geolocation.getCurrentPosition(position => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          axios
            .get(
              `http://localhost:4040/api/events?latitude=${latitude}&longitude=${longitude}`
            )
            .then(function(response) {
              // handle success
              // console.log(response.data);

              store.Events.localEventInfo = response.data;
              console.log("API DATA", response.data);
              console.log(response.data[0].date);

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
        break;
      case "Tasks":
        console.log("hi");
        axios
          .get("http://localhost:4040/api/favorite")
          .then(function(response) {
            // handle success
            console.log(response.data);

            store.Tasks.localEventInfo = response.data;

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
        done();
    }
  }
});

router
  .on({
    "/": () => render(),
    ":view": params => {
      let view = capitalize(params.data.view);
      console.log(view);
      render(store[view]);
    }
  })
  .resolve();
