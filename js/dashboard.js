// Dashboard functionality
document.addEventListener('DOMContentLoaded', function() {
    loadDashboardStats();
    loadActivities();
});

function loadDashboardStats() {
    const stats = API.getStats();
    const employees = API.getEmployees();
    
    const statsHtml = `
        <div class="stat-card">
            <div class="stat-icon blue">
                <i class="fas fa-users"></i>
            </div>
            <div class="stat-info">
                <h3>Total Employees</h3>
                <p>${stats.totalEmployees}</p>
            </div>
        </div>
        
        <div class="stat-card">
            <div class="stat-icon green">
                <i class="fas fa-user-check"></i>
            </div>
            <div class="stat-info">
                <h3>Active Employees</h3>
                <p>${stats.activeEmployees}</p>
            </div>
        </div>
        
        <div class="stat-card">
            <div class="stat-icon orange">
                <i class="fas fa-calendar-check"></i>
            </div>
            <div class="stat-info">
                <h3>Present Today</h3>
                <p>${stats.presentToday}</p>
            </div>
        </div>
        
        <div class="stat-card">
            <div class="stat-icon blue">
                <i class="fas fa-building"></i>
            </div>
            <div class="stat-info">
                <h3>Departments</h3>
                <p>${stats.departments}</p>
            </div>
        </div>
    `;
    
    document.getElementById('statsContainer').innerHTML = statsHtml;
}

function loadActivities() {
    const activities = API.getActivities();
    const tbody = document.getElementById('activitiesList');
    
    if(activities.length === 0) {
        tbody.innerHTML = '<tr><td colspan="2" class="text-center">No activities yet</td></tr>';
        return;
    }
    
    tbody.innerHTML = activities.map(act => `
        <tr>
            <td>${act.details}</td>
            <td>${act.time}</td>
        </tr>
    `).join('');
}