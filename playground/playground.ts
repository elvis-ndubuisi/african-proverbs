import theme from "../src/theme";
import clipboard from "../src/utils/clipboard";

theme();
/**
 * TODO: change request method each time endpoint changes.
 * TODO: fix request to backend.
 */

let requestMethod = document.getElementById("request-method");
let endpointOptions = document.getElementById(
  "endpoint-options"
) as HTMLSelectElement;
let play = document.getElementById("play") as HTMLButtonElement;
let copy = document.getElementById("copy-endpoint");
let response = document.getElementById("response");

let endpoint: string = "";

window.addEventListener("DOMContentLoaded", () => {
  response!.innerHTML = `
          <pre><code class="language-json">{
  "status": "no request has been performed yet",
  "howto": "start by pressing the play button",
  "view": "api response will display here"
}</code></pre>
  `;

  endpoint = endpointOptions.value;
});

endpointOptions?.addEventListener("change", (event) => {
  endpoint = endpointOptions.value;
  requestMethod!.innerText = "Get".toUpperCase();
});

play.addEventListener("click", async () => {
  await fetch(endpoint, {})
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      response!.innerHTML = `
          <pre><code class="language-json">{
  "status": "no request has been performed yet",
  "howto": "start by pressing the play button",
  "view": "api response will display here"
}</code></pre>
  `;
    });
});

copy?.addEventListener("click", () => {
  clipboard(endpointOptions.value);
  copy!.innerText = "Copied";
  let timer = setTimeout(() => {
    copy!.innerText = "Copy";
  }, 1000);
});
