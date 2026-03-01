let employees = JSON.parse(localStorage.getItem("employees")) || [];
let tableBody = document.getElementById("employeeTableBody");
let searchInput = document.getElementById("searchInput");

function displayEmployees(data) {

    tableBody.innerHTML = "";

    data.forEach((emp) => {

        let originalIndex = employees.findIndex(e => e.id === emp.id);

        let row = `
            <tr>
                <td>${emp.id}</td>
                <td>${emp.name}</td>
                <td>${emp.department}</td>
                <td>₹ ${emp.netSalary}</td>
                <td>${emp.status}</td>
                <td>
                    <a href="profile.html?index=${originalIndex}">View</a>
                    <button onclick="deleteEmployee(${originalIndex})">Delete</button>
                </td>
            </tr>
        `;

        tableBody.innerHTML += row;
    });
}

function deleteEmployee(index) {

    if(confirm("Are you sure you want to delete this employee?")) {

        employees.splice(index, 1);
        localStorage.setItem("employees", JSON.stringify(employees));

        displayEmployees(employees);
    }
}

searchInput.addEventListener("input", function() {

    let searchValue = searchInput.value.toLowerCase();

    let filtered = employees.filter(emp =>
        emp.name.toLowerCase().includes(searchValue)
    );

    displayEmployees(filtered);
});

displayEmployees(employees);