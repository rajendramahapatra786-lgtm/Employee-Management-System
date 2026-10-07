# 📊 Employee Management System

A modern, browser-based **Employee Management System** built with
**HTML5, CSS3, and Vanilla JavaScript**.

The application provides a complete frontend workflow for managing
employees, attendance, salaries, dashboard statistics, activity logs,
and employee status. Data is stored locally in the browser using
**LocalStorage**, So no backend server or database is required.

> **Project Type:** Frontend Web Application\
> **Storage:** Browser LocalStorage\
> **Backend:** None\
> **Authentication:** Demo frontend authentication

------------------------------------------------------------------------

## ✨ Features

### 🔐 Login System

-   Admin login page
-   Demo authentication using LocalStorage
-   Current-user session storage
-   Password visibility toggle
-   Invalid-login handling

**Demo Credentials**

``` text
Username: admin
Password: admin123
```

### 📊 Dashboard

The dashboard provides an overview of the organization, including:

-   Total active employees
-   Active employee count
-   Today's attendance
-   Department statistics
-   Recent activity logs
-   Quick access to major management sections

### 👥 Employee Management

Manage employee records through a simple CRUD-style interface.

-   Add employees
-   Edit employee details
-   View employee information
-   Delete/resign employees
-   Store department and position
-   Store salary information
-   Store joining date
-   Prevent duplicate employee emails
-   Preserve records of resigned employees

### 📅 Attendance Management

Track employee attendance with daily records.

Supported attendance statuses include:

-   Present
-   Absent
-   Late
-   Leave

Additional functionality:

-   Mark attendance
-   View today's attendance
-   View attendance by date
-   Delete attendance records
-   Display employee names from stored employee records
-   Handle resigned/deleted employee records

### 💰 Salary & Payroll Management

Manage employee salary records and payroll information.

-   Process monthly payroll
-   Retrieve employee salary information
-   Store salary history
-   Display salary using Indian Rupee (₹)
-   Preserve salary records
-   Handle records belonging to resigned employees
-   Cleanup support for unknown employee salary records

### 🎯 Activity Logs

The system records important actions such as employee status changes.

-   Stores recent activities
-   Keeps the latest activity records
-   Displays activity time
-   Maintains a maximum recent activity history

### 📱 Responsive Design

The project includes responsive CSS for different screen sizes.

-   Desktop
-   Tablet
-   Mobile
-   Responsive navigation/sidebar
-   Responsive dashboard components
-   Mobile-friendly employee and salary interfaces

------------------------------------------------------------------------

## 🛠️ Technologies Used

  Technology                 Purpose
  -------------------------- -----------------------------------------------------
  **HTML5**                  Page structure and semantic markup
  **CSS3**                   Styling, layouts, animations, and responsive design
  **JavaScript (ES6+)**      Application logic and interactivity
  **LocalStorage API**       Client-side data persistence
  **Font Awesome / Icons**   UI icons
  **Git & GitHub**           Version control

------------------------------------------------------------------------

## 📂 Project Structure

``` text
Employee-Management-System/
│
├── index.html
├── dashboard.html
├── employees.html
├── attendance.html
├── salary.html
├── profile.html
│
├── components/
│   ├── navbar.html
│   └── sidebar.html
│
├── css/
│   ├── style.css
│   ├── dashboard.css
│   ├── profile.css
│   └── responsive.css
│
├── js/
│   ├── api.js
│   ├── main.js
│   ├── login.js
│   ├── navbar.js
│   ├── dashboard.js
│   ├── employees.js
│   ├── attendance.js
│   ├── salary.js
│   └── profile.js
│
└── README.md
```

------------------------------------------------------------------------

## 📄 Main Pages

### `index.html`

Login page for accessing the employee management dashboard.

### `dashboard.html`

Main dashboard containing employee and attendance statistics, department
information, and recent activities.

### `employees.html`

Employee management page for adding, editing, resigning, and managing
employee records.

### `attendance.html`

Attendance management page for recording and viewing employee
attendance.

### `salary.html`

Salary and payroll management page.

### `profile.html`

User/profile interface for managing profile-related information.

------------------------------------------------------------------------

## ⚙️ How the Application Works

This project does not use a traditional backend API.

Instead, application data is stored inside the browser using
**LocalStorage**.

The central data service is implemented in:

``` text
js/api.js
```

It provides reusable functions for:

``` javascript
API.get()
API.set()
API.getEmployees()
API.addEmployee()
API.updateEmployee()
API.deleteEmployee()
API.getAttendance()
API.markAttendance()
API.getSalaries()
API.addSalary()
API.addActivity()
API.getStats()
```

This makes the project easy to run locally without installing a database
or backend framework.

------------------------------------------------------------------------

## 🚀 Getting Started

### 1. Clone the Repository

``` bash
git clone https://github.com/your-username/Employee-Management-System.git
```

### 2. Open the Project

``` bash
cd Employee-Management-System
```

### 3. Run the Application

Because this is a frontend project, you can open:

``` text
index.html
```

directly in your browser.

### Recommended

For the best development experience, use **VS Code Live Server**.

1.  Open the project in VS Code.
2.  Install the **Live Server** extension.
3.  Right-click `index.html`.
4.  Select **Open with Live Server**.
5.  Login using the demo credentials.

------------------------------------------------------------------------

## 🔑 Demo Login

``` text
Username: admin
Password: admin123
```

> ⚠️ This is a frontend demo authentication system. The credentials are
> stored directly in JavaScript and are **not suitable for production
> authentication**.

------------------------------------------------------------------------

## 💾 Data Storage

The application uses the browser's LocalStorage.

Typical stored data includes:

``` text
employees
attendance
salaries
activities
isLoggedIn
currentUser
```

Because the data is stored locally:

-   Data remains after refreshing the page.
-   Data is specific to the browser/device.
-   Clearing browser storage removes the application data.
-   Data is not automatically synchronized between devices.

------------------------------------------------------------------------

## 🧪 Example Workflow

### Step 1 --- Login

Open the application and log in:

``` text
admin / admin123
```

### Step 2 --- Add an Employee

Navigate to **Employees** → **Add Employee**.

Enter information such as:

``` text
Name
Email
Department
Position
Salary
Join Date
```

Save the employee.

### Step 3 --- Track Attendance

Navigate to **Attendance**.

Select an employee and mark:

``` text
Present
Absent
Late
Leave
```

### Step 4 --- Process Salary

Navigate to **Salary** and process the employee's monthly
salary/payroll.

### Step 5 --- Monitor Dashboard

Return to the dashboard to view updated:

-   Employee statistics
-   Attendance information
-   Department statistics
-   Recent activities

------------------------------------------------------------------------

## 🧠 Important Design Concept

The project separates application responsibilities into different
JavaScript files.

For example:

``` text
api.js
   ↓
Central LocalStorage data service

employees.js
   ↓
Employee management logic

attendance.js
   ↓
Attendance logic

salary.js
   ↓
Payroll logic

dashboard.js
   ↓
Dashboard statistics

login.js
   ↓
Authentication logic
```

This modular structure makes the application easier to maintain and
extend.

------------------------------------------------------------------------

## 🔒 Security Note

This project is designed primarily as a **frontend learning/demo
application**.

It should not be used as a production employee-management system without
a secure backend.

For production use, authentication and employee data should be handled
by a server with:

-   Password hashing
-   Secure sessions or JWT
-   Role-based access control
-   Server-side validation
-   Database security
-   HTTPS
-   API authorization
-   Audit logging

------------------------------------------------------------------------

## 🔮 Future Improvements

Possible improvements include:

-   [ ] Backend integration with Django, Node.js, or PHP
-   [ ] MySQL/PostgreSQL/MongoDB database
-   [ ] Secure user authentication
-   [ ] Admin and employee roles
-   [ ] Employee profile photo upload
-   [ ] Search and advanced filtering
-   [ ] Pagination
-   [ ] Attendance reports
-   [ ] Salary slip generation
-   [ ] PDF export
-   [ ] Excel/CSV export
-   [ ] Email notifications
-   [ ] Cloud database integration
-   [ ] REST API
-   [ ] Dark/light theme customization

------------------------------------------------------------------------

## 🎓 Learning Outcomes

This project demonstrates practical frontend development concepts such
as:

-   DOM manipulation
-   JavaScript event handling
-   CRUD operations
-   LocalStorage
-   Form handling
-   Data validation
-   Dynamic HTML rendering
-   Modular JavaScript
-   Responsive web design
-   Dashboard UI development
-   Client-side authentication concepts
-   Data persistence
-   Basic application architecture

------------------------------------------------------------------------

## 🐛 Troubleshooting

### Data is not updating

Open the browser Developer Tools and check:

``` text
Application → Local Storage
```

Make sure LocalStorage is enabled.

### Login is not working

Use:

``` text
Username: admin
Password: admin123
```

### Data disappeared

The application stores data in browser LocalStorage. If browser storage
was cleared, the saved application data may be lost.

### Pages are not loading correctly

Run the project through **VS Code Live Server** instead of opening files
directly.

------------------------------------------------------------------------

## 📸 Screenshots

Add project screenshots here:

``` markdown
![Login Page](screenshots/login.png)

![Dashboard](screenshots/dashboard.png)

![Employee Management](screenshots/employees.png)

![Attendance](screenshots/attendance.png)

![Salary Management](screenshots/salary.png)
```

Create a `screenshots/` folder and place your screenshots inside it.

------------------------------------------------------------------------

## 📌 Project Status

**Status:** ✅ Completed Frontend Project

The current version includes employee management, attendance tracking,
salary management, dashboard statistics, profile functionality,
LocalStorage persistence, activity logging, and responsive UI.

------------------------------------------------------------------------

## 👨‍💻 Author

**Rajendra Mahapatra**

B.Tech --- Computer Science & Engineering

Interested in:

-   Python
-   JavaScript
-   Web Development
-   Frontend Development
-   Full-Stack Development

------------------------------------------------------------------------

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on
GitHub.

------------------------------------------------------------------------

