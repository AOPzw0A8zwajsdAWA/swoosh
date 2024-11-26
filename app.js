// When the document is ready
document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const loginSection = document.getElementById('login-section');
    const protectedSection = document.getElementById('protected-section');
    const logoutBtn = document.getElementById('logout-btn');
    const message = document.getElementById('message');

    // Dummy credentials (for demonstration purposes)
    const validUsername = "Testare";
    const validPassword = "Testa";

    // Check if user is already logged in
    if (localStorage.getItem('loggedIn') === 'true') {
        showProtectedSection();
    } else {
        showLoginSection();
    }

    // Show Login Section
    function showLoginSection() {
        loginSection.style.display = 'block';
        protectedSection.style.display = 'none';
    }

    // Show Protected Section
    function showProtectedSection() {
        loginSection.style.display = 'none';
        protectedSection.style.display = 'block';
    }

    // Login event listener
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form submission

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Simple validation
        if (username === validUsername && password === validPassword) {
            // Store login status
            localStorage.setItem('loggedIn', 'true');
            showProtectedSection();
        } else {
            message.textContent = 'Felaktigt användarnamn/lösenord';
            message.style.color = 'red';
        }
    });

    // Logout event listener
    logoutBtn.addEventListener('click', function () {
        localStorage.setItem('loggedIn', 'false');
        showLoginSection();
    });
});
