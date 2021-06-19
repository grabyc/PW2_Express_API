const usersTable = document.getElementById("contentTable");
const templateRow = document.getElementById("contentRow").content;

const inputName = document.getElementById("inputName");
const inputAge = document.getElementById("inputAge");

const createUserFormContent = document.getElementById("form-create");
const createUserForm = document.getElementById("createUserForm");
const createNameMsg = document.getElementById("createNameHelp");
const createAgeMsg = document.getElementById("createAgeHelp");

const updateUserFormContent = document.getElementById("form-update");
const updateUserForm = document.getElementById("updateUserForm");
const updateNameMsg = document.getElementById("updateNameHelp");
const updateAgeMsg = document.getElementById("updateAgeHelp");

async function initApp() {
  await loadTable();
}

async function loadTable() {
  if (localStorage.getItem("token")) {
    usersTable.innerHTML = "";

    const data = await api("GET", "/users");
    data.forEach(({ id, name, age }) => addRow(id, name, age));
  }
}

function addRow(id, name, age) {
  const newRow = templateRow.cloneNode(true);

  newRow.querySelector(".txtId").innerText = id;
  newRow.querySelector(".txtName").innerText = name;
  newRow.querySelector(".txtAge").innerText = age;
  newRow.querySelector(".btnUpdate").onclick = () => editUser(id);
  newRow.querySelector(".btnDelete").onclick = () => deleteUser(id);

  usersTable.appendChild(newRow);
}

async function createUser() {
  const name = inputName.value;
  const age = inputAge.value;

  const response = await api("POST", "/users", {
    name,
    age,
  });

  if (response.errors) {
    showErrors(response.errors);
  } else {
    hideErrors();
    loadTable();
  }
}

async function editUser(idUser) {
  createUserFormContent.style.display = "none";
  updateUserFormContent.style.display = "";

  const user = await api("GET", `/users/${idUser}`);

  updateUserFormContent.querySelector("#user-id").innerText = user.id;
  updateUserForm.querySelector("#inputName").value = user.name;
  updateUserForm.querySelector("#inputAge").value = user.age;
}

async function cancelUser() {
  createUserFormContent.style.display = "";
  updateUserFormContent.style.display = "none";
}

async function updateUser() {
  const idUser = updateUserFormContent.querySelector("#user-id").innerText;
  const name = updateUserForm.querySelector("#inputName").value;
  const age = updateUserForm.querySelector("#inputAge").value;

  const response = await api("PUT", `/users/${idUser}`, {
    name,
    age,
  });

  if (response.errors) {
    showErrors(response.errors);
  } else {
    hideErrors();
    cancelUser();
    loadTable();
  }
}

async function deleteUser(idUser) {
  await api("DELETE", `/users/${idUser}`);

  loadTable();
}

function showErrors(errors) {
  errors.forEach((error) => {
    switch (error.field) {
      case "name":
        inputName.classList.add("is-invalid");
        createNameMsg.innerText = error.msg;
        createNameMsg.classList.add("invalid-feedback");

        updateNameMsg.innerText = error.msg;
        updateNameMsg.classList.add("invalid-feedback");
        break;
      case "age":
        inputAge.classList.add("is-invalid");
        createAgeMsg.innerText = error.msg;
        createAgeMsg.classList.add("invalid-feedback");

        updateAgeMsg.innerText = error.msg;
        updateAgeMsg.classList.add("invalid-feedback");
        break;
    }
  });
  createUserForm.classList.add("was-validated");
  updateUserForm.classList.add("was-validated");
}

function hideErrors() {
  inputName.classList.remove("is-invalid");
  createNameMsg.innerText = "";
  createNameMsg.classList.remove("invalid-feedback");

  updateNameMsg.innerText = "";
  updateNameMsg.classList.remove("invalid-feedback");

  inputAge.classList.remove("is-invalid");
  createAgeMsg.innerText = "";
  createAgeMsg.classList.remove("invalid-feedback");

  updateAgeMsg.innerText = "";
  updateAgeMsg.classList.remove("invalid-feedback");

  createUserForm.classList.remove("was-validated");
  createUserForm.reset();
  updateUserForm.classList.remove("was-validated");
  updateUserForm.reset();
}

async function api(method, endpoint, body = undefined) {
  if (body) {
    body = JSON.stringify(body);
  }

  const headers = {
    "Content-Type": "application/json",
  };

  const token = localStorage.getItem("token");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`/api/${endpoint}`, {
    method,
    body,
    headers,
  });

  const data = await response.json();

  return data;
}
