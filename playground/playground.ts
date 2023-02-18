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
  // Load pre code.
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

// Handle select options toggling
endpointOptions?.addEventListener("change", (event) => {
  endpoint = endpointOptions.value;
  if (endpointOptions.value.includes("filter?filter")) {
    filterField?.classList.replace("hidden", "block");
    endpoint = endpoint + filterValue;
  } else {
    requestMethod!.innerText = "Get".toUpperCase();
    filterField?.classList.replace("block", "hidden");
    endpoint = endpoint;
  }
});

// Handle play button
play.addEventListener("click", async () => {
  play.classList.replace("grid", "hidden");
  document.getElementById("fetch-status")?.classList.remove("hidden");
  console.log(endpoint);
  const [err, payload] = await usePlay(endpoint);
  if (err) {
    console.log("error");
    console.log(err);
  } else if (payload) {
    console.log("payload");
    console.log(payload);
  }
  play.classList.replace("hidden", "grid");
  document.getElementById("fetch-status")?.classList.add("hidden");

  //   await fetch(endpoint)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       response!.innerHTML = `
  //           <pre><code class="language-json">{
  //   "status": "no request has been performed yet",
  //   "howto": "start by pressing the play button",
  //   "view": "api response will display here"
  // }</code></pre>
  //   `;
  //       play.classList.replace("hidden", "grid");
  //       document.getElementById("fetch-status")?.classList.add("hidden");
  //     })
  //     .catch((err) => {
  //       response!.innerHTML = `
  //           <pre><code class="language-json">{
  //   "status": "no request has been performed yet",
  //   "howto": "start by pressing the play button",
  //   "view": "api response will display here"
  // }</code></pre>
  //   `;
  //       play.classList.replace("hidden", "grid");
  //       document.getElementById("fetch-status")?.classList.add("hidden");
  //     });
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

/**
 * Returns tuple which indicates field or success payload.
 * Error == undefined if no error occurs.
 * Payload == undefined if error occurs.
 * @param endpoint Request http endpoint
 * @returns [error, payload].
 */
async function usePlay(
  endpoint: string
): Promise<[error: string | {} | undefined, payload: {} | undefined]> {
  let error: any, payload: any;

  try {
    const rawResponse = await fetch(endpoint);
    if (rawResponse.ok) {
      error = undefined;
      payload = await rawResponse.json();
    } else {
      error = await rawResponse.json();
      payload = undefined;
    }
  } catch (err) {
    error = err?.message;
    payload = undefined;
  }

  return [error, payload];
}
