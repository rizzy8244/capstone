import html from "html-literal";
import profileImage from "/assets/RenardPP-modified.png"

export default () => html`
  <main>
    <div class="indexBody">
      <img
      class="profilePic"
      src="${profileImage}"
      alt="Renard's Profile Picture!"
    />
    </div>
  </main>
`;
