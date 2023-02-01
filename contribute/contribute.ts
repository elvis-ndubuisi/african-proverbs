import data from "./data.json";
import { buildDiv, buildInput, buildLabel } from "../src/utils/buildElements";
import theme from "../src/theme";
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

contributeForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  // Activate form state feedback
  submitProverbButton!.innerText = "Submitting.....";
  submitProverbButton.disabled = true;
  submitProverbButton.firstElementChild?.classList.replace("hidden", "inline");
  // Build data from input values
  let translations: object = {};
  let name = contributeForm.elements["name"].value;
  let proverb = contributeForm.elements["proverb"].value;
  let interpretation = contributeForm.elements["interpretation"].value;
  let country = contributeForm.elements["country"].value;
  let twitterhandle = contributeForm.elements["twitterhandle"].value;
  let acceptTweet = contributeForm.elements["accept"].checked;

  if (contributeForm.elements["language"]) {
    if (
      !contributeForm.elements["language"].length &&
      contributeForm.elements["language"].value
    ) {
      translations[contributeForm.elements["language"].value] =
        contributeForm.elements["dialect"].value;
    } else if (contributeForm.elements["language"].length > 1) {
      for (
        let index = 0;
        index < contributeForm.elements["language"].length;
        index++
      ) {
        const element = contributeForm.elements["language"][index];
        if (element.value) {
          translations[element.value] =
            contributeForm.elements["dialect"][index].value;
        }
      }
    }
  }
  const data = JSON.stringify({
    name,
    proverb,
    interpretation,
    country,
    twitterhandle,
    translations,
    "accept-tweet": acceptTweet,
  });

  // Send to API

  // Form state end
  contributeForm.reset();
  submitProverbButton!.innerText = "Contribute";
  submitProverbButton.disabled = false;
  submitProverbButton.firstElementChild?.classList.replace("inline", "hidden");
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
  // Wrapper divs for lang and dialect input sections
  let langWrapper = buildDiv("relative z-0 group max-w-sm");
  let dialectWrapper = buildDiv("relative z-0 group flex-1");

  // Build inputs with its class and attributes
  let langInput = buildInput(
    "text",
    "language",
    "language",
    data.langInputClass
  );
  langInput.placeholder = " ";
  let dialectInput = buildInput(
    "text",
    "dialect",
    "dialect",
    data.dialectInputClass
  );
  dialectInput.placeholder = " "; /* Required for animation */
  let langLabel = buildLabel("language", data.langLabelClass);
  langLabel.innerText = "Language"; /* Required for animation */
  let dialectLabel = buildLabel("dialect", data.dialectLabelClass);
  dialectLabel.innerText = "Dialect";

  // Append inputs and labels to its parent.
  langWrapper.appendChild(langInput);
  langWrapper.appendChild(langLabel);

  dialectWrapper.append(dialectInput);
  dialectWrapper.append(dialectLabel);

  // Append flexed divs to parentNode.
  parent.appendChild(langWrapper);
  parent.appendChild(dialectWrapper);

  return parent;
}
