// Profile Manager Object
const ProfileManager = {
    // Default admin data from screenshot
    defaultAdmin: {
        firstName: 'raja',
        lastName: 'zoya',
        email: 'admin@company.com',
        phone: '6372145896',
        department: 'Administration',
        password: 'admin123',
        joinDate: '2024-01-01'
    },

    // Initialize
    init: function() {
        this.initStorage();
        this.loadProfileData();
        this.loadStats();
        this.setupFileUpload();
        this.startDateTime();
        this.listenForUpdates();
    },

    // Initialize localStorage with default data
    initStorage: function() {
        if (!localStorage.getItem('adminData')) {
            localStorage.setItem('adminData', JSON.stringify(this.defaultAdmin));
        }
        
        if (!localStorage.getItem('employees')) {
            const defaultEmployees = [
                { name: 'John Doe', email: 'john@company.com', department: 'IT', position: 'Developer', status: 'Active' },
                { name: 'Jane Smith', email: 'jane@company.com', department: 'HR', position: 'Manager', status: 'Active' },
                { name: 'Bob Wilson', email: 'bob@company.com', department: 'Sales', position: 'Executive', status: 'Active' }
            ];
            localStorage.setItem('employees', JSON.stringify(defaultEmployees));
        }
    },

    // ========== PROFILE PICTURE ==========
    setupFileUpload: function() {
        const fileInput = document.getElementById('fileInput');
        if (fileInput) {
            fileInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    if (!file.type.match('image.*')) {
                        this.showAlert('Please select an image file', 'error');
                        return;
                    }
                    if (file.size > 2 * 1024 * 1024) {
                        this.showAlert('File size must be less than 2MB', 'error');
                        return;
                    }
                    this.uploadPicture(file);
                }
            });
        }
    },

    uploadPicture: function(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            // Save to localStorage
            localStorage.setItem('profilePic', e.target.result);
            
            // Update profile page image
            const profilePhoto = document.getElementById('profilePhoto');
            if (profilePhoto) profilePhoto.src = e.target.result;
            
            // Update navbar image
            this.updateNavbarPicture(e.target.result);
            
            this.showAlert('Profile picture updated!', 'success');
        };
        reader.readAsDataURL(file);
    },

    updateNavbarPicture: function(picSrc) {
        const navPic = document.getElementById('navProfilePic');
        if (navPic) {
            navPic.src = picSrc;
        }
    },

    loadNavbarProfile: function() {
        const savedPic = localStorage.getItem('profilePic');
        const navPic = document.getElementById('navProfilePic');
        const userName = document.getElementById('userName');
        
        // Set profile picture
        if (navPic) {
            if (savedPic) {
                navPic.src = savedPic;
            } else {
                navPic.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35"><circle cx="17.5" cy="17.5" r="17.5" fill="%234e73df"/><text x="17.5" y="25" font-size="20" text-anchor="middle" fill="white" font-family="Arial">👤</text></svg>';
            }
        }
        
        // Set user name
        const adminData = JSON.parse(localStorage.getItem('adminData')) || this.defaultAdmin;
        if (userName) {
            userName.textContent = adminData.firstName || 'raja';
        }
    },

    // ========== PROFILE DATA ==========
    loadProfileData: function() {
        const adminData = JSON.parse(localStorage.getItem('adminData')) || this.defaultAdmin;
        
        // Update header
        document.getElementById('displayName').textContent = adminData.firstName + ' ' + adminData.lastName;
        document.getElementById('displayEmail').textContent = adminData.email;
        
        // Update view fields
        document.getElementById('viewFirstName').textContent = adminData.firstName;
        document.getElementById('viewLastName').textContent = adminData.lastName;
        document.getElementById('viewEmail').textContent = adminData.email;
        document.getElementById('viewPhone').textContent = adminData.phone;
        document.getElementById('viewDept').textContent = adminData.department;
        
        // Update edit fields
        document.getElementById('editFirstName').value = adminData.firstName;
        document.getElementById('editLastName').value = adminData.lastName;
        document.getElementById('editEmail').value = adminData.email;
        document.getElementById('editPhone').value = adminData.phone;
        document.getElementById('editDept').value = adminData.department;
        
        // Load profile picture
        const savedPic = localStorage.getItem('profilePic');
        const profilePhoto = document.getElementById('profilePhoto');
        if (profilePhoto) {
            if (savedPic) {
                profilePhoto.src = savedPic;
            } else {
                profilePhoto.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"><circle cx="60" cy="60" r="60" fill="%234e73df"/><text x="60" y="80" font-size="50" text-anchor="middle" fill="white" font-family="Arial">👤</text></svg>';
            }
        }
    },

    // ========== EDIT INFORMATION ==========
    editInfo: function() {
        document.querySelectorAll('.info-value').forEach(el => el.style.display = 'none');
        document.querySelectorAll('.edit-field').forEach(el => el.style.display = 'block');
        document.querySelector('.btn-save').style.display = 'inline-block';
        document.querySelector('.btn-cancel').style.display = 'inline-block';
        document.querySelector('.btn-edit').style.display = 'none';
    },

    saveInfo: function() {

    const firstName = document.getElementById('editFirstName').value.trim();
    const lastName = document.getElementById('editLastName').value.trim();
    const email = document.getElementById('editEmail').value.trim();
    const phone = document.getElementById('editPhone').value.trim();
    const department = document.getElementById('editDept').value.trim();

    // Regex patterns
    const namePattern = /^[A-Za-z]+$/;   // only alphabets
    const phonePattern = /^[0-9]+$/;     // only digits

    // First Name Validation
    if (!namePattern.test(firstName)) {
        this.showAlert('First name must contain only alphabets', 'error');
        return;
    }

    // Last Name Validation
    if (!namePattern.test(lastName)) {
        this.showAlert('Last name must contain only alphabets', 'error');
        return;
    }

    // Phone Validation
    if (!phonePattern.test(phone)) {
        this.showAlert('Phone number must contain only digits', 'error');
        return;
    }

    const updatedData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        department: department,
        password: this.getPassword(),
        joinDate: this.getJoinDate()
    };

    localStorage.setItem('adminData', JSON.stringify(updatedData));

    this.loadProfileData();
    this.loadNavbarProfile();
    this.cancelEdit();

    this.showAlert('Profile updated successfully!', 'success');
},

    cancelEdit: function() {
        document.querySelectorAll('.info-value').forEach(el => el.style.display = 'block');
        document.querySelectorAll('.edit-field').forEach(el => el.style.display = 'none');
        document.querySelector('.btn-save').style.display = 'none';
        document.querySelector('.btn-cancel').style.display = 'none';
        document.querySelector('.btn-edit').style.display = 'block';
        this.loadProfileData();
    },

    // ========== CHANGE PASSWORD ==========
    changePassword: function() {
        const currentPass = document.getElementById('currentPass').value;
        const newPass = document.getElementById('newPass').value;
        const confirmPass = document.getElementById('confirmPass').value;
        
        const adminData = JSON.parse(localStorage.getItem('adminData')) || this.defaultAdmin;
        const storedPass = adminData.password || 'admin123';
        
        if (!currentPass || !newPass || !confirmPass) {
            this.showAlert('Please fill all password fields', 'error');
            return;
        }
        
        if (currentPass !== storedPass) {
            this.showAlert('Current password is incorrect', 'error');
            return;
        }
        
        if (newPass !== confirmPass) {
            this.showAlert('New passwords do not match', 'error');
            return;
        }
        
        if (newPass.length < 6) {
            this.showAlert('Password must be at least 6 characters', 'error');
            return;
        }
        
        adminData.password = newPass;
        localStorage.setItem('adminData', JSON.stringify(adminData));
        
        document.getElementById('currentPass').value = '';
        document.getElementById('newPass').value = '';
        document.getElementById('confirmPass').value = '';
        
        this.showAlert('Password changed successfully!', 'success');
    },

    // ========== STATS ==========
    loadStats: function() {
        const employees = JSON.parse(localStorage.getItem('employees')) || [];
        const attendance = JSON.parse(localStorage.getItem('attendance')) || [];
        
        document.getElementById('statEmployees').textContent = employees.length; // Shows 3
        document.getElementById('statAttendance').textContent = attendance.length || 3;
        document.getElementById('statDays').textContent = '792'; // From screenshot
    },

    // ========== DATE TIME ==========
    startDateTime: function() {
        this.updateDateTime();
        setInterval(() => this.updateDateTime(), 1000);
    },

    updateDateTime: function() {
        const now = new Date();
        const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        const date = now.toLocaleDateString('en-GB');
        const dateTimeElement = document.getElementById('currentDateTime');
        if (dateTimeElement) {
            dateTimeElement.textContent = time + ' ' + date;
        }
    },

    // ========== LISTEN FOR UPDATES ==========
    listenForUpdates: function() {
        window.addEventListener('storage', (e) => {
            if (e.key === 'profilePic') {
                this.loadNavbarProfile();
            }
        });
    },

    // ========== HELPER FUNCTIONS ==========
    showAlert: function(message, type) {
        const alert = document.getElementById('alertMessage');
        if (alert) {
            alert.textContent = message;
            alert.className = 'alert ' + type;
            alert.style.display = 'block';
            
            setTimeout(() => {
                alert.style.display = 'none';
            }, 3000);
        }
    },

    getPassword: function() {
        const adminData = JSON.parse(localStorage.getItem('adminData')) || this.defaultAdmin;
        return adminData.password;
    },

    getJoinDate: function() {
        const adminData = JSON.parse(localStorage.getItem('adminData')) || this.defaultAdmin;
        return adminData.joinDate || '2024-01-01';
    },

    logout: function() {
        if (confirm('Are you sure you want to logout?')) {
            window.location.href = 'login.html';
        }
    }
};

// Make functions globally accessible
window.editInfo = () => ProfileManager.editInfo();
window.saveInfo = () => ProfileManager.saveInfo();
window.cancelEdit = () => ProfileManager.cancelEdit();
window.changePassword = () => ProfileManager.changePassword();
window.logout = () => ProfileManager.logout();