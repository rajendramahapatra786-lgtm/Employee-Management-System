// Salary page functionality
document.addEventListener('DOMContentLoaded', function() {
    loadSalaries();
    loadSalaryStats();
});

function loadSalaries() {
    const salaries = API.getSalaries();
    const employees = API.getEmployees(); // Get ALL employees (including resigned)
    const tbody = document.getElementById('salaryList');
    
    if(salaries.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center">No salary records found</td></tr>';
        return;
    }
    
    // Sort by month (newest first)
    salaries.sort((a, b) => b.month.localeCompare(a.month));
    
    tbody.innerHTML = salaries.map(s => {
        // Find employee
        const emp = employees.find(e => e.id === s.employeeId);
        const isResigned = emp && emp.status === 'Resigned';
        const isUnknown = !emp; // Employee completely deleted
        const employeeName = emp ? emp.name : 'Unknown';
        
        let rowClass = '';
        if(isResigned) rowClass = 'resigned-employee-row';
        if(isUnknown) rowClass = 'unknown-employee-row';
        
        return `
            <tr class="${rowClass}">
                <td>${employeeName} ${isResigned ? '(Resigned)' : ''} ${isUnknown ? '(Deleted)' : ''}</td>
                <td>${s.month}</td>
                <td>₹${s.amount}</td>  <!-- Changed from $ to ₹ -->
                <td><span class="badge badge-active">${s.status || 'Paid'}</span></td>
                <td>
                    ${isResigned || isUnknown ? `
                        <button class="btn-icon btn-delete" onclick="deleteSalaryRecord('${s.id}')" title="Delete this salary record">
                            <i class="fas fa-trash"></i>
                        </button>
                    ` : '-'}
                </td>
            </tr>
        `;
    }).join('');
}

function loadSalaryStats() {
    const salaries = API.getSalaries();
    const employees = API.getEmployees();
    
    // Calculate total payroll (include all records)
    const total = salaries.reduce((sum, s) => sum + (s.amount || 0), 0);
    
    // Get unique active employees with salary records
    const activeEmployeeSalaries = salaries.filter(s => {
        const emp = employees.find(e => e.id === s.employeeId);
        return emp && emp.status === 'Active';
    });
    
    document.getElementById('totalPayroll').textContent = `₹${total}`;  // Changed from $ to ₹
    document.getElementById('paidCount').textContent = activeEmployeeSalaries.length;
}

function processPayroll() {
    const employees = API.getActiveEmployees(); // Only active employees get payroll
    const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
    
    if(employees.length === 0) {
        alert('No active employees to process payroll for!');
        return;
    }
    
    // Check if already processed
    const existing = API.getSalaries().filter(s => s.month === currentMonth);
    if(existing.length > 0) {
        if(!confirm('Payroll for this month already exists. Process again?')) {
            return;
        }
    }
    
    let processed = 0;
    let totalPayroll = 0;
    
    // Process each active employee using THEIR salary from employee record
    employees.forEach(emp => {
        // USE THE SALARY FROM EMPLOYEE RECORD (not random)
        const salaryAmount = emp.salary || 3000; // Use employee's salary, default 3000 if not set
        
        const salary = {
            employeeId: emp.id,
            month: currentMonth,
            amount: salaryAmount,
            status: 'Paid'
        };
        
        API.addSalary(salary);
        processed++;
        totalPayroll += salaryAmount;
    });
    
    API.addActivity('Payroll', `Processed payroll for ${processed} employees in ${currentMonth} - Total: ₹${totalPayroll}`);  // Changed from $ to ₹
    loadSalaries();
    loadSalaryStats();
    alert(`Payroll processed for ${processed} employees! Total: ₹${totalPayroll}`);  // Changed from $ to ₹
}

function deleteSalaryRecord(id) {
    if(confirm('Delete this salary record permanently?')) {
        const salaries = API.getSalaries();
        const filtered = salaries.filter(s => s.id !== id);
        API.saveSalaries(filtered);
        loadSalaries();
        loadSalaryStats();
        alert('Salary record deleted!');
    }
}

// Optional: Add cleanup function for unknown records
function cleanupUnknownSalaryRecords() {
    const salaries = API.getSalaries();
    const employees = API.getEmployees();
    
    const unknownSalaries = salaries.filter(s => !employees.some(e => e.id === s.employeeId));
    
    if(unknownSalaries.length > 0) {
        if(confirm(`Delete ${unknownSalaries.length} salary records for employees that no longer exist?`)) {
            const cleanSalaries = salaries.filter(s => employees.some(e => e.id === s.employeeId));
            API.saveSalaries(cleanSalaries);
            loadSalaries();
            loadSalaryStats();
            alert(`✅ Cleaned up ${unknownSalaries.length} unknown salary records!`);
        }
    } else {
        alert('No unknown salary records found!');
    }
}