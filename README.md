📊 Employee Management System
A complete Employee Management System built with pure HTML, CSS, and JavaScript. Uses localStorage as database - no backend required!

📋 Project Overview
This is a professional Employee Management System that allows you to:

👥 Manage employees (Add, Edit, Delete, Resign)

📅 Track daily attendance

💰 Process payroll and manage salaries

📊 View dashboard with statistics

🎯 Mark employees as "Resigned" (records preserved)

🗑️ Clean up old records

🏗️ Project Structure
text
employee-management-system/
│
├── 📄 index.html              # Login page
├── 📄 dashboard.html          # Main dashboard
├── 📄 employees.html          # Employee management
├── 📄 attendance.html         # Attendance tracking
├── 📄 salary.html             # Salary management
│
├── 📁 css/
│   ├── 📄 style.css           # Main stylesheet
│   └── 📄 responsive.css      # Mobile responsive
│
├── 📁 js/
│   ├── 📄 api.js              # Data service (localStorage)
│   ├── 📄 main.js             # Loads navbar/sidebar
│   ├── 📄 login.js            # Login functionality
│   ├── 📄 dashboard.js        # Dashboard stats
│   ├── 📄 employees.js        # Employee CRUD
│   ├── 📄 attendance.js       # Attendance functions
│   └── 📄 salary.js           # Payroll functions
│
├── 📁 components/
│   ├── 📄 navbar.html         # Top navigation bar
│   └── 📄 sidebar.html        # Side menu
│
└── 📁 assets/
    └── 📁 images/              # (Optional) Profile pictures
✨ Features
🔐 Login System
Simple authentication

Demo credentials: admin / admin123

Session management with localStorage

📊 Dashboard
Total employees count

Active employees

Today's attendance

Department distribution

Recent activities log

👥 Employee Management
Add Employee - With name, email, department, position, salary

Edit Employee - Update any information

Resign Employee - Mark as resigned (moves to resigned list)

Delete Employee - Permanently remove (with warning if has records)

📅 Attendance Tracking
Mark daily attendance (Present, Absent, Late, Leave)

View today's attendance

Resigned employees shown in RED

Deleted employees shown in ORANGE

Delete individual attendance records

💰 Salary Management
Process monthly payroll

Uses employee's actual salary (set in employee record)

View all salary history

Resigned/deleted employees highlighted

Indian Rupee (₹) symbol throughout

Clean up unknown records

🎯 Special Features
Resigned Employees - Mark as resigned (not deleted)

Records Preservation - Resigned employees' history stays visible (in red)

Cleanup Functions - Remove records for deleted employees

Data Validation - Prevents duplicate emails

Activity Log - Tracks all actions

🚀 How to Use
1. Login
Open index.html

Use: admin / admin123

2. Add Employees
Go to Employees page

Click "Add Employee"

Fill details (including salary in ₹)

Click Save

3. Mark Attendance
Go to Attendance page

Click "Mark Attendance"

Select employee and status

Save

4. Process Payroll
Go to Salary page

Click "Process Payroll"

Confirms and creates salary records