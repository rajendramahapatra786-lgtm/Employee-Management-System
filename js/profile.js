let employees = JSON.parse(localStorage.getItem("employees")) || [];
let profileCard = document.getElementById("profileCard");

// Get employee index from URL
let params = new URLSearchParams(window.location.search);
let index = params.get("index");

if (index !== null && employees[index]) {

    let emp = employees[index];

    let hra = emp.basicSalary * 0.20;
    let pf = emp.basicSalary * 0.12;
    let tax = emp.basicSalary * 0.10;

    profileCard.innerHTML = `
        <h3>${emp.name} (${emp.id})</h3>
        <hr><br>

        <p><strong>Email:</strong> ${emp.email}</p>
        <p><strong>Phone:</strong> ${emp.phone}</p>
        <p><strong>Department:</strong> ${emp.department}</p>
        <p><strong>Designation:</strong> ${emp.designation}</p>
        <p><strong>Status:</strong> ${emp.status}</p>

        <br><hr><br>

        <h3>Salary Details</h3>
        <p><strong>Basic:</strong> ₹ ${emp.basicSalary}</p>
        <p><strong>HRA (20%):</strong> ₹ ${hra}</p>
        <p><strong>Bonus:</strong> ₹ ${emp.bonus}</p>
        <p><strong>Overtime:</strong> ₹ ${emp.overtime}</p>
        <p><strong>PF (12%):</strong> ₹ ${pf}</p>
        <p><strong>Tax (10%):</strong> ₹ ${tax}</p>
        <p><strong>Net Salary:</strong> ₹ ${emp.netSalary}</p>

        <br><hr><br>

        <h3>Attendance</h3>
        <p><strong>Present Days:</strong> ${emp.presentDays}</p>
        <p><strong>Absent Days:</strong> ${emp.absentDays}</p>
        <p><strong>Leave Balance:</strong> ${emp.leaveBalance}</p>

        <br><hr><br>

        <h3>Performance</h3>
        <p><strong>Rating:</strong> ${emp.rating}</p>
        <p><strong>Appraisal:</strong> ${emp.appraisal}%</p>
        <p><strong>Promotion:</strong> ${emp.promotion}</p>

        <br><hr><br>

        <h3>Bank Details</h3>
        <p><strong>Bank:</strong> ${emp.bankName}</p>
        <p><strong>Account No:</strong> ${emp.accountNumber}</p>
        <p><strong>IFSC:</strong> ${emp.ifsc}</p>
    `;
} else {
    profileCard.innerHTML = "<p>Employee not found.</p>";
}