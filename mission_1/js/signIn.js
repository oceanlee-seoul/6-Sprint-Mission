import { showError, hideError, showPwdToggle } from "./utils.js";

const $emailInput = document.getElementById("emailInput");
const $passwordInput = document.getElementById("passwordInput");
const $emailError = document.getElementById("emailError");
const $pwdError = document.getElementById("pwdError");
const $loginButton = document.getElementById("loginButton");
const $showPasswordBtn = document.getElementById("showPasswordBtn");

$showPasswordBtn.addEventListener("click", ({ target }) => {
  showPwdToggle(target, $passwordInput);
});

const inputValidObj = {
  email: false,
  password: false,
};

const checkInputValid = () => {
  const { email, password } = inputValidObj;
  $loginButton.classList.toggle("enable", email && password);
  $loginButton.classList.toggle("disable", !email || !password);
};

$emailInput.addEventListener("focusout", ({ target }) => {
  if (!target.value) {
    inputValidObj.email = showError(
      $emailError,
      $emailInput,
      "이메일을 입력해주세요."
    );
  } else if (!target.validity.valid) {
    inputValidObj.email = showError(
      $emailError,
      $emailInput,
      "잘못된 이메일 형식입니다."
    );
  } else {
    inputValidObj.email = hideError($emailError, $emailInput);
  }
  checkInputValid();
});

$passwordInput.addEventListener("focusout", ({ target }) => {
  if (!target.value) {
    inputValidObj.password = showError(
      $pwdError,
      $passwordInput,
      "비밀번호를 입력해주세요."
    );
  } else if (target.value.length < 8) {
    inputValidObj.password = showError(
      $pwdError,
      $passwordInput,
      "비밀번호를 8자 이상 입력해주세요."
    );
  } else {
    inputValidObj.password = hideError($pwdError, $passwordInput);
  }
  checkInputValid();
});
