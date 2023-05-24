import data from "./data.json";
import { buildDiv, buildInput, buildLabel } from "../src/utils/buildElements";
import theme from "../src/theme";

declare const gtag: Function;

type Data = {
  name: string;
  country: string;
  twitterHandle: string;
  proverb: string;
  native: string;
  interpretation: string;
  translations?: {
    dialect: string;
    proverb: string;
  }[];
  postOnTwitter?: boolean;
};

theme();

const submitProverbButton = document.getElementById(
  "submit-proverb"
) as HTMLButtonElement;
const contributeForm = document.getElementById(
  "contribute-form"
) as HTMLFormElement;
const addDialectButton = document.getElementById("add-dialect");
const dialectsDom = document.getElementById("dialects-dom");

var insertCount = 0;
const API = "https://https://africanproverbs.onrender.com/api/submit";
// const API = "http://localhost:4000/api/submit";

contributeForm?.addEventListener("submit", async (event) => {
  gtag("event", "submitted contribution", {
    time: Date.now(),
  });

  event.preventDefault();
  // Activate form state feedback
  submitProverbButton!.innerText = "Submitting.....";
  submitProverbButton.disabled = true;
  submitProverbButton.firstElementChild?.classList.replace("hidden", "inline");
  // Build data from input values
  let translations: Array<{ dialect: string; proverb: string }> = [];
  let name = contributeForm.elements["name"].value;
  let proverb = contributeForm.elements["proverb"].value;
  let interpretation = contributeForm.elements["interpretation"].value;
  let country = contributeForm.elements["country"].value;
  let twitterhandle = contributeForm.elements["twitterhandle"].value;
  let acceptTweet = contributeForm.elements["accept"].checked;

  if (contributeForm.elements["dialect"]) {
    // Add data object to array if single translation is present
    if (
      !contributeForm.elements["dialect"]?.length &&
      contributeForm.elements["dialect"].value
    ) {
      translations.push({
        dialect: contributeForm.elements["dialect"].value,
        proverb: contributeForm.elements["t_proverb"].value,
      });
      // translations[contributeForm.elements["language"].value] =
      //   contributeForm.elements["dialect"].value;
    } else if (contributeForm.elements["dialect"].length > 1) {
      // Push multiple data object to translatins array.
      for (
        let index = 0;
        index < contributeForm.elements["dialect"].length;
        index++
      ) {
        const element = contributeForm.elements["dialect"][index];
        if (
          element.value &&
          contributeForm.elements["t_proverb"][index].value
        ) {
          translations.push({
            dialect: element.value,
            proverb: contributeForm.elements["t_proverb"][index].value,
          });
        }
      }
    }
  }

  const data: Data = {
    name: name,
    country: country,
    native: "no native yet",
    proverb: proverb,
    postOnTwitter: acceptTweet,
    ...(twitterhandle && { twitterHandle: twitterhandle }),
    interpretation: interpretation,
    translations: translations,
  };

  // try {
  //   const resp = await fetch(
  //     "https://africanproverbs.onrender.com/api/submit",
  //     {
  //       method: "POST",
  //       body: JSON.stringify({ data: "somei" }),
  //     }
  //   );
  //   const response = await resp.json();
  //   console.log(response);
  // } catch (error) {
  //   console.log("error");
  //   console.log(error);
  // }
  // Send to API
  const [error, payload] = await useSubmitRequest(data);
  if (error) {
    console.log("Error");
    // console.log(error);
  } else {
    // display message.
    console.log("payload");
    // console.log(payload);
  }
  // Deactivate form state feedback
  submitProverbButton!.innerText = "Contribute";
  submitProverbButton.disabled = false;
  contributeForm.reset();
  submitProverbButton.firstElementChild?.classList.replace("inline", "hidden");
});

// Adds max of 4 fields for translations.
addDialectButton?.addEventListener("click", function () {
  if (insertCount !== 4) {
    dialectsDom?.insertBefore(createDialect(), addDialectButton);
    insertCount++;
  }
});

/**
 * Creates Dialect input fields and styles.
 * @returns HTMLElement
 */
function createDialect(): HTMLElement {
  let parent = buildDiv("flex items-center flex-wrap mb-3 gap-3 w-full");
  // Wrapper divs for dialect and proverb input sections
  let dialectWrapper = buildDiv("relative z-0 group max-w-sm");
  let proverbWrapper = buildDiv("relative z-0 group flex-1");

  // Build inputs with its class and attributes
  // @Params `buildInput(inputType, inputName, inputId, classlist)`
  let dialectInput = buildInput(
    "text",
    "dialect",
    "dialect",
    data.dialectInputClass
  );
  dialectInput.placeholder = " ";
  let proverbInput = buildInput(
    "text",
    "t_proverb",
    "t_proverb",
    data.dialectInputClass
  );
  proverbInput.placeholder = " "; /* Required for animation */
  let dialectLabel = buildLabel("dialect", data.dialectLabelClass);
  dialectLabel.innerText = "Dialect"; /* Required for animation */
  let proverbLabel = buildLabel("t_proverb", data.proverbLabelClass);
  proverbLabel.innerText = "Proverb";

  // Append inputs and labels to its parent.
  dialectWrapper.appendChild(dialectInput);
  dialectWrapper.appendChild(dialectLabel);

  proverbWrapper.append(proverbInput);
  proverbWrapper.append(proverbLabel);

  // Append flexed divs to parentNode.
  parent.appendChild(dialectWrapper);
  parent.appendChild(proverbWrapper);

  return parent;
}

/**
 * Handle submit proverb request states
 * @returns tuple `[error, payload]`.
 * Field with no data returns undefined.
 */
async function useSubmitRequest(
  data: Data
): Promise<[error: any, payload: {}]> {
  let err: any, payload: any;
  try {
    const rawResponse = await fetch(API, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": "SameSite=None",
      },
      body: JSON.stringify(data),
    });
    console.log(rawResponse);
    if (rawResponse.ok) {
      err = undefined;
      payload = await rawResponse.json();
    } else {
      payload = undefined;
      err = await rawResponse.json();
    }
  } catch (error) {
    err = err?.message;
    payload = undefined;
  }
  return [err, payload];
}
