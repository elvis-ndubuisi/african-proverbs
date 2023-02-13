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
let filterField = document.getElementById("filter-field");

let endpoint: string = "";
let filterValue: string = "";

window.addEventListener("DOMContentLoaded", () => {
  response!.innerHTML = `
          <pre><code class="language-json">{
  "status": "no request has been performed yet",
  "howto": "start by pressing the play button",
  "view": "api response will display here"
}</code></pre>
  `;

  // Initialize default endpoint value.
  endpoint = endpointOptions.value;
});

// Handle select toggling
endpointOptions?.addEventListener("change", (event) => {
  endpoint = endpointOptions.value;
  if (endpointOptions.value.includes("filter?filter")) {
    requestMethod!.innerHTML = "Post".toUpperCase();
    filterField?.classList.replace("hidden", "block");
  } else {
    requestMethod!.innerText = "Get".toUpperCase();
    filterField?.classList.replace("block", "hidden");
  }
});
// Handle play button
play.addEventListener("click", async () => {
  play.classList.replace("grid", "hidden");
  document.getElementById("fetch-status")?.classList.remove("hidden");
  await fetch(endpoint)
    .then((response) => response.json())
    .then((data) => {
      response!.innerHTML = `
          <pre><code class="language-json">{
  "status": "no request has been performed yet",
  "howto": "start by pressing the play button",
  "view": "api response will display here"
}</code></pre>
  `;
      play.classList.replace("hidden", "grid");
      document.getElementById("fetch-status")?.classList.add("hidden");
    })
    .catch((err) => {
      response!.innerHTML = `
          <pre><code class="language-json">{
  "status": "no request has been performed yet",
  "howto": "start by pressing the play button",
  "view": "api response will display here"
}</code></pre>
  `;
      play.classList.replace("hidden", "grid");
      document.getElementById("fetch-status")?.classList.add("hidden");
    });
});
// Handle copy
copy?.addEventListener("click", () => {
  clipboard(endpointOptions.value);
  copy!.innerText = "Copied";
  let timer = setTimeout(() => {
    copy!.innerText = "Copy";
  }, 1000);
});
// Handle filter value update
filterField?.addEventListener("change", (event: any) => {
  filterValue = event.target?.value;
});
