// --- Hardcoded Admin Credentials ---
const ADMIN_EMAIL = "tejesh.gudla@rm1codershub.com";
const ADMIN_PASSWORD = "tejesh.gudla@rm1codershub.com";

// --- Login Handler ---
function handleLogin(event) {
    event.preventDefault(); // Prevent form from submitting the default way

    const email = document.getElementById('email-address').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    // Reset error message
    errorMessage.textContent = '';

    // Basic Validation
    if (!email || !password) {
        errorMessage.textContent = 'Please fill in all fields.';
        return;
    }

    // --- Admin Check ---
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        console.log("Admin login successful");
        window.location.href = 'admin.html'; // Redirect to admin page
        return;
    }

    // --- Hardcoded User Check ---
    if (email === "user@gmail.com" && password === "user@gmail.com") {
        console.log("User login successful");
        window.location.href = 'index.html'; // Redirect to home page
        return;
    }

    // --- Regular User Check (from localStorage) ---
    const users = JSON.parse(localStorage.getItem('ekartUsers')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        console.log("Signed up user login successful");
        window.location.href = 'index.html'; // Redirect to home page
    } else {
        errorMessage.textContent = 'Invalid email or password.';
    }
}

// --- Signup Handler ---
function handleSignup(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email-address').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const errorMessage = document.getElementById('errorMessage');

    // Reset error message
    errorMessage.textContent = '';

    // --- Validation ---
    if (!name || !email || !password || !confirmPassword) {
        errorMessage.textContent = 'Please fill in all fields.';
        return;
    }
    if (password !== confirmPassword) {
        errorMessage.textContent = 'Passwords do not match.';
        return;
    }
    if (password.length < 8) {
        errorMessage.textContent = 'Password must be at least 8 characters long.';
        return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        errorMessage.textContent = 'Please enter a valid email address.';
        return;
    }

    // --- Store New User ---
    const users = JSON.parse(localStorage.getItem('ekartUsers')) || [];
    
    // Check if user already exists
    if (users.some(u => u.email === email)) {
        errorMessage.textContent = 'An account with this email already exists.';
        return;
    }

    // Add new user
    users.push({ name, email, password });
    localStorage.setItem('ekartUsers', JSON.stringify(users));

    console.log("Signup successful for:", email);
    alert("Signup successful! You will now be redirected to the login page.");
    window.location.href = 'login.html';
}
