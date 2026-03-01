document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("employeeForm");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            let employees = JSON.parse(localStorage.getItem("employees")) || [];

            let basicSalary = Number(document.getElementById("basicSalary").value);
            let bonus = Number(document.getElementById("bonus").value);
            let overtime = Number(document.getElementById("overtime").value);

            let netSalary = basicSalary + bonus + overtime;

            let newEmployee = {
                id: document.getElementById("empId").value,
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                phone: document.getElementById("phone").value,
                department: document.getElementById("department").value,
                designation: document.getElementById("designation").value,
                doj: document.getElementById("doj").value,
                basicSalary: basicSalary,
                bonus: bonus,
                overtime: overtime,
                netSalary: netSalary,
                presentDays: document.getElementById("presentDays").value,
                absentDays: document.getElementById("absentDays").value,
                leaveBalance: document.getElementById("leaveBalance").value,
                rating: document.getElementById("rating").value,
                appraisal: document.getElementById("appraisal").value,
                promotion: document.getElementById("promotion").value,
                bankName: document.getElementById("bankName").value,
                accountNumber: document.getElementById("accountNumber").value,
                ifsc: document.getElementById("ifsc").value,
                status: document.getElementById("status").value
            };

            employees.push(newEmployee);

            localStorage.setItem("employees", JSON.stringify(employees));

            alert("Employee Added Successfully!");

            form.reset();
            document.getElementById("netSalary").innerText = "0";
        });
    }

});