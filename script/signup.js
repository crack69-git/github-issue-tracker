function getvalue(id) {
    return document.getElementById(id).value;
}

document.getElementById("signin-btn").addEventListener("click", () => {
    const username = getvalue("username");
    const password = getvalue("password");
    if (username === "admin" && password === "admin123") {
        alert("Login successful!");
        window.location.href = "homepage.html";
    } else {
        alert("Invalid username or password. Please try again.");
    }
});