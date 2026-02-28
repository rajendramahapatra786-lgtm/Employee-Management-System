// Load employees from localStorage
let employees = JSON.parse(localStorage.getItem("employees")) || [];

// =======================
// 1️⃣ Employee Class (OOP)
// =======================
class Employee {
    constructor(id, name, salary, department) {
        this.id = id;
        this.name = name;
        this.salary = salary;
        this.department = department;
    }
}

// =======================
// 2️⃣ Add Employee
// =======================
function addEmployee() {
    let id = document.getElementById("id").value.trim();
    let name = document.getElementById("name").value.trim();
    let salary = document.getElementById("salary").value.trim();
    let department = document.getElementById("department").value.trim();

    if (id === "" || name === "" || salary === "" || department === "") {
        alert("Please fill all fields!");
        return;
    }

    let newEmployee = new Employee(id, name, salary, department);

    employees.push(newEmployee);

    localStorage.setItem("employees", JSON.stringify(employees));

    clearForm();
    displayEmployees();
}

// =======================
// 3️⃣ Display Employees (FOR LOOP)
// =======================
function displayEmployees() {
    let output = document.getElementById("output");
    output.innerHTML = "";

    for (let i = 0; i < employees.length; i++) {
        output.innerHTML += `
            <p>
                <strong>ID:</strong> ${employees[i].id} |
                <strong>Name:</strong> ${employees[i].name} |
                <strong>Salary:</strong> ${employees[i].salary} |
                <strong>Dept:</strong> ${employees[i].department}
                <br>
                <button onclick="deleteEmployee(${i})">Delete</button>
            </p>
        `;
    }
}

// =======================
// 4️⃣ Delete Employee
// =======================
function deleteEmployee(index) {
    employees.splice(index, 1);
    localStorage.setItem("employees", JSON.stringify(employees));
    displayEmployees();
}

// =======================
// 5️⃣ Clear Form
// =======================
function clearForm() {
    document.getElementById("id").value = "";
    document.getElementById("name").value = "";
    document.getElementById("salary").value = "";
    document.getElementById("department").value = "";
}

// =======================
// 6️⃣ Load On Page Start
// =======================
displayEmployees();