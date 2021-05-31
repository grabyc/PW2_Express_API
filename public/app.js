const usersTable = document.getElementById("contentTable");

const templateRow = document.getElementById("contentRow").content;

function addRow(id, name, age) {
  const newRow = templateRow.cloneNode(true);

  newRow.querySelector(".txtId").innerText = id;
  newRow.querySelector(".txtName").innerText = name;
  newRow.querySelector(".txtAge").innerText = age;

  usersTable.appendChild(newRow);
}

async function api(method, endpoint) {
  const response = await fetch(`/api/${endpoint}`, {
    method,
  });

  const data = await response.json();

  return data;
}

async function initApp() {
  const data = await api("GET", "/users");

  data.forEach(({ id, name, age }) => addRow(id, name, age));
}
