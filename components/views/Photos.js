import html from "html-literal";

export default () => html`
  <main class="indexBody">
    <div id="photoCard">
      <h1>Photos</h1>
      <form id="photoForm">
        <input name="pic" type="file" />

        <button>Add Image</button>
      </form>
    </div>
  </main>
`;
