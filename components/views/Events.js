import html from "html-literal";

const makeRow = localEvent => html`
  <tr>
    <td>
      <img src="${localEvent.thumbnail}" />
    </td>
    <td>${localEvent.title}</td>

    <td>${localEvent.date.when}</td>
    <td><a href="${localEvent.link}" target="_blank">Link</a></td>
    <td>
      <button
        data-thumbnail="${localEvent.thumbnail}"
        data-title="${localEvent.title}"
        data-date="${localEvent.date.when}"
        data-link="${localEvent.link}"
        class="favoriteButton"
      >
        Favorite
      </button>
    </td>
  </tr>
`;

export default state => html`
  <div id="events">
    <div id="googleEvents">
      <h1>Local Events</h1>
      <table>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>

            <th>Date</th>
            <th>Link</th>
            <th>Favorite</th>
          </tr>
        </thead>
        <tbody>
          ${state.localEventInfo.map(makeRow)}
        </tbody>
      </table>
    </div>
  </div>
`;
