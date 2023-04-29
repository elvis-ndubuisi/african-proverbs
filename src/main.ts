import copyToClipboard from "./utils/clipboard";
import theme from "./theme";
// Init
theme();

const apiHeader = document.querySelectorAll("#api-header");

/**
 * Listen for events and copy to clipboard.
 * A delay of 2 seconds is initiated before next click event will occur
 */
apiHeader.forEach((header) => {
  header.addEventListener("click", function (event: any) {
    if (
      event.target?.id === "api-clipboard" ||
      event.target?.firstElementChild.classList.id === "api-clipboard"
    ) {
      // @ts-ignore
      copyToClipboard(header.children[1].lastElementChild.innerText);
      header.children[2].firstElementChild?.classList.remove("hidden");
      setTimeout(() => {
        header.children[2].firstElementChild?.classList.add("hidden");
      }, 2000);
    }
  });
});
