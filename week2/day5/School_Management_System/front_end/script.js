// Global variables
let currentPage = 'dashboard';
let currentEntity = '';
let currentData = [];
let filteredData = [];
let searchTerm = '';
let paginationPage = 1;
let itemsPerPage = 6;
let currentItemId = null;

// Form field definitions
const formFields = {
    students: [
        { name: 'name', label: 'Full Name', type: 'text', required: true },
        { name: 'email', label: 'Email', type: 'email', required: true },
        { name: 'phone', label: 'Phone', type: 'text', required: true },
        { name: 'grade', label: 'Grade Level', type: 'select', required: true, options: [
            { value: 'Grade 9', label: 'Grade 9' },
            { value: 'Grade 10', label: 'Grade 10' },
            { value: 'Grade 11', label: 'Grade 11' },
            { value: 'Grade 12', label: 'Grade 12' }
        ]},
        { name: 'dateOfBirth', label: 'Date of Birth', type: 'date', required: true },
        { name: 'address', label: 'Address', type: 'text', required: true }
    ],
    teachers: [
        { name: 'name', label: 'Full Name', type: 'text', required: true },
        { name: 'email', label: 'Email', type: 'email', required: true },
        { name: 'phone', label: 'Phone', type: 'text', required: true },
        { name: 'subject', label: 'Subject', type: 'text', required: true },
        { name: 'experience', label: 'Years of Experience', type: 'text', required: true },
        { name: 'department', label: 'Department', type: 'select', required: true, options: [
            { value: 'Science & Math', label: 'Science & Math' },
            { value: 'Language Arts', label: 'Language Arts' },
            { value: 'Social Studies', label: 'Social Studies' },
            { value: 'Fine Arts', label: 'Fine Arts' },
            { value: 'Physical Education', label: 'Physical Education' }
        ]}
    ],
    courses: [
        { name: 'title', label: 'Course Title', type: 'text', required: true },
        { name: 'code', label: 'Course Code', type: 'text', required: true },
        { name: 'teacher', label: 'Teacher', type: 'text', required: true },
        { name: 'students', label: 'Number of Students', type: 'number', required: true },
        { name: 'schedule', label: 'Schedule', type: 'text', required: true },
        { name: 'description', label: 'Description', type: 'text', required: true }
    ],
    grades: [
        { name: 'student', label: 'Student', type: 'text', required: true },
        { name: 'course', label: 'Course', type: 'text', required: true },
        { name: 'grade', label: 'Letter Grade', type: 'select', required: true, options: [
            { value: 'A+', label: 'A+' },
            { value: 'A', label: 'A' },
            { value: 'A-', label: 'A-' },
            { value: 'B+', label: 'B+' },
            { value: 'B', label: 'B' },
            { value: 'B-', label: 'B-' },
            { value: 'C+', label: 'C+' },
            { value: 'C', label: 'C' },
            { value: 'C-', label: 'C-' },
            { value: 'D+', label: 'D+' },
            { value: 'D', label: 'D' },
            { value: 'F', label: 'F' }
        ]},
        { name: 'score', label: 'Numeric Score', type: 'number', required: true },
        { name: 'date', label: 'Date', type: 'date', required: true },
        { name: 'type', label: 'Assignment Type', type: 'select', required: true, options: [
            { value: 'Quiz', label: 'Quiz' },
            { value: 'Midterm Exam', label: 'Midterm Exam' },
            { value: 'Final Exam', label: 'Final Exam' },
            { value: 'Assignment', label: 'Assignment' },
            { value: 'Project', label: 'Project' },
            { value: 'Lab Report', label: 'Lab Report' },
            { value: 'Essay Assignment', label: 'Essay Assignment' },
            { value: 'Research Paper', label: 'Research Paper' },
            { value: 'Portfolio Review', label: 'Portfolio Review' },
            { value: 'Fitness Test', label: 'Fitness Test' }
        ]}
    ]
};

// Table column definitions
const tableColumns = {
    students: [
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'phone', label: 'Phone' },
        { key: 'grade', label: 'Grade' }
    ],
    teachers: [
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'subject', label: 'Subject' },
        { key: 'department', label: 'Department' }
    ],
    courses: [
        { key: 'title', label: 'Course Title' },
        { key: 'code', label: 'Code' },
        { key: 'teacher', label: 'Teacher' },
        { key: 'students', label: 'Students' }
    ],
    grades: [
        { key: 'student', label: 'Student' },
        { key: 'course', label: 'Course' },
        { key: 'grade', label: 'Grade' },
        { key: 'score', label: 'Score' }
    ]
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
    showPage('dashboard');
    initializeCharts();

    // Auth buttons
    document.getElementById('logoutButton').addEventListener('click', handleLogout);
    document.getElementById('loginButton').addEventListener('click', () => showPage('login'));
    document.getElementById('registerButton').addEventListener('click', () => showPage('register'));

    // Auth form submissions
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        handleAuthFormSubmit('login', e.target);
    });

    document.getElementById('registerForm').addEventListener('submit', (e) => {
        e.preventDefault();
        handleAuthFormSubmit('register', e.target);
    });
});

// --- Authentication --- //

let isLoggedIn = false;

async function checkLoginStatus() {
    try {
        const response = await fetch('http://localhost:5001/@me', { credentials: 'include' });
        if (response.ok) {
            isLoggedIn = true;
            const user = await response.json();
            updateUIAfterLogin(user.email);
        } else {
            isLoggedIn = false;
            updateUIAfterLogout();
        }
    } catch (error) {
        console.error('Error checking login status:', error);
        isLoggedIn = false;
        updateUIAfterLogout();
    }
}

function updateUIAfterLogin(email) {
    document.getElementById('authButtons').classList.add('hidden');
    document.getElementById('user-menu').classList.remove('hidden');
    document.getElementById('user-email').textContent = email;
    document.getElementById('addButton').classList.remove('hidden');
}

function updateUIAfterLogout() {
    document.getElementById('authButtons').classList.remove('hidden');
    document.getElementById('user-menu').classList.add('hidden');
    document.getElementById('addButton').classList.add('hidden');
    document.querySelectorAll('.edit-button, .delete-button').forEach(btn => btn.classList.add('hidden'));
}

async function handleAuthFormSubmit(type, form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const url = `http://localhost:5001/${type}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            credentials: 'include'
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Authentication failed');
        }

        if (type === 'login') {
            isLoggedIn = true;
            updateUIAfterLogin(result.user.email);
            showPage('dashboard');
        } else {
            showFlashMessage('success', 'Registration successful! Please log in.');
            showPage('login');
        }

    } catch (error) {
        console.error(`Error during ${type}:`, error);
        showFlashMessage('error', error.message);
    }
}

async function handleLogout() {
    try {
        const response = await fetch('http://localhost:5001/logout', { credentials: 'include' });
        if (response.ok) {
            isLoggedIn = false;
            updateUIAfterLogout();
            showPage('dashboard');
            showFlashMessage('success', 'You have been logged out.');
        } else {
            throw new Error('Logout failed');
        }
    } catch (error) {
        console.error('Error during logout:', error);
        showFlashMessage('error', error.message);
    }
}

// Navigation functions
function showPage(page) {
    // Hide all pages
    document.querySelectorAll('.page-content').forEach(el => el.classList.add('hidden'));
    
    // Update navigation
    updateNavigation(page);
    
    currentPage = page;
    
    if (page === 'dashboard') {
        document.getElementById('dashboardPage').classList.remove('hidden');
        updateDashboardStats();
        initializeCharts();
    } else if (page === 'login' || page === 'register') {
        document.getElementById(`${page}Page`).classList.remove('hidden');
    } else {
        currentEntity = page;
        showListPage(page);
    }
    
    // Close mobile menu
    closeMobileMenu();
}

function updateNavigation(activePage) {
    // Desktop navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('border-indigo-500', 'text-indigo-600');
        link.classList.add('border-transparent', 'text-gray-500');
    });
    
    // Mobile navigation
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.classList.remove('bg-indigo-50', 'text-indigo-600');
        link.classList.add('text-gray-500');
    });
    
    // Find and activate current page link
    const activeLinks = document.querySelectorAll(`[onclick="showPage('${activePage}')"]`);
    activeLinks.forEach(link => {
        if (link.classList.contains('nav-link')) {
            link.classList.remove('border-transparent', 'text-gray-500');
            link.classList.add('border-indigo-500', 'text-indigo-600');
        } else if (link.classList.contains('mobile-nav-link')) {
            link.classList.remove('text-gray-500');
            link.classList.add('bg-indigo-50', 'text-indigo-600');
        }
    });
}

async function showListPage(entity) {
    document.getElementById('listPage').classList.remove('hidden');
    
    const entityLabel = entity.charAt(0).toUpperCase() + entity.slice(1);
    document.getElementById('listPageTitle').textContent = entityLabel;
    document.getElementById('addButtonText').textContent = `Add ${entityLabel.slice(0, -1)}`;
    
    try {
        const response = await fetch(`http://localhost:5001/${entity}`);
        currentData = await response.json();
        filteredData = currentData.slice();
        paginationPage = 1;
        
        renderTable();
        renderPagination();
    } catch (error) {
        console.error('Error fetching data:', error);
        showFlashMessage('error', 'Failed to load data from the server.');
    }
}

function showCreateForm() {
    document.getElementById('listPage').classList.add('hidden');
    document.getElementById('createPage').classList.remove('hidden');
    
    const entityLabel = currentEntity.charAt(0).toUpperCase() + currentEntity.slice(0, -1);
    document.getElementById('createPageTitle').textContent = `Add New ${entityLabel}`;
    
    renderForm('create');
}

function showEditForm(id) {
    const item = currentData.find(item => item.id == id);
    if (!item) return;
    
    document.getElementById('listPage').classList.add('hidden');
    document.getElementById('editPage').classList.remove('hidden');
    
    const entityLabel = currentEntity.charAt(0).toUpperCase() + currentEntity.slice(0, -1);
    document.getElementById('editPageTitle').textContent = `Edit ${entityLabel}`;
    
    currentItemId = id;
    renderForm('edit', item);
}

function showDetailsPage(id) {
    const item = currentData.find(item => item.id == id);
    if (!item) return;
    
    document.getElementById('listPage').classList.add('hidden');
    document.getElementById('detailsPage').classList.remove('hidden');
    
    currentItemId = id;
    renderDetails(item);
}

function goBack() {
    document.getElementById('createPage').classList.add('hidden');
    document.getElementById('editPage').classList.add('hidden');
    document.getElementById('detailsPage').classList.add('hidden');
    document.getElementById('listPage').classList.remove('hidden');
}

// Mobile menu functions
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    const icon = document.getElementById('mobileMenuIcon');
    
    menu.classList.toggle('hidden');
    
    if (menu.classList.contains('hidden')) {
        icon.className = 'bi bi-list text-xl';
    } else {
        icon.className = 'bi bi-x text-xl';
    }
}

function closeMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    const icon = document.getElementById('mobileMenuIcon');
    
    menu.classList.add('hidden');
    icon.className = 'bi bi-list text-xl';
}

// Search function
function handleSearch(term) {
    searchTerm = term.toLowerCase();
    
    if (currentPage === 'dashboard') return;
    
    if (searchTerm === '') {
        filteredData = currentData.slice();
    } else {
        filteredData = currentData.filter(item =>
            Object.values(item).some(value =>
                String(value).toLowerCase().includes(searchTerm)
            )
        );
    }
    
    paginationPage = 1;
    renderTable();
    renderPagination();
}

// Table rendering
function renderTable() {
    const header = document.getElementById('tableHeader');
    const body = document.getElementById('tableBody');
    const noResults = document.getElementById('noResults');
    
    const columns = tableColumns[currentEntity] || [];
    
    // Render header
    header.innerHTML = `
        <tr>
            ${columns.map(col => `<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${col.label}</th>`).join('')}
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
        </tr>
    `;
    
    // Calculate pagination
    const startIndex = (paginationPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = filteredData.slice(startIndex, endIndex);
    
    if (pageData.length === 0) {
        body.innerHTML = '';
        noResults.classList.remove('hidden');
        return;
    }
    
    noResults.classList.add('hidden');
    
    // Render rows
    body.innerHTML = pageData.map((item, index) => `
        <tr class="${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}">
            ${columns.map(col => `<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item[col.key] || ''}</td>`).join('')}
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex justify-end space-x-2">
                    <button onclick="showDetailsPage(${item.id})" class="text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-indigo-100 transition-colors duration-200" title="View">
                        <i class="bi bi-eye"></i>
                    </button>
                    <button onclick="showEditForm(${item.id})" class="text-yellow-600 hover:text-yellow-900 p-1 rounded hover:bg-yellow-100 transition-colors duration-200" title="Edit">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button onclick="showDeleteConfirmation(${item.id}, '${item.name || item.title || item.student}')" class="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-100 transition-colors duration-200" title="Delete">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Pagination rendering
function renderPagination() {
    const pagination = document.getElementById('pagination');
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    
    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }
    
    const startIndex = (paginationPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);
    
    pagination.innerHTML = `
        <div class="flex-1 flex justify-between sm:hidden">
            <button onclick="changePage(${Math.max(1, paginationPage - 1)})" ${paginationPage === 1 ? 'disabled' : ''} class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                Previous
            </button>
            <button onclick="changePage(${Math.min(totalPages, paginationPage + 1)})" ${paginationPage === totalPages ? 'disabled' : ''} class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                Next
            </button>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
                <p class="text-sm text-gray-700">
                    Showing <span class="font-medium">${Math.min(startIndex + 1, filteredData.length)}</span>
                    to <span class="font-medium">${endIndex}</span>
                    of <span class="font-medium">${filteredData.length}</span> results
                </p>
            </div>
            <div>
                <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                    <button onclick="changePage(${Math.max(1, paginationPage - 1)})" ${paginationPage === 1 ? 'disabled' : ''} class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                        <i class="bi bi-chevron-left"></i>
                    </button>
                    ${Array.from({length: totalPages}, (_, i) => i + 1).map(page => `
                        <button onclick="changePage(${page})" class="relative inline-flex items-center px-4 py-2 border text-sm font-medium ${page === paginationPage ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'}">
                            ${page}
                        </button>
                    `).join('')}
                    <button onclick="changePage(${Math.min(totalPages, paginationPage + 1)})" ${paginationPage === totalPages ? 'disabled' : ''} class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                        <i class="bi bi-chevron-right"></i>
                    </button>
                </nav>
            </div>
        </div>
    `;
}

function changePage(page) {
    paginationPage = page;
    renderTable();
    renderPagination();
}

// Form rendering
function renderForm(type, data = null) {
    const container = document.getElementById(type + 'FormFields');
    const fields = formFields[currentEntity] || [];
    
    container.innerHTML = fields.map(field => {
        const value = data ? (data[field.name] || '') : '';
        const colSpan = field.name === 'address' || field.name === 'description' ? 'sm:col-span-2' : '';
        
        let inputHtml = '';
        
        if (field.type === 'select') {
            inputHtml = `
                <select name="${field.name}" ${field.required ? 'required' : ''} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                    <option value="">Select ${field.label}</option>
                    ${field.options.map(option => `
                        <option value="${option.value}" ${value === option.value ? 'selected' : ''}>${option.label}</option>
                    `).join('')}
                </select>
            `;
        } else if (field.name === 'address' || field.name === 'description') {
            inputHtml = `
                <textarea name="${field.name}" ${field.required ? 'required' : ''} rows="3" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="Enter ${field.label.toLowerCase()}">${value}</textarea>
            `;
        } else {
            inputHtml = `
                <input type="${field.type}" name="${field.name}" value="${value}" ${field.required ? 'required' : ''} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="Enter ${field.label.toLowerCase()}">
            `;
        }
        
        return `
            <div class="${colSpan}">
                <label for="${field.name}" class="block text-sm font-medium text-gray-700">
                    ${field.label}
                    ${field.required ? '<span class="text-red-500">*</span>' : ''}
                </label>
                ${inputHtml}
                <div class="error-message text-red-500 text-sm mt-1 hidden"></div>
            </div>
        `;
    }).join('');
    
    // Add form submit handlers
    const form = document.getElementById(type + 'Form');
    form.onsubmit = function(e) {
        e.preventDefault();
        handleFormSubmit(type, form);
    };
}

async function handleFormSubmit(type, form) {
    const formData = new FormData(form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    const fields = formFields[currentEntity] || [];
    let isValid = true;
    
    fields.forEach(field => {
        const errorElement = form.querySelector(`[name="${field.name}"]`).parentNode.querySelector('.error-message');
        errorElement.classList.add('hidden');
        
        if (field.required && !data[field.name]) {
            errorElement.textContent = `${field.label} is required`;
            errorElement.classList.remove('hidden');
            isValid = false;
        }
        
        if (field.type === 'email' && data[field.name] && !/\S+@\S+\.\S+/.test(data[field.name])) {
            errorElement.textContent = 'Please enter a valid email address';
            errorElement.classList.remove('hidden');
            isValid = false;
        }
    });
    
    if (!isValid) return;
    
    const url = type === 'create' ? `http://localhost:5001/${currentEntity}` : `http://localhost:5001/${currentEntity}/${currentItemId}`;
    const method = type === 'create' ? 'POST' : 'PUT';
    
    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        
        if (!response.ok) {
            throw new Error('Server responded with an error!');
        }
        
        const result = await response.json();
        showFlashMessage('success', result.message);
        
        form.reset();
        goBack();
        showListPage(currentEntity);
    } catch (error) {
        console.error('Error submitting form:', error);
        showFlashMessage('error', 'Failed to save data.');
    }
}

// Details rendering
function renderDetails(item) {
    const entityLabel = currentEntity.charAt(0).toUpperCase() + currentEntity.slice(0, -1);
    document.getElementById('detailsPageTitle').textContent = `${entityLabel} Details`;
    document.getElementById('detailsName').textContent = item.name || item.title || item.student || 'Item';
    
    const content = document.getElementById('detailsContent');
    const fields = formFields[currentEntity] || [];
    
    content.innerHTML = `
        <dl class="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            ${fields.map(field => `
                <div>
                    <dt class="text-sm font-medium text-gray-500">${field.label}</dt>
                    <dd class="mt-1 text-sm text-gray-900">${item[field.name] || 'N/A'}</dd>
                </div>
            `).join('')}
        </dl>
    `;
}

// Delete functions
function showDeleteConfirmation(id, name) {
    currentItemId = id;
    document.getElementById('confirmMessage').textContent = `Are you sure you want to delete "${name}"? This action cannot be undone.`;
    document.getElementById('confirmModal').classList.remove('hidden');
    
    deleteCallback = () => deleteItem(id);
}

function closeConfirmModal() {
    document.getElementById('confirmModal').classList.add('hidden');
    currentItemId = null;
    deleteCallback = null;
}

function confirmDelete() {
    if (deleteCallback) {
        deleteCallback();
    }
    closeConfirmModal();
}

async function deleteItem(id) {
    const url = `http://localhost:5001/${currentEntity}/${id}`;
    
    try {
        const response = await fetch(url, {
            method: 'DELETE',
        });
        
        if (!response.ok) {
            throw new Error('Server responded with an error!');
        }
        
        const result = await response.json();
        showFlashMessage('success', result.message);
        
        showListPage(currentEntity);
        
        if (!document.getElementById('detailsPage').classList.contains('hidden')) {
            goBack();
        }
    } catch (error) {
        console.error('Error deleting item:', error);
        showFlashMessage('error', 'Failed to delete item.');
    }
}

function editCurrentItem() {
    if (currentItemId) {
        showEditForm(currentItemId);
    }
}

function deleteCurrentItem() {
    if (currentItemId) {
        const item = currentData.find(item => item.id == currentItemId);
        if (item) {
            showDeleteConfirmation(currentItemId, item.name || item.title || item.student);
        }
    }
}

// Flash message functions
function showFlashMessage(type, message) {
    const container = document.getElementById('flashMessages');
    const id = 'flash-' + Date.now();
    
    const alertClass = type === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
                     type === 'error' ? 'bg-red-50 border-red-200 text-red-800' :
                     'bg-yellow-50 border-yellow-200 text-yellow-800';
    
    const iconClass = type === 'success' ? 'bi bi-check-circle-fill text-green-400' :
                     type === 'error' ? 'bi bi-x-circle-fill text-red-400' :
                     'bi bi-exclamation-triangle-fill text-yellow-400';
    
    container.innerHTML = `
        <div id="${id}" class="${alertClass} border rounded-md p-4 mb-6">
            <div class="flex">
                <div class="flex-shrink-0">
                    <i class="${iconClass}"></i>
                </div>
                <div class="ml-3">
                    <p class="text-sm font-medium">${message}</p>
                </div>
                <div class="ml-auto pl-3">
                    <button onclick="removeFlashMessage('${id}')" class="hover:opacity-75">
                        <i class="bi bi-x text-sm"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Auto-remove after 5 seconds
    setTimeout(() => removeFlashMessage(id), 5000);
}

function removeFlashMessage(id) {
    const element = document.getElementById(id);
    if (element) {
        element.remove();
    }
}

// Dashboard functions
async function updateDashboardStats() {
    try {
        const [studentsRes, teachersRes, coursesRes, gradesRes] = await Promise.all([
            fetch('http://localhost:5001/students'),
            fetch('http://localhost:5001/teachers'),
            fetch('http://localhost:5001/courses'),
            fetch('http://localhost:5001/grades')
        ]);

        const students = await studentsRes.json();
        const teachers = await teachersRes.json();
        const courses = await coursesRes.json();
        const grades = await gradesRes.json();

        document.getElementById('totalStudents').textContent = students.length;
        document.getElementById('totalTeachers').textContent = teachers.length;
        document.getElementById('totalCourses').textContent = courses.length;

        if (grades.length > 0) {
            const avgScore = grades.reduce((sum, grade) => sum + grade.score, 0) / grades.length;
            document.getElementById('averageGrade').textContent = avgScore.toFixed(1);
        } else {
            document.getElementById('averageGrade').textContent = 'N/A';
        }
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
    }
}

async function initializeCharts() {
    try {
        const [coursesRes, gradesRes] = await Promise.all([
            fetch('http://localhost:5001/courses'),
            fetch('http://localhost:5001/grades')
        ]);

        const courses = await coursesRes.json();
        const grades = await gradesRes.json();

        // Students per course chart
        const studentsCtx = document.getElementById('studentsPerCourseChart');
        if (studentsCtx) {
            new Chart(studentsCtx, {
                type: 'bar',
                data: {
                    labels: courses.map(course => course.title),
                    datasets: [{
                        label: 'Number of Students',
                        data: courses.map(course => course.students),
                        backgroundColor: 'rgba(79, 70, 229, 0.8)',
                        borderColor: 'rgba(79, 70, 229, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: { legend: { display: false } },
                    scales: { y: { beginAtZero: true } }
                }
            });
        }

        // Average grades chart
        const gradesCtx = document.getElementById('averageGradesChart');
        if (gradesCtx) {
            const courseGrades = {};
            grades.forEach(grade => {
                if (!courseGrades[grade.course]) {
                    courseGrades[grade.course] = [];
                }
                courseGrades[grade.course].push(grade.score);
            });

            const courseNames = Object.keys(courseGrades);
            const averages = courseNames.map(course =>
                courseGrades[course].reduce((sum, score) => sum + score, 0) / courseGrades[course].length
            );

            new Chart(gradesCtx, {
                type: 'line',
                data: {
                    labels: courseNames,
                    datasets: [{
                        label: 'Average Grade',
                        data: averages,
                        backgroundColor: 'rgba(34, 197, 94, 0.2)',
                        borderColor: 'rgba(34, 197, 94, 1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    plugins: { legend: { display: false } },
                    scales: { y: { beginAtZero: true, max: 100 } }
                }
            });
        }
    } catch (error) {
        console.error('Error initializing charts:', error);
    }
}