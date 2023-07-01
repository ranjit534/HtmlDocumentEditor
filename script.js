const fontFamilySelect = document.getElementById("font-family");
const fontSizeSelect = document.getElementById("font-size");
const documentEditor = document.getElementById("document");

const leftJustifyButton = document.getElementById("left-justify");
const rightJustifyButton = document.getElementById("right-justify");
const saveFileButton = document.getElementById("save-file");
const openFileButton = document.getElementById("open-file");
const fileInput = document.getElementById("file-input");
const statsButton = document.getElementById("stats");
const formatButton = document.getElementById("format-button");
const formatSelect = document.getElementById("format-select");
const imageInput = document.getElementById("image-input");

fontFamilySelect.addEventListener("change", (event) => {
  documentEditor.style.fontFamily = event.target.value;
});

fontSizeSelect.addEventListener("change", (event) => {
  documentEditor.style.fontSize = `${event.target.value}px`;
});

leftJustifyButton.addEventListener("click", () => {
  documentEditor.style.textAlign = "left";
});

rightJustifyButton.addEventListener("click", () => {
  documentEditor.style.textAlign = "right";
});

openFileButton.addEventListener("click", () => {
  fileInput.click();
});

fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.readAsText(file);
  reader.onload = () => {
    documentEditor.innerHTML = reader.result;
  };
});

saveFileButton.addEventListener("click", () => {
  const content = documentEditor.innerHTML;
  const fileName = prompt("Enter a file name:", "document.html");
  if (fileName !== null) {
    const file = new Blob([content], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(a.href);
  }
});

statsButton.addEventListener("click", () => {
  const content = documentEditor.innerText;
  const charCount = content.length;
  const wordCount = content.split(/\s+/).length;
  const lineCount = content.split("\n").length;
  const paraCount = content.split("\n\n").length;
  if (charCount == 0) {
    alert(`Characters: 0 \nWords: 0 \nLines: 0 \nParagraphs: 0`);
  } else {
    alert(
      `Characters: ${charCount}\nWords: ${wordCount}\nLines: ${lineCount}\nParagraphs: ${paraCount}`
    );
  }
});

formatButton.addEventListener("click", () => {
  const maxWidth = prompt(
    "Enter the maximum number of characters per line between 1-132:"
  );
  if (maxWidth !== null) {
    documentEditor.style.maxWidth = `${maxWidth}ch`;
  }
});

formatSelect.addEventListener("change", (event) => {
  const format = event.target.value;
  switch (format) {
    case "bold":
      document.execCommand("bold");
      break;
    case "italic":
      document.execCommand("italic");
      break;
    case "sup":
      document.execCommand("superscript");
      break;
    case "sub":
      document.execCommand("subscript");
      break;
    default:
      break;
  }
});

imageInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    const img = document.createElement("img");
    img.src = reader.result;
    documentEditor.appendChild(img);
  };
});
