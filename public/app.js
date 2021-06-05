const usersTable = document.getElementById("contentTable");
const templateRow = document.getElementById("contentRow").content;

const inputName = document.getElementById("inputName");
const inputAge = document.getElementById("inputAge");

const createUserFormContent = document.getElementById("form-create");
const createUserForm = document.getElementById("createUserForm");

const updateUserFormContent = document.getElementById("form-update");
const updateUserForm = document.getElementById("updateUserForm");

function addRow(id, name, age) {
  const newRow = templateRow.cloneNode(true);

  newRow.querySelector(".txtId").innerText = id;
  newRow.querySelector(".txtName").innerText = name;
  newRow.querySelector(".txtAge").innerText = age;
  newRow.querySelector(".btnUpdate").onclick = () => updateUser(id);
  newRow.querySelector(".btnDelete").onclick = () => deleteUser(id);

  usersTable.appendChild(newRow);
}

async function api(method, endpoint, body = undefined) {
  if (body) {
    body = JSON.stringify(body);
  }

  const response = await fetch(`/api/${endpoint}`, {
    method,
    body,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  return data;
}

async function loadTable() {
  usersTable.innerHTML = "";

  const data = await api("GET", "/users");
  data.forEach(({ id, name, age }) => addRow(id, name, age));
}

async function initApp() {
  await loadTable();
}

async function createUser() {
  const name = inputName.value;
  const age = inputAge.value;

  await api("POST", "/users", {
    name,
    age,
  });

  createUserForm.reset();
  loadTable();
}

async function updateUser(idUser) {
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

async function saveUpdatedUser() {
  const idUser = updateUserFormContent.querySelector("#user-id").innerText;
  const name = updateUserForm.querySelector("#inputName").value;
  const age = updateUserForm.querySelector("#inputAge").value;

  await api("PUT", `/users/${idUser}`, {
    name,
    age,
  });

  cancelUser();
  loadTable();
}

async function deleteUser(idUser) {
  await api("DELETE", `/users/${idUser}`);

  loadTable();
}
