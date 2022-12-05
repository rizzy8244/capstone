import html from "html-literal";
// import profileImage from "assets/RenardPP-modified.png"

export default links => html`
  <nav>
    <ul class="navBar">
      ${links
        .map(
          link =>
            `<li><a href="/${link.title}" title="${link.title}" data-navigo>${link.text}</a></li>`
        )
        .join("")}
    </ul>
  </nav>
`;
