const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const showRegister = document.getElementById('show-register');
const showLogin = document.getElementById('show-login');
const loginContainer = document.getElementById('login-container');
const registerContainer = document.getElementById('register-container');

showRegister.addEventListener('click', (event) => {
    event.preventDefault();
    loginContainer.style.display = 'none';
    registerContainer.style.display = 'block';
});

showLogin.addEventListener('click', (event) => {
    event.preventDefault();
    registerContainer.style.display = 'none';
    loginContainer.style.display = 'block';
});

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;

    fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.role === 'admin') {
                window.location.href = '/admin.html';
            } else if (data.role === 'student') {
                window.location.href = '/student.html';
            } else {
                alert('Invalid credentials');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        });
});

registerForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;
    const role = event.target.role.value;

    fetch('/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, role }),
    })
        .then(response => {
            if (response.ok) {
                alert('Registration successful! Please login.');
                registerContainer.style.display = 'none';
                loginContainer.style.display = 'block';
            } else {
                alert('Registration failed. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        });
});
