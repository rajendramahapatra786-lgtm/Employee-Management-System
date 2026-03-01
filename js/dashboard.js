function loadDashboard() {

    let employees = JSON.parse(localStorage.getItem("employees")) || [];

    let totalEmployees = employees.length;

    let totalSalary = 0;
    let activeEmployees = 0;
    let totalRating = 0;

    employees.forEach(emp => {
        totalSalary += Number(emp.netSalary);
        totalRating += Number(emp.rating);

        if (emp.status === "Active") {
            activeEmployees++;
        }
    });

    let avgRating = totalEmployees > 0 ? (totalRating / totalEmployees).toFixed(1) : 0;

    document.getElementById("totalEmployees").innerText = totalEmployees;
    document.getElementById("totalSalary").innerText = totalSalary;
    document.getElementById("activeEmployees").innerText = activeEmployees;
    document.getElementById("avgRating").innerText = avgRating;
}

loadDashboard();