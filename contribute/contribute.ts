import data from "./data.json";
import { buildDiv, buildInput, buildLabel } from "../src/utils/buildElements";
import theme from "../src/theme";

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

// {
//   "name": "name",
//   "country": "country",
//   "proverb": "provdsferbdsf23",
//   "interpretation": "interpretation",
//   "translations": [{"dialect":"teso", "proverb":"teso proverb"}, {"dialect": "teso 2", "proverb": "teso2"}],
//   "twitterHandle":"lloosdaif"
// }

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
const API = "http://localhost:4000/api/submit";

contributeForm?.addEventListener("submit", async (event) => {
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

  // TODO: handle max translations of 4

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

  // Send to API
});

addDialectButton?.addEventListener("click", function () {
  if (insertCount !== 5) {
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
