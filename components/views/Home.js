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
      <h1 id="openTemp">Temperature</h1>
      <img alt="icon"
      src={http://openweathermap.org/img/w/${state.weather.icon}.png}
      width="120" height="100" />
    </div>
  </main>
`;
