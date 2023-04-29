export function buildInput(
  type: string,
  name: string,
  id: string,
  classlist: string
): HTMLInputElement {
  let input = document.createElement("input");
  input.setAttribute("type", type);
  input.setAttribute("name", name);
  input.setAttribute("id", id);
  input.setAttribute("class", classlist);

  return input;
}

export function buildLabel(
  htmlFor: string,
  classlist: string
): HTMLLabelElement {
  let label = document.createElement("label");
  label.setAttribute("for", htmlFor);
  label.setAttribute("class", classlist);
  return label;
}

export function buildDiv(classlist?: string, id?: string): HTMLDivElement {
  let div = document.createElement("div");
  if (classlist) div.setAttribute("class", classlist);
  if (id) div.setAttribute("id", id);

  return div;
}
