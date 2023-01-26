import copyToClipboard from "./utils/clipboard";

/* DOM Elements */
const apiHeader = document.querySelectorAll("#api-header");
/**
 * Listen for events and copy to clipboard
 * * ID : api-clipboard ==> clipboard svg icons
 * * ID : api-header ==> parent eleent
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
      }, 3000);
    }
  });
});
