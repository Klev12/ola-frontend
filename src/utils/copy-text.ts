const copyText = (textToCopy: string) => {
  // Create a temporary textarea element
  const textarea = document.createElement("textarea");
  textarea.value = textToCopy;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px"; // Move outside the screen to make it invisible

  document.body.appendChild(textarea);
  textarea.select();

  // Execute copy command
  document.execCommand("copy");

  // Clean up - remove the textarea from the DOM
  document.body.removeChild(textarea);
};

export default copyText;
