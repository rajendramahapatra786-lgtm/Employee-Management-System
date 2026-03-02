// Simple API service using localStorage
const API = {
    // Get data
    get(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    },

    // Save data
    set(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    },

    // Generate ID
    generateId() {
        return Date.now() + Math.random().toString(36).substr(2, 5);
    },

    // Get today's date
    today() {
        return new Date().toLocaleDateString();
    },

    // ===== EMPLOYEES =====
    getEmployees() {
        return this.get('employees');
    },

    getActiveEmployees() {
        const employees = this.getEmployees();
        return employees.filter(e => e.status !== 'Resigned');
    },

    getDeletedEmployees() {
        const employees = this.getEmployees();
        return employees.filter(e => e.status === 'Resigned');
    },

    // ✅ FIXED: Added missing getEmployee function
    getEmployee(id) {
        const employees = this.getEmployees();
        return employees.find(e => e.id === id);
    },

    saveEmployees(employees) {
        this.set('employees', employees);
    },

    addEmployee(emp) {
        const employees = this.getEmployees();
        const newEmp = {
            id: this.generateId(),
            ...emp,
            salary: emp.salary ? Number(emp.salary) : 0,
            status: emp.status || 'Active',
            createdAt: new Date().toLocaleString()
        };
        employees.push(newEmp);
        this.saveEmployees(employees);
        return newEmp;
    },

    updateEmployee(id, updatedData) {
        const employees = this.getEmployees();
        const index = employees.findIndex(e => e.id === id);
        if (index !== -1) {
            if(updatedData.salary) {
                updatedData.salary = Number(updatedData.salary);
            }
            employees[index] = { ...employees[index], ...updatedData };
            this.saveEmployees(employees);
            return employees[index];
        }
        return null;
    },

    deleteEmployee(id) {
        const employees = this.getEmployees();
        
        const employeeIndex = employees.findIndex(e => e.id === id);
        
        if(employeeIndex !== -1) {
            employees[employeeIndex] = {
                ...employees[employeeIndex],
                status: 'Resigned',
                resignedAt: new Date().toLocaleString()
            };
            
            this.saveEmployees(employees);
            this.addActivity('Resigned', `Employee marked as Resigned (records preserved)`);
            
            return employees;
        }
        
        return employees;
    },

    // ===== ATTENDANCE =====
    getAttendance() {
        return this.get('attendance');
    },

    saveAttendance(attendance) {
        this.set('attendance', attendance);
    },

    markAttendance(data) {
        const attendance = this.getAttendance();
        const employees = this.getEmployees();
        const emp = employees.find(e => e.id === data.employeeId);
        
        const newRecord = {
            id: this.generateId(),
            ...data,
            employeeName: emp ? emp.name : 'Unknown',
            date: this.today()
        };
        attendance.push(newRecord);
        this.saveAttendance(attendance);
        return newRecord;
    },

    getTodayAttendance() {
        const attendance = this.getAttendance();
        const employees = this.getEmployees();
        
        return attendance
            .filter(a => a.date === this.today())
            .map(a => {
                const emp = employees.find(e => e.id === a.employeeId);
                return {
                    ...a,
                    employeeName: emp ? emp.name : 'Unknown'
                };
            });
    },

    getAttendanceByDate(date) {
        const attendance = this.getAttendance();
        const employees = this.getEmployees();
        
        return attendance
            .filter(a => a.date === date)
            .map(a => {
                const emp = employees.find(e => e.id === a.employeeId);
                return {
                    ...a,
                    employeeName: emp ? emp.name : 'Unknown'
                };
            });
    },

    // ===== SALARY =====
    getSalaries() {
        return this.get('salaries');
    },

    saveSalaries(salaries) {
        this.set('salaries', salaries);
    },

    addSalary(salary) {
        const salaries = this.getSalaries();
        const employees = this.getEmployees();
        const emp = employees.find(e => e.id === salary.employeeId);
        
        const newSalary = {
            id: this.generateId(),
            ...salary,
            employeeName: emp ? emp.name : 'Unknown',
            createdAt: new Date().toLocaleString()
        };
        salaries.push(newSalary);
        this.saveSalaries(salaries);
        return newSalary;
    },

    // ===== ACTIVITIES =====
    getActivities() {
        return this.get('activities');
    },

    addActivity(action, details) {
        const activities = this.getActivities();
        const newActivity = {
            id: this.generateId(),
            action,
            details,
            time: new Date().toLocaleString()
        };
        activities.unshift(newActivity);
        if (activities.length > 20) activities.pop();
        this.set('activities', activities);
        return newActivity;
    },

    // ===== DASHBOARD STATS =====
    getStats() {
        const employees = this.getEmployees();
        const activeEmployees = employees.filter(e => e.status === 'Active');
        const attendance = this.getAttendance();
        const today = this.today();
        
        return {
            totalEmployees: activeEmployees.length,
            activeEmployees: activeEmployees.length,
            presentToday: attendance.filter(a => a.date === today).length,
            departments: [...new Set(activeEmployees.map(e => e.department))].length
        };
    },

    // Initialize sample data
    initSampleData() {
        if (this.getEmployees().length === 0) {
            const sampleEmps = [
                { id: this.generateId(), name: 'John Doe', email: 'john@company.com', department: 'IT', position: 'Developer', status: 'Active', joinDate: '2024-01-15', salary: 5000 },
                { id: this.generateId(), name: 'Jane Smith', email: 'jane@company.com', department: 'HR', position: 'Manager', status: 'Active', joinDate: '2024-02-01', salary: 6000 },
                { id: this.generateId(), name: 'Bob Wilson', email: 'bob@company.com', department: 'Sales', position: 'Executive', status: 'Active', joinDate: '2024-03-10', salary: 4500 }
            ];
            this.saveEmployees(sampleEmps);
            this.addActivity('System', 'Sample data initialized');
        }
    }
};

// Initialize
API.initSampleData();