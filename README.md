📊 Employee Management System

A complete Employee Management System built using pure HTML, CSS, and JavaScript.
This project uses localStorage as a database, so no backend is required.

Perfect for learning frontend development, CRUD operations, and browser storage.

📋 Project Overview

This system allows you to manage employees and their records efficiently.

Main capabilities:

👥 Employee Management (Add, Edit, Delete, Resign)

📅 Attendance Tracking

💰 Payroll Processing

📊 Dashboard Statistics

🎯 Resigned Employee Management

🗑️ Data Cleanup Tools

🏗️ Project Structure
employee-management-system/

├── index.html               # Login Page
├── dashboard.html           # Main Dashboard
├── employees.html           # Employee Management
├── attendance.html          # Attendance Tracking
├── salary.html              # Salary Management

├── css/
│   ├── style.css            # Main Styling
│   └── responsive.css       # Mobile Responsive Design

├── js/
│   ├── api.js               # Data service (localStorage)
│   ├── main.js              # Navbar & sidebar loader
│   ├── login.js             # Login system
│   ├── dashboard.js         # Dashboard statistics
│   ├── employees.js         # Employee CRUD operations
│   ├── attendance.js        # Attendance management
│   └── salary.js            # Payroll processing

├── components/
│   ├── navbar.html          # Top navigation bar
│   └── sidebar.html         # Sidebar menu

└── assets/
    └── images/              # Optional employee profile images
✨ Features
🔐 Login System

Simple authentication system

Demo credentials:

Username: admin
Password: admin123

Session management using localStorage

📊 Dashboard

The dashboard provides quick insights:

Total employees count

Active employees

Today's attendance summary

Department distribution

Recent activity logs

👥 Employee Management

Manage employees with full CRUD operations.

Add Employee

Store employee information including:

Name

Email

Department

Position

Salary

Edit Employee

Update any employee information.

Resign Employee

Mark an employee as Resigned without deleting their records.

Delete Employee

Remove employee permanently
(with warning if records exist).

📅 Attendance Tracking

Track daily attendance status.

Attendance types include:

Present

Absent

Late

Leave

Additional features:

View today's attendance

Delete individual attendance records

Resigned employees highlighted in RED

Deleted employees highlighted in ORANGE

💰 Salary Management

Payroll processing based on employee salary records.

Features include:

Monthly payroll processing

Automatic salary retrieval from employee records

Full salary history tracking

Indian Rupee (₹) currency support

Highlight resigned/deleted employees

Cleanup unknown salary records

🎯 Special Features
Resigned Employees

Employees can be marked as resigned instead of deleted.

Records Preservation

All historical records remain visible even after resignation.

Cleanup Tools

Automatically remove records for deleted employees.

Data Validation

Prevents duplicate employee emails.

Activity Logs

Tracks important actions within the system.

🚀 How to Use
1️⃣ Login

Open:

index.html

Login credentials:

admin / admin123
2️⃣ Add Employees

Go to Employees Page

Click Add Employee

Fill in employee details

Click Save

3️⃣ Mark Attendance

Go to Attendance Page

Click Mark Attendance

Select employee and status

Save the record

4️⃣ Process Payroll

Go to Salary Page

Click Process Payroll

Confirm payroll generation

🛠️ Technologies Used

HTML5

CSS3

JavaScript (Vanilla JS)

LocalStorage (Browser Database)

Font Awesome Icons

📌 Future Improvements

Possible enhancements:

Backend integration (Node.js / PHP)

Database support (MySQL / MongoDB)

Employee profile pictures

Export reports (PDF / Excel)

Role-based authentication

👨‍💻 Author

Rajendra