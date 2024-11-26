document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const message = document.getElementById("message");
    const loginSection = document.getElementById("login-section");
    const protectedSection = document.getElementById("protected-section");
    const logoutButton = document.getElementById("logout-button");

    // List of valid usernames and passwords
    const validUsers = [
        { username: "anvandare1", password: "losenord123" },
        { username: "anvandare2", password: "losenord456" },
        { username: "admin", password: "admin123" }
    ];

    // Login form submission
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent form from reloading the page

        const enteredUsername = document.getElementById("username").value;
        const enteredPassword = document.getElementById("password").value;

        // Check if entered credentials match any valid user
        const isValidUser = validUsers.some(user =>
            user.username === enteredUsername && user.password === enteredPassword
        );

        if (isValidUser) {
            // Display the protected section and hide the login section
            loginSection.style.display = "none";
            protectedSection.style.display = "block";
            message.textContent = ""; // Clear any previous error messages
        } else {
            message.style.color = "red";
            message.textContent = "Fel användarnamn eller lösenord. Försök igen.";
        }
    });

    // Logout button functionality
    logoutButton.addEventListener("click", () => {
        // Hide the protected section and show the login section
        protectedSection.style.display = "none";
        loginSection.style.display = "block";
        // Optionally clear the form inputs
        loginForm.reset();
    });
});
