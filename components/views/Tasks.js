import html from "html-literal";

const makeRow = localEvent => html`
  <tr>
    <td>
      <img src="${localEvent.thumbnail}" />
    </td>
    <td>${localEvent.title}</td>

    <td>${localEvent.date}</td>
    <td><a href="${localEvent.link}" target="_blank">Link</a></td>
  </tr>
`;

export default state => html`
  <div id="events">
    <div id="googleEvents">
      <h1>Favorite Events</h1>
      <table>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>

            <th>Date</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          ${state.localEventInfo.map(makeRow)}
        </tbody>
      </table>
    </div>
  </div>
`;
