// JavaScript for handling login, logout, and showing the correct UI
document.addEventListener('DOMContentLoaded', function() {
    const loginSection = document.getElementById('login-section');
    const protectedSection = document.getElementById('protected-section');
    const message = document.getElementById('message');
    const loginBtn = document.getElementById('loginBtn');
    const fakeFrejaBtn = document.getElementById('fakeFrejaBtn');
    const fakeSwishBtn = document.getElementById('fakeSwishBtn');
    const logoutBtn = document.getElementById('logoutBtn');

    // Simulate users and passwords
    const validUsers = {
        'user1': 'password1',
        'Igor': 'Igorsson',
    };

    // Check if user is logged in from sessionStorage
    if (sessionStorage.getItem('loggedIn') === 'true') {
        showProtectedSection();
    } else {
        showLoginSection();
    }

    loginBtn.addEventListener('click', function() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Validate login
        if (validUsers[username] && validUsers[username] === password) {
            sessionStorage.setItem('loggedIn', 'true');
            showProtectedSection();
        } else {
            message.textContent = 'Fel användarnamn eller lösenord.';
        }
    });

    fakeFrejaBtn.addEventListener('click', function() {
        alert('Fake Freja kommer snart!');
    });

    fakeSwishBtn.addEventListener('click', function() {
        alert('Fake Swish kommer snart!');
    });

    logoutBtn.addEventListener('click', function() {
        sessionStorage.removeItem('loggedIn');
        showLoginSection();
    });

    function showLoginSection() {
        loginSection.style.display = 'block';
        protectedSection.style.display = 'none';
    }

    function showProtectedSection() {
        loginSection.style.display = 'none';
        protectedSection.style.display = 'block';
    }
});
