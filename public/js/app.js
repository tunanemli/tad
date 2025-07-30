// Global variables
let accessToken = localStorage.getItem('accessToken') || '';
let tokenExpiry = localStorage.getItem('tokenExpiry') || '';

// DOM elements
const authForm = document.getElementById('authForm');
const tokenDisplay = document.getElementById('tokenDisplay');
const apiTestForm = document.getElementById('apiTestForm');
const responseArea = document.getElementById('responseArea');
const statusDisplay = document.getElementById('statusDisplay');

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    updateTokenStatus();
    setupEventListeners();
    setupTabs();
});

// Setup event listeners
function setupEventListeners() {
    // Auth form
    if (authForm) {
        authForm.addEventListener('submit', handleAuthSubmit);
    }

    // API test form
    if (apiTestForm) {
        apiTestForm.addEventListener('submit', handleApiTestSubmit);
    }

    // Clear token button
    const clearTokenBtn = document.getElementById('clearToken');
    if (clearTokenBtn) {
        clearTokenBtn.addEventListener('click', clearToken);
    }

    // Method change handler
    const methodSelect = document.getElementById('method');
    if (methodSelect) {
        methodSelect.addEventListener('change', handleMethodChange);
    }
}

// Setup tabs (only for actual tab content, not navigation)
function setupTabs() {
    const tabLinks = document.querySelectorAll('.tab-links a'); // Sadece gerçek tab'lar için
    const tabContents = document.querySelectorAll('.tab-content');

    tabLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all tabs
            tabLinks.forEach(l => l.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            const targetTab = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetTab);
            if (targetElement) {
                targetElement.classList.add('active');
            }
        });
    });
}

// Handle authentication form submission
async function handleAuthSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(authForm);
    const authData = {
        username: formData.get('username'),
        password: formData.get('password'),
        firmno: formData.get('firmno')
    };

    try {
        showLoading('Giriş yapılıyor...');
        
        const response = await fetch('/auth/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(authData)
        });

        const result = await response.json();

        if (response.ok) {
            accessToken = result.access_token;
            tokenExpiry = new Date(Date.now() + result.expires_in * 1000).toISOString();
            
            // Save to localStorage
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('tokenExpiry', tokenExpiry);
            
            showSuccess('Giriş başarılı! Token alındı.');
            updateTokenStatus();
            
            // Clear form
            authForm.reset();
        } else {
            showError('Giriş başarısız: ' + (result.message || 'Bilinmeyen hata'));
        }
    } catch (error) {
        showError('Bağlantı hatası: ' + error.message);
    }
}

// Handle API test form submission
async function handleApiTestSubmit(e) {
    e.preventDefault();
    
    if (!accessToken || isTokenExpired()) {
        showError('Önce giriş yapmanız gerekiyor!');
        return;
    }

    const formData = new FormData(apiTestForm);
    const method = formData.get('method');
    const endpoint = formData.get('endpoint');
    const requestBody = formData.get('requestBody');

    try {
        showLoading('API isteği gönderiliyor...');
        
        const requestOptions = {
            method: method,
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            }
        };

        // Add body for POST, PUT, PATCH requests
        if (['POST', 'PUT', 'PATCH'].includes(method) && requestBody) {
            try {
                requestOptions.body = JSON.stringify(JSON.parse(requestBody));
            } catch (parseError) {
                showError('Geçersiz JSON formatı!');
                return;
            }
        }

        const response = await fetch(`/api/data/${endpoint}`, requestOptions);
        const result = await response.text();

        // Display response
        displayResponse(response.status, response.statusText, result);
        
        if (response.ok) {
            showSuccess('API isteği başarılı!');
        } else {
            showWarning(`API isteği tamamlandı (${response.status})`);
        }
        
    } catch (error) {
        showError('API isteği başarısız: ' + error.message);
        displayResponse(0, 'Error', error.message);
    }
}

// Handle method change
function handleMethodChange(e) {
    const method = e.target.value;
    const bodyGroup = document.getElementById('bodyGroup');
    
    if (['POST', 'PUT', 'PATCH'].includes(method)) {
        bodyGroup.style.display = 'block';
    } else {
        bodyGroup.style.display = 'none';
    }
}

// Update token status display
function updateTokenStatus() {
    if (!statusDisplay) return;
    
    if (accessToken && !isTokenExpired()) {
        statusDisplay.innerHTML = `
            <div class="status success">
                ✅ Token Aktif (Süre: ${new Date(tokenExpiry).toLocaleString('tr-TR')})
            </div>
        `;
        
        if (tokenDisplay) {
            tokenDisplay.value = accessToken;
        }
    } else {
        statusDisplay.innerHTML = `
            <div class="status error">
                ❌ Token Yok veya Süresi Dolmuş
            </div>
        `;
        
        if (tokenDisplay) {
            tokenDisplay.value = '';
        }
    }
}

// Check if token is expired
function isTokenExpired() {
    if (!tokenExpiry) return true;
    return new Date() >= new Date(tokenExpiry);
}

// Clear token
function clearToken() {
    accessToken = '';
    tokenExpiry = '';
    localStorage.removeItem('accessToken');
    localStorage.removeItem('tokenExpiry');
    
    updateTokenStatus();
    showSuccess('Token temizlendi!');
    
    // Clear response area
    if (responseArea) {
        responseArea.textContent = '';
    }
}

// Display API response
function displayResponse(status, statusText, body) {
    if (!responseArea) return;
    
    try {
        // Try to format JSON
        const jsonBody = JSON.parse(body);
        body = JSON.stringify(jsonBody, null, 2);
    } catch (e) {
        // Not JSON, display as is
    }
    
    responseArea.textContent = `Status: ${status} ${statusText}\n\n${body}`;
}

// Status message functions
function showLoading(message) {
    showStatus(message, 'warning');
}

function showSuccess(message) {
    showStatus(message, 'success');
}

function showError(message) {
    showStatus(message, 'error');
}

function showWarning(message) {
    showStatus(message, 'warning');
}

function showStatus(message, type) {
    // Create status element
    const statusEl = document.createElement('div');
    statusEl.className = `status ${type}`;
    statusEl.textContent = message;
    
    // Insert at top of container
    const container = document.querySelector('.container');
    if (container) {
        container.insertBefore(statusEl, container.firstChild);
        
        // Remove after 3 seconds
        setTimeout(() => {
            if (statusEl.parentNode) {
                statusEl.parentNode.removeChild(statusEl);
            }
        }, 3000);
    }
}

// Copy to clipboard function
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showSuccess('Panoya kopyalandı!');
    }).catch(() => {
        showError('Kopyalama başarısız!');
    });
}