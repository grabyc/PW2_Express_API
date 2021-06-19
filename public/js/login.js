const loginContainer = document.getElementById("loginContainer");
const logoutContainer = document.getElementById("logoutContainer");
const dataContainer = document.getElementById("dataContainer");

const loginForm = document.getElementById("loginForm");
const loginUsername = document.getElementById("inputUsername");
const loginUsernameHelpMsg = document.getElementById("loginUsernameHelp");
const loginPassword = document.getElementById("inputPassword");
const loginPasswordHelpMsg = document.getElementById("loginPasswordHelp");

async function login() {
  const username = loginUsername.value;
  const password = loginPassword.value;

  const response = await api("POST", "/login", { username, password });

  if (response.status === "error") {
    showLoginErrors(response.error);
  } else {
    localStorage.setItem("token", response.accessToken);

    updateLoginStatus();
    loadTable();
  }
}

function logout() {
  localStorage.clear();
  updateLoginStatus();
  loginForm.reset();
}

function showLoginErrors(errors) {
  loginPasswordHelpMsg.innerText = errors;
  loginPasswordHelpMsg.classList.add("invalid-feedback");

  loginForm.classList.add("was-validated");
}

function hideErrors() {
  loginPasswordHelpMsg.innerText = "";
  loginPasswordHelpMsg.classList.remove("invalid-feedback");

  loginForm.classList.remove("was-validated");
  loginForm.reset();
}

function isLoggedIn() {
  return Boolean(localStorage.getItem("token"));
}

function updateLoginStatus() {
  loginContainer.style.display = isLoggedIn() ? "none" : "";
  logoutContainer.style.display = isLoggedIn() ? "" : "none";
  dataContainer.style.display = isLoggedIn() ? "" : "none";
}

updateLoginStatus();
