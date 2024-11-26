// Skapa användardata för fler användare
const users = {
    'user1': { password: 'password123', loggedIn: false, device: null },
    'user2': { password: 'securePassword456', loggedIn: false, device: null }
};

let currentUser = null;  // Håller reda på om någon är inloggad
const MONTH_IN_MS = 30 * 24 * 60 * 60 * 1000; // Månadens längd i millisekunder

// Hämta DOM-element
const loginSection = document.getElementById('login-section');
const protectedSection = document.getElementById('protected-section');
const message = document.getElementById('message');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const userNameDisplay = document.getElementById('user-name');
const logoutButton = document.getElementById('logout-btn');

// Kontrollera om användaren redan är inloggad från localStorage
window.onload = function() {
    const savedUser = localStorage.getItem('currentUser');
    const savedLoginTime = localStorage.getItem('loginTime'); // Hämta sista inloggningstiden

    if (savedUser) {
        const currentTime = Date.now();
        if (savedLoginTime && (currentTime - savedLoginTime) < MONTH_IN_MS) {
            // Återställ användarstatus från localStorage om en månad inte har gått
            users[savedUser].loggedIn = true;
            currentUser = savedUser;

            loginSection.style.display = 'none';
            protectedSection.style.display = 'block';
            userNameDisplay.textContent = currentUser;
        } else {
            // Om en månad har gått, logga ut användaren
            logout();
            message.textContent = 'Din inloggning har gått ut. Vänligen logga in igen.';
            message.style.color = 'red';
        }
    }
};

// Funktion för att logga in
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Förhindra att sidan laddas om

    const username = usernameInput.value;
    const password = passwordInput.value;

    // Kontrollera om användaren finns och lösenordet är korrekt
    if (users[username] && users[username].password === password) {
        if (users[username].loggedIn) {
            message.textContent = 'Det här kontot används redan på en annan enhet.';
            message.style.color = 'red';
        } else {
            users[username].loggedIn = true;
            users[username].device = navigator.userAgent; // Identifiera enheten
            currentUser = username;

            // Spara användarens inloggning i localStorage
            localStorage.setItem('currentUser', username);
            localStorage.setItem('loginTime', Date.now()); // Spara inloggningstiden

            loginSection.style.display = 'none';
            protectedSection.style.display = 'block';
            userNameDisplay.textContent = username;
            message.textContent = '';
        }
    } else {
        message.textContent = 'Fel användarnamn eller lösenord.';
        message.style.color = 'red';
    }
});

// Funktion för att logga ut
logoutButton.addEventListener('click', function() {
    logout();
});

// Funktion för att logga ut användaren
function logout() {
    if (currentUser) {
        users[currentUser].loggedIn = false;
        users[currentUser].device = null;
        currentUser = null;

        // Ta bort användarens inloggning från localStorage
        localStorage.removeItem('currentUser');
        localStorage.removeItem('loginTime'); // Ta bort inloggningstiden

        loginSection.style.display = 'block';
        protectedSection.style.display = 'none';
        message.textContent = '';
    }
}
