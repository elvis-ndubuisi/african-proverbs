import theme from "../src/theme";
import clipboard from "../src/utils/clipboard";

declare const gtag: Function;

theme();

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
  gtag("event", "Tested playground", {
    time: Date.now(),
  });
  play.classList.replace("grid", "hidden");
  document.getElementById("fetch-status")?.classList.remove("hidden");
  const [err, payload] = await usePlay(endpoint);
  if (err) {
    response!.innerHTML =
      `<pre class="language-json" tabindex="0"><code class="language-json"><span class="token punctuation">{</span>
  <span class="token property">"status"</span><span class="token operator">:</span> <span class="token string">"The alien took over :alien:"</span><span class="token punctuation">,</span>
  <span class="token property">"Error"</span><span class="token operator">:</span> <span class="token string">"start by pressing the play button"</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre>`.trim();
  } else if (payload) {
    response!.innerHTML =
      `<pre class="language-json" tabindex="0"><code class="language-json"><span class="token punctuation">{</span>
  <span class="token property">"proverb"</span><span class="token operator">:</span> <span class="token string">"${payload?.proverb}"</span><span class="token punctuation">,</span>
  <span class="token property">"interpretation"</span><span class="token operator">:</span> <span class="token string">"${payload?.interpretation}"</span><span class="token punctuation">,</span>
  <span class="token property">"native"</span><span class="token operator">:</span> <span class="token string">"${payload?.native}"</span>,
  <span class="token property">"translation: ${payload?.translations[0]?.dialect}"</span><span class="token operator">:</span> <span class="token string">"${payload?.translations[0]?.proverb}"</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre>`.trim();
  }
  play.classList.replace("hidden", "grid");
  document.getElementById("fetch-status")?.classList.add("hidden");
});

// Handle copy
copy?.addEventListener("click", () => {
  gtag("event", "copied API", {
    time: Date.now(),
  });
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
): Promise<[error: string | {} | undefined, payload: any | undefined]> {
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
