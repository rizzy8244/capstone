import { Header, Nav, Main, Footer } from "./components";
import * as store from "./store";
import Navigo from "navigo";
import { capitalize } from "lodash";
import axios from "axios";
import dotenv from "dotenv";

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
//Event Function
function afterRender(state) {
  if (state.view === "Events") {
    const cityForm = document.getElementById("city-form");
    const getCity = document.querySelector("#city");

    cityForm.addEventListener("submit", function(e) {
      e.preventDefault();
      localStorage.setItem("userInput", getCity.value);
      store.Events.city = getCity.value;
    });

    const getIt = localStorage.getItem("userInput");

    console.log(getIt);
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=st%20louis&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}`
      )
      .then(response => {
        // console.log(response);
        store.Events.weather = response.data;
        console.log(store.Events.weather);
        done();
      })
      .catch(err => console.log(err));
  }
}
//Event Function Above
router.hooks({
  before: (done, params) => {
    const view =
      params && params.data && params.data.view
        ? capitalize(params.data.view)
        : "Home"; // Add a switch case statement to handle multiple routes
    switch (view) {
      // case "Events":
      //   break;
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
      render(store[view]);
    }
  })
  .resolve();
