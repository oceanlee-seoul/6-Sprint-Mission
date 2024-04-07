export const showError = ($msgElement, $targetInput, message) => {
  $msgElement.textContent = message;
  $msgElement.classList.add("show");
  $targetInput.classList.add("error");
  return false;
};

export const hideError = ($msgElement, $targetInput) => {
  $msgElement.classList.remove("show");
  $targetInput.classList.remove("error");
  return true;
};

export const showPwdToggle = (target, inputTag) => {
  if (target.classList.value === "show_password_disable") {
    target.src = "../assets/lens_show.png";
    target.classList.remove("show_password_disable");
    target.classList.add("show_password_enable");
    inputTag.type = "text";
  } else {
    target.src = "../assets/lens_x.png";
    target.classList.remove("show_password_enable");
    target.classList.add("show_password_disable");
    inputTag.type = "password";
  }
};
