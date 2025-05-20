document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".tab");
    const signupForm = document.getElementById("signup-form");
    const signinForm = document.getElementById("signin-form");
    const togglePassword = document.getElementById("togglePassword");
    const passwordInput = document.getElementById("password");

    // Tab switch
    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            document.querySelector(".tab.active")?.classList.remove("active");
            tab.classList.add("active");

            const isSignup = tab.dataset.form === "signup";
            signupForm.classList.toggle("hidden", !isSignup);
            signinForm.classList.toggle("hidden", isSignup);
        });
    });

    // Toggle password visibility
    togglePassword?.addEventListener("click", () => {
        passwordInput.type = passwordInput.type === "password" ? "text" : "password";
    });

    // Email validation
    function validateGmail(email) {
        return /^[a-zA-Z0-9._%+-]+@tip\.edu\.ph$/.test(email.trim());
    }

    // Sign Up
    signupForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const emailInput = signupForm.querySelector('input[name="email"]');
        const passwordInput = signupForm.querySelector('input[name="password"]');

        if (!validateGmail(emailInput.value)) {
            alert("Please enter a valid @tip.edu.ph email address.");
            emailInput.focus();
            return;
        }

        // Store credentials in localStorage (for demo only; not secure for production)
        localStorage.setItem("userEmail", emailInput.value.trim());
        localStorage.setItem("userPassword", passwordInput.value); // store plain password

        alert("New account successfully created!");

        // Reset form
        signupForm.reset();

        // Switch to Sign In tab
        document.querySelector('.tab[data-form="signup"]')?.classList.remove("active");
        document.querySelector('.tab[data-form="signin"]')?.classList.add("active");

        signupForm.classList.add("hidden");
        signinForm.classList.remove("hidden");
    });

    // Sign In
    signinForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const emailInput = signinForm.querySelector('input[name="email"]');
        const passwordInput = signinForm.querySelector('input[name="password"]');

        const savedEmail = localStorage.getItem("userEmail");
        const savedPassword = localStorage.getItem("userPassword");

        if (!validateGmail(emailInput.value)) {
            alert("Please enter a valid @tip.edu.ph email address.");
            emailInput.focus();
            return;
        }

        if (emailInput.value.trim() !== savedEmail || passwordInput.value !== savedPassword) {
            alert("Incorrect email or password.");
            return;
        }

        // Success
        window.location.href = "website.html"; // Replace with your actual URL
    });
});
