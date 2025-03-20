const user = { username: "admin", password: "password123" };

let loggedInUser = null;

const cart = [];

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

function addToCart(item, price) {
    console.log(`Item:`, item); //Testing functionality with console
    console.log(`Price:`, price);

    if (cart.length === 0) {
        const objectToInsert = {
            drink: item,
            cost: price,
            quanity: 1,
        };
        cart.push(objectToInsert);
    } else {
        let itemExists = false;
        for (let index = 0; index < cart.length; index++) {
            if (cart[index].drink === item) {
                cart[index].quanity++;
                itemExists = true;
                break;
            }
        }
        if (!itemExists) {
            const objectToInsert = {
                drink: item,
                cost: price,
                quanity: 1,
            };
            cart.push(objectToInsert);
        }
    }
    updateCart();
}

function updateCart() {
    let totalCost = 0;
    let ulElement = document.getElementById("cart-items");
    ulElement.innerHTML = "";

    for (let index = 0; index < cart.length; index++) {
        console.log(`addedCartItem`, cart[index]);

        totalCost += cart[index].cost * cart[index].quantity;
        const liElement = document.createElement("li");

        liElement.innerHTML = `
            Item: ${cart[index].drink}, Price: $${cart[index].cost.toFixed(
            2
        )}, Quantity: ${cart[index].quantity}
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        ulElement.appendChild(liElement);
    }
    let totalElement = document.getElementById("total");
    totalElement.innerText = totalCost.toFixed(2);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    alert(
        `Thank you for your purchase, ${
            loggedInUser && loggedInUser.username
                ? loggedInUser.username
                : "Human"
        }!`
    );
    cart.length = 0;
    updateCart();
}
