// Main app - loads navbar and sidebar
document.addEventListener('DOMContentLoaded', function() {
    // Check login
    if(localStorage.getItem('isLoggedIn') !== 'true' && !window.location.pathname.includes('index.html')) {
        window.location.href = 'index.html';
        return;
    }

    // Load sidebar
    fetch('components/sidebar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('sidebar').innerHTML = data;
            setActiveMenu();
        });

    // Load navbar
    fetch('components/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar').innerHTML = data;
            document.getElementById('userName').textContent = localStorage.getItem('currentUser') || 'Admin';
            setPageTitle();
        });
});

// Set active menu based on current page
function setActiveMenu() {
    const currentPage = window.location.pathname.split('/').pop();
    setTimeout(() => {
        document.querySelectorAll('.sidebar-menu a').forEach(link => {
            if(link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });
    }, 100);
}

// Set page title
function setPageTitle() {
    const page = window.location.pathname.split('/').pop();
    let title = 'Dashboard';
    
    if(page.includes('employees')) title = 'Employees';
    else if(page.includes('attendance')) title = 'Attendance';
    else if(page.includes('salary')) title = 'Salary';
    
    document.getElementById('pageTitle').textContent = title;
}

// Global logout function
window.logout = function() {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'index.html';
};