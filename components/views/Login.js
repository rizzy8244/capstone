import html from "html-literal";

export default () => html`<div class="mainBody">
<img id="landingpage" src="https://images.pexels.com/photos/3184419/pexels-photo-3184419.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500">
<h1 id="engage">ENGAGE</h1> <br> <br>
<form id="form" action="">
  <h2>Login</h2>
  <label for="login"></label>
  <input type="text" placeholder="username" required><br>
  <label for="password"></label><br>
  <input type="text" placeholder="password"><br> <br>
  <input type="submit"><br> <br>
</form>
</div>`;
