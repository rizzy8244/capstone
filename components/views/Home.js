import html from "html-literal";
import profileImage from "/assets/RenardPP-modified.png";

export default state => html`
  <main class="indexBody">
    <div class="card">
      <img
        src="${profileImage}"
        alt="Renard's Profile Picture!"
        class="profilePic"
      />
      <h1>Renard Perminter</h1>
      <p class="title">Dad</p>
      <p>Savvy Coders</p>
      <a href="#"><i class="fa fa-twitter"></i></a>
      <a href="#"><i class="fa fa-linkedin"></i></a>
      <a href="#"><i class="fa fa-facebook"></i></a>
      <p><button id="pCardButton">Message</button></p>
    </div>
    <div id="weatherCard">
      <h1 id="locationName">${state.weather.name}</h1>
      <h1 id="openTemp">${state.weather.temperature}</h1>
      <img alt="icon"
      src=https://openweathermap.org/img/wn/${state.weather.icon}@2x.png
      width="120" height="100" />
    </div>
    <div class="carousel">
      <img
        src="http://localhost:4040/carousel/${state.imageInfo[0].filename}"
        data-index="0"
        id="carousel-image"
      />
      <button id="carousel-previous">&lt;</button>
      <button id="carousel-next">&gt;</button>
    </div>
  </main>
`;
