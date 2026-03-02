// Login page functionality
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Demo login
    if(username === 'admin' && password === 'admin123') {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', username);
        window.location.href = 'dashboard.html';
    } else {
        alert('Invalid credentials! Use admin/admin123');
    }
});

// ✅ REDIRECT PART IS NOW COMMENTED OUT - WON'T AUTO REDIRECT
/*
// Redirect if already logged in
if(localStorage.getItem('isLoggedIn') === 'true' && window.location.pathname.includes('index.html')) {
    window.location.href = 'dashboard.html';
}
*/