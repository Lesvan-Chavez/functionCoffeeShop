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
    let totalCost = 0;
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
        for (let index = 0; index < cart.length; index++) {
            if (cart[index].drink === item) {
                cart[index].quanity++;
            } else {
                const objectToInsert = {
                    drink: item,
                    cost: price,
                    quanity: 1,
                };
                cart.push(objectToInsert);
            }
        }
    }

    let ulElement = document.getElementById("cart-items");
    let liElement = document.createElement("li");

    for (let index = 0; index < cart.length; index++) {
        console.log(`addedCartItem`, cart[index]);

        totalCost += cart[index].cost;

        liElement.innerText = `Item: ${cart[index].drink}, Price: $${cart[
            index
        ].cost.toFixed(2)}`;
        ulElement.appendChild(liElement);
    }

    let totalElement = document.getElementById("total");
    totalElement.innerText = totalCost.toFixed(2);
}
