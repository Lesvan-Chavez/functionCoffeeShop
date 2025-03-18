const user = { username: "admin", password: "password123" };

let loggedInUser = null;

function handleLogin(event) {
    event.preventDefault();
    const usernameElement = document.getElementById("username").value;
    const passwordElement = document.getElementById("password").value;

    if (
        user.username !== usernameElement ||
        user.password !== passwordElement
    ) {
        alert(`User or Password not found`);
        return;
    } else {
        loggedInUser = user;
    }

    let welcomeMessageElement = document.getElementById("welcome-message");
    welcomeMessageElement.innerText = `Welcome ${loggedInUser.username}`;
}

function addToCart(item, price) {}
