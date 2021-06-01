const usersTable = document.getElementById("contentTable");
const templateRow = document.getElementById("contentRow").content;
const inputName = document.getElementById("inputName");
const inputAge = document.getElementById("inputAge");
const createUserForm = document.getElementById("createUserForm");

function addRow(id, name, age) {
  const newRow = templateRow.cloneNode(true);

  newRow.querySelector(".txtId").innerText = id;
  newRow.querySelector(".txtName").innerText = name;
  newRow.querySelector(".txtAge").innerText = age;

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
