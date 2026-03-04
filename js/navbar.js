// Navbar functions for all pages

// Load profile picture in navbar
function loadNavbarProfile() {
    console.log('🟢 loadNavbarProfile started');
    
    const savedPic = localStorage.getItem('profilePic');
    console.log('Saved pic exists:', savedPic ? '✅ Yes' : '❌ No');
    
    const navPic = document.getElementById('navProfilePic');
    console.log('navPic element:', navPic);
    
    const userName = document.getElementById('userName');
    console.log('userName element:', userName);
    
    if (navPic) {
        if (savedPic && savedPic !== 'null' && savedPic !== 'undefined') {
            navPic.src = savedPic;
            console.log('✅ Set picture from localStorage');
        } else {
            // Default avatar with emoji
            navPic.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35"><circle cx="17.5" cy="17.5" r="17.5" fill="%234e73df"/><text x="17.5" y="25" font-size="20" text-anchor="middle" fill="white" font-family="Arial">👤</text></svg>';
            console.log('✅ Set default placeholder');
        }
    } else {
        console.log('❌ navPic element NOT FOUND! Will try again...');
        setTimeout(loadNavbarProfile, 500);
        return;
    }
    
    // FIXED: Always show "admin" in navbar
    if (userName) {
        userName.textContent = 'Admin';
        console.log('✅ Set username to: Admin');
    }
}

// Update date/time
function updateDateTime() {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const date = now.toLocaleDateString('en-GB');
    const dtElement = document.getElementById('currentDateTime');
    if (dtElement) {
        dtElement.textContent = time + ' ' + date;
    }
}

// Listen for profile updates from other tabs
window.addEventListener('storage', function(e) {
    if (e.key === 'profilePic' || e.key === 'profilePicUpdated') {
        console.log('🔄 Profile picture changed in another tab');
        loadNavbarProfile();
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOM loaded');
    loadNavbarProfile();
    updateDateTime();
    setInterval(updateDateTime, 1000);
});

// Also run when window is fully loaded
window.addEventListener('load', function() {
    console.log('📄 Window loaded');
    loadNavbarProfile();
});

// Logout function
window.logout = function() {
    if (confirm('Are you sure you want to logout?')) {
        window.location.href = 'index.html';
    }
};