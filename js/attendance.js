// Attendance page functionality
document.addEventListener('DOMContentLoaded', function() {
    loadAttendance();
    loadEmployeeSelect();
    
    document.getElementById('attendanceForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        saveAttendance();
    });
});

// In attendance.js - Update loadAttendance function

// In attendance.js - Update the loadAttendance function

function loadAttendance() {
    const attendance = API.getAttendance();
    const employees = API.getEmployees();
    const today = API.today();
    const tbody = document.getElementById('attendanceList');
    
    // Filter today's attendance
    const todayAttendance = attendance.filter(a => a.date === today);
    
    if(todayAttendance.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center">No attendance marked today</td></tr>';
        return;
    }
    
    tbody.innerHTML = todayAttendance.map(a => {
        // Find employee
        const emp = employees.find(e => e.id === a.employeeId);
        const isResigned = emp && emp.status === 'Resigned';
        const employeeName = emp ? emp.name : 'Unknown';
        
        console.log('Employee:', emp, 'isResigned:', isResigned); // Add this to debug
        
        return `
            <tr class="${isResigned ? 'resigned-employee-row' : ''}">
                <td>${employeeName} ${isResigned ? '(Resigned)' : ''}</td>
                <td>${a.date}</td>
                <td><span class="badge ${a.status}">${a.status}</span></td>
                <td>${a.checkIn || '-'}</td>
                <td>${a.checkOut || '-'}</td>
                <td>
                    ${isResigned ? `
                        <button class="btn-icon btn-delete" onclick="deleteAttendanceRecord('${a.id}')" title="Delete this attendance record">
                            <i class="fas fa-trash"></i>
                        </button>
                    ` : '-'}
                </td>
            </tr>
        `;
    }).join('');
}

function loadEmployeeSelect() {
    const employees = API.getActiveEmployees(); // Only active employees can mark attendance
    const select = document.getElementById('attendanceEmployee');
    
    if(employees.length === 0) {
        select.innerHTML = '<option value="">No employees available</option>';
        return;
    }
    
    select.innerHTML = '<option value="">Select Employee</option>' + 
        employees.map(emp => `<option value="${emp.id}">${emp.name}</option>`).join('');
}

function showMarkModal() {
    document.getElementById('attendanceForm').reset();
    document.getElementById('attendanceModal').style.display = 'block';
    
    // Set default times
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    document.getElementById('attendanceIn').value = `${hours}:${minutes}`;
    document.getElementById('attendanceOut').value = '18:00';
}

function saveAttendance() {
    const employeeId = document.getElementById('attendanceEmployee').value;
    const status = document.getElementById('attendanceStatus').value;
    const checkIn = document.getElementById('attendanceIn').value;
    const checkOut = document.getElementById('attendanceOut').value;
    
    if(!employeeId) {
        alert('Please select employee');
        return;
    }
    
    const data = {
        employeeId: employeeId,
        status: status,
        checkIn: checkIn,
        checkOut: checkOut
    };
    
    API.markAttendance(data);
    
    // Get employee name for activity
    const emp = API.getEmployee(employeeId);
    API.addActivity('Attendance', `Marked ${emp ? emp.name : 'Employee'} as ${status}`);
    
    closeModal();
    loadAttendance();
    alert('Attendance marked!');
}

function deleteAttendanceRecord(id) {
    if(confirm('Delete this attendance record permanently?')) {
        const attendance = API.getAttendance();
        const filtered = attendance.filter(a => a.id !== id);
        API.saveAttendance(filtered);
        loadAttendance();
        alert('Attendance record deleted!');
    }
}

function closeModal() {
    document.getElementById('attendanceModal').style.display = 'none';
}