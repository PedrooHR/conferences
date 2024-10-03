var main_data;
var current_data;

var states = {
  id: 0,
  acronym: 0,
  name: 0,
  qualis: 0
}

var enable_col = {
  acronym: 1,
  name: 1,
  qualis: 1,
  publisher: 0,
  deadline: 0,
  notification: 0,
  submissions: 0,
  acc_rate: 0
}

function build_table(data) {
  const headerTable = document.getElementById("table_header");
  let header_val = headerTable.children[0].innerHTML;
  if (enable_col.publisher == 1)
    header_val += `<th scope="col" id="tb-publisher">Publisher</th>`
  if (enable_col.deadline == 1)
    header_val += `<th scope="col" id="tb-deadline">Deadline</th>`

  headerTable.innerHTML = header_val;

  const dataTable = document.getElementById("table_body");
  dataTable.innerHTML = "";
  for (let entry in data) {
    let row_val = `<th scope="row"> ` + entry + `</th>` +
      `<td> ` + data[entry].Acronym + `</td>` +
      `<td> ` + data[entry].Name + `</td>` +
      `<td> ` + data[entry].qualis + `</td>`;

    if (enable_col.deadline == 1) {
      row_val += `<td>` + data[entry].deadline + `</td>`
    }
    if (enable_col.publisher == 1) {
      row_val += `<td>` + data[entry].publisher + `</td>`
    }

    dataTable.innerHTML += row_val;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  fetch('conferences.json')
    .then(response => response.json())
    .then(data => {
      main_data = data.map((x) => x);
      current_data = data.map((x) => x);

      build_table(main_data);
    })
    .catch(error => console.error("Error fetching JSON data:", error));
});

document.getElementById("tb-name").addEventListener('click', function () {
  current_data = main_data.map((x) => x);

  let lesser = 0;
  let higher = 0;
  if (states.name == 0) {
    lesser = -1;
    higher = 1;
    states.name = 1;
  } else if (states.name == 1) {
    lesser = 1;
    higher = -1;
    states.name = 2;
  } else if (states.name == 2) {
    states.name = 0;
  }

  current_data.sort((a, b) => {
    const aValue = JSON.
      stringify(Object.values(a.Name));
    const bValue = JSON.
      stringify(Object.values(b.Name));
    if (aValue < bValue) return lesser;
    if (aValue > bValue) return higher;
    return 0;
  });
  build_table(current_data);
});

document.getElementById("tb-acronym").addEventListener('click', function () {
  let current_data = main_data.map((x) => x);

  let lesser = 0;
  let higher = 0;
  if (states.acronym == 0) {
    lesser = -1;
    higher = 1;
    states.acronym = 1;
  } else if (states.acronym == 1) {
    lesser = 1;
    higher = -1;
    states.acronym = 2;
  } else if (states.acronym == 2) {
    states.acronym = 0;
  }

  current_data.sort((a, b) => {
    const aValue = JSON.
      stringify(Object.values(a.Acronym));
    const bValue = JSON.
      stringify(Object.values(b.Acronym));
    if (aValue < bValue) return lesser;
    if (aValue > bValue) return higher;
    return 0;
  });
  build_table(current_data);
});

document.getElementById("tb-qualis").addEventListener('click', function () {
  let current_data = main_data.map((x) => x);

  let lesser = 0;
  let higher = 0;
  if (states.qualis == 0) {
    lesser = -1;
    higher = 1;
    states.qualis = 1;
  } else if (states.qualis == 1) {
    lesser = 1;
    higher = -1;
    states.qualis = 2;
  } else if (states.qualis == 2) {
    states.qualis = 0;
  }

  current_data.sort((a, b) => {
    const aValue = JSON.
      stringify(Object.values(a.qualis));
    const bValue = JSON.
      stringify(Object.values(b.qualis));
    if (aValue < bValue) return lesser;
    if (aValue > bValue) return higher;
    return 0;
  });
  build_table(current_data);
});

document.getElementById("cb-deadline").addEventListener('click', function () {
  let checked = document.getElementById("cb-deadline").checked;
  if (checked) {
    enable_col.deadline = 1;
  } else {
    // document.getElementById("");
    enable_col.deadline = 0;
  }
  build_table(current_data);
});