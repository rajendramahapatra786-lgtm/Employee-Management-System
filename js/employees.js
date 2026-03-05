// Employees page functionality
let currentEmployeeId = null;

document.addEventListener('DOMContentLoaded', function() {
    loadEmployees();
    
    // Form submission
    document.getElementById('employeeForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        saveEmployee();
    });
});

function loadEmployees() {
    const employees = API.getActiveEmployees(); // Only show active employees
    const tbody = document.getElementById('employeesList');
    
    if(employees.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center">No employees found</td></tr>';
        return;
    }
    
    tbody.innerHTML = employees.map(emp => {
        const statusClass = emp.status ? emp.status.toLowerCase() : 'active';
        
        return `
        <tr>
            <td>${emp.name}</td>
            <td>${emp.email}</td>
            <td>${emp.department}</td>
            <td>${emp.position}</td>
            <td><span class="badge badge-${statusClass}">${emp.status || 'Active'}</span></td>
            <td>
                <button class="btn-icon btn-edit" onclick="editEmployee('${emp.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon btn-delete" onclick="deleteEmployee('${emp.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `}).join('');
}

function showAddModal() {
    currentEmployeeId = null;
    document.getElementById('modalTitle').textContent = 'Add Employee';
    document.getElementById('employeeForm').reset();
    document.getElementById('employeeModal').style.display = 'block';
}

// Update editEmployee function to load salary
function editEmployee(id) {
    const emp = API.getEmployee(id);
    if(!emp) return;
    
    currentEmployeeId = id;
    document.getElementById('modalTitle').textContent = 'Edit Employee';
    document.getElementById('empId').value = emp.id;
    document.getElementById('empName').value = emp.name;
    document.getElementById('empEmail').value = emp.email;
    document.getElementById('empDepartment').value = emp.department;
    document.getElementById('empPosition').value = emp.position;
    document.getElementById('empJoinDate').value = emp.joinDate;
    document.getElementById('empStatus').value = emp.status;
    document.getElementById('empSalary').value = emp.salary || '';
    
    document.getElementById('employeeModal').style.display = 'block';
}

// Update saveEmployee function to include salary
function saveEmployee() {

    let name = document.getElementById('empName').value.trim();
    let salary = document.getElementById('empSalary').value;

    // Name validation (only alphabets)
    const namePattern = /^[A-Za-z ]+$/;

    if(!namePattern.test(name)){
        alert("Employee name must contain only alphabets");
        return;
    }

    // Salary validation (only positive numbers)
    if(isNaN(salary) || salary <= 0){
        alert("Salary must be a positive number");
        return;
    }
    const employeeData = {
        name: document.getElementById('empName').value,
        email: document.getElementById('empEmail').value,
        department: document.getElementById('empDepartment').value,
        position: document.getElementById('empPosition').value,
        joinDate: document.getElementById('empJoinDate').value,
        status: document.getElementById('empStatus').value,
        salary: document.getElementById('empSalary').value
    };
    
    if(currentEmployeeId) {
        API.updateEmployee(currentEmployeeId, employeeData);
        API.addActivity('Update', `Updated employee: ${employeeData.name} with salary ₹${employeeData.salary}`); // Changed $ to ₹
    } else {
        API.addEmployee(employeeData);
        API.addActivity('Add', `Added new employee: ${employeeData.name} with salary ₹${employeeData.salary}`); // Changed $ to ₹
    }
    
    closeModal();
    loadEmployees();
    alert(currentEmployeeId ? 'Employee updated!' : 'Employee added!');
}

function deleteEmployee(id) {
    const emp = API.getEmployee(id);
    if(!emp) {
        alert('Employee not found!');
        return;
    }
    
    // Check if employee has attendance or salary records
    const attendance = API.getAttendance();
    const salaries = API.getSalaries();
    
    const hasAttendance = attendance.some(a => a.employeeId === id);
    const hasSalary = salaries.some(s => s.employeeId === id);
    
    let message = `Mark ${emp.name} as Resigned?`;
    
    if(hasAttendance || hasSalary) {
        const records = [];
        if(hasAttendance) records.push('attendance records');
        if(hasSalary) records.push('salary records');
        
        message = `⚠️ ${emp.name} has ${records.join(' and ')}. 
        
They will be REMOVED from Employees list but will still appear in Attendance & Salary pages (highlighted in RED).
        
You can delete their records later from those pages.
        
Mark as Resigned?`;
    } else {
        message = `Mark ${emp.name} as Resigned? (No records found)`;
    }
    
    if(confirm(message)) {
        API.deleteEmployee(id);
        API.addActivity('Resigned', `Marked employee as Resigned: ${emp.name}`);
        loadEmployees();
        
        // Refresh other pages to show in red
        if(typeof loadAttendance === 'function') {
            loadAttendance();
        }
        if(typeof loadSalaries === 'function') {
            loadSalaries();
        }
        
        alert(`✅ ${emp.name} marked as Resigned!`);
    }
}

function closeModal() {
    document.getElementById('employeeModal').style.display = 'none';
}