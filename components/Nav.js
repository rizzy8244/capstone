import html from "html-literal";
// import profileImage from "assets/RenardPP-modified.png"

export default links => html`
  <nav>

    <ul class="navBar">
    <div class="engage">ENGAGE LOGO</div>
      ${links
        .map(
          link =>
            `<li><a href="/${link.title}" title="${link.title}" data-navigo>${link.text}</a></li>`
        )
        .join("")}
      <div class="searchClass">
        <form action="#">
          <input type="search" class="search" required placeholder="Search" />
          <button type="submit" class="fa-solid fa-magnifying-glass"></button></button>
        </form>
      </div>

    </ul>
  </nav>
`;
