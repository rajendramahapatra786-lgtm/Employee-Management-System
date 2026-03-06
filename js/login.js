// ==============================
// Login page functionality
// ==============================

document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Demo login
    if (username === 'admin' && password === 'admin123') {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', username);
        window.location.href = 'dashboard.html';
    } else {
        alert('Invalid credentials! Use admin/admin123');
    }
});


// ==============================
// Password Toggle Feature
// ==============================

document.addEventListener('DOMContentLoaded', function() {

    const passwordInput = document.getElementById('password');
    const passwordGroup = passwordInput.closest('.form-group');

    // Create eye button
    const eyeButton = document.createElement('button');
    eyeButton.type = 'button';
    eyeButton.className = 'password-toggle-btn';
    eyeButton.style.display = 'none';

    eyeButton.innerHTML =
        '<img src="https://img.icons8.com/material-outlined/24/visible--v1.png" alt="show password">';

    // Add button to password field
    passwordGroup.appendChild(eyeButton);


    // ==============================
    // Show eye icon when typing
    // ==============================

    passwordInput.addEventListener('input', function() {

        if (this.value.length > 0) {
            eyeButton.style.display = 'flex';
        } else {
            eyeButton.style.display = 'none';
        }

    });


    // ==============================
    // Toggle password visibility
    // ==============================

    eyeButton.addEventListener('click', function() {

        if (passwordInput.type === 'password') {

            passwordInput.type = 'text';

            eyeButton.innerHTML =
                '<img src="https://img.icons8.com/material-outlined/24/invisible--v1.png" alt="hide password">';

        } else {

            passwordInput.type = 'password';

            eyeButton.innerHTML =
                '<img src="https://img.icons8.com/material-outlined/24/visible--v1.png" alt="show password">';

        }

    });

});


// ==============================
// Optional Redirect (Disabled)
// ==============================

/*

// Redirect if already logged in
if(localStorage.getItem('isLoggedIn') === 'true' 
   && window.location.pathname.includes('index.html')) {

    window.location.href = 'dashboard.html';

}

*/