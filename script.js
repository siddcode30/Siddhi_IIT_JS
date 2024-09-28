let chemicals = [];
let idCounter = 1;

document.getElementById('addForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values from user
    const chemicalName = document.getElementById('chemicalName').value;
    const vendor = document.getElementById('vendor').value;
    const density = document.getElementById('density').value;
    const viscosity = document.getElementById('viscosity').value;
    const packaging = document.getElementById('packaging').value;
    const packSize = document.getElementById('packSize').value;
    const unit = document.getElementById('unit').value;
    const quantity = document.getElementById('quantity').value;

    // Add function
    addChemical({
        id: idCounter++,
        chemicalName,
        vendor,
        density,
        viscosity,
        packaging,
        packSize,
        unit,
        quantity
    });

    // Clear item function
    document.getElementById('addForm').reset();
});

function addChemical(chemical) {
    chemicals.push(chemical);
    renderTable();
}

function renderTable() {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = ''; //Clear previous rows function

    chemicals.forEach(chemical => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td><input type="checkbox"></td>
            <td>${chemical.id}</td>
            <td contenteditable="true">${chemical.chemicalName}</td>
            <td contenteditable="true">${chemical.vendor}</td>
            <td contenteditable="true">${chemical.density}</td>
            <td contenteditable="true">${chemical.viscosity}</td>
            <td contenteditable="true">${chemical.packaging}</td>
            <td contenteditable="true">${chemical.packSize}</td>
            <td contenteditable="true">${chemical.unit}</td>
            <td contenteditable="true">${chemical.quantity}</td>
            <td>
                <button onclick="deleteRow(${chemical.id})">Delete</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

function deleteRow(id) {
    chemicals = chemicals.filter(chemical => chemical.id !== id);
    renderTable();
}

document.getElementById('sortAsc').addEventListener('click', function () {
    chemicals.sort((a, b) => a.chemicalName.localeCompare(b.chemicalName));
    renderTable();
});

document.getElementById('sortDesc').addEventListener('click', function () {
    chemicals.sort((a, b) => b.chemicalName.localeCompare(a.chemicalName));
    renderTable();
});

document.getElementById('refreshTable').addEventListener('click', function () {
    renderTable();
});

document.getElementById('saveData').addEventListener('click', function () {
    localStorage.setItem('chemicals', JSON.stringify(chemicals));
    alert('Data saved!');
});

// Load data from localStorage when page is loaded
window.onload = function () {
    const savedChemicals = localStorage.getItem('chemicals');
    if (savedChemicals) {
        chemicals = JSON.parse(savedChemicals);
        renderTable();
    }
};
