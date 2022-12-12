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
  </main>
`;
