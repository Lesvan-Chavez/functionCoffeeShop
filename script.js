const user = { username: "admin", password: "password123" };

let loggedInUser = null;

const cart = [];

// login function:

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

// adding items to cart function

function addToCart(item, price) {
    // console.log(`Item:`, item); //Testing functionality with console
    // console.log(`Price:`, price);

    if (cart.length === 0) {
        const objectToInsert = {
            drink: item,
            cost: price,
            quantity: 1,
        };
        cart.push(objectToInsert);
    } else {
        let itemExists = false;
        for (let index = 0; index < cart.length; index++) {
            if (cart[index].drink === item) {
                cart[index].quantity++;
                itemExists = true;
                break;
            }
        }
        if (!itemExists) {
            const objectToInsert = {
                drink: item,
                cost: price,
                quantity: 1,
            };
            cart.push(objectToInsert);
        }
    }
    updateCart();
}

// updating the cart

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
            <button onclick="minusQuantity(${index})">-</button><button onclick="addQuantity(${index})">+</button><button onclick="removeFromCart(${index})">Remove</button>
        `;
        ulElement.appendChild(liElement);
    }

    if (appliedDiscount > 0) {
        totalCost -= (totalCost * (appliedDiscount / 100));
    }

    let totalElement = document.getElementById("total");
    totalElement.innerText = totalCost.toFixed(2);
}

// removing item from cart

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

// increase or decrease item of the cart instead of completly removing

function addQuantity(index) {
    cart[index].quantity++;
    updateCart();
}

// validation to ensure it doesnt go pass 0
function minusQuantity(index) {
    if (cart[index].quantity === 1) {
        removeFromCart(index);
    } else {
        cart[index].quantity--;
        updateCart();
    }
}

// adding a discount code
// check if discount code is valid & apply it to cart

const promoCodes = {
    "10OFF": 10,
    "20OFF": 20,
    "50OFF": 50,
};

let appliedDiscount = 0; 
function applyPromoCode() {
    const userCode = document.getElementById("promoCodeInput").value.toUpperCase();
    const messageElement = document.getElementById("message");
    let totalElement = document.getElementById("total");
    let currentTotal = parseFloat(totalElement.innerText); // Get current total as a number


    if (promoCodes[userCode]) {
        let discount = promoCodes[userCode]; 
        appliedDiscount = discount; // Store discount for future cart updates for update function

        let newTotal = currentTotal - (currentTotal * (discount / 100)); 
        totalElement.innerText = newTotal.toFixed(2); 

        
        updateCart();
        messageElement.textContent = `Success! ${discount}% off applied!`;
        messageElement.style.color = "green";

    } else {
        messageElement.textContent = "Invalid promo code. Try again!";
        messageElement.style.color = "red";
    }
}







// practicing switch cases, Dark and Blue theme need work 3/22/25

function changeTheme(theme) {
    switch (theme) {
        case "light":
            document.body.style.backgroundColor = "white";
            document.body.style.color = "black";
            break;
        case "dark":
            document.body.style.backgroundColor = "black";
            document.body.style.color = "white";
            break;
        case "blue":
            document.body.style.backgroundColor = "blue";
            document.body.style.color = "white";
            break;
        default:
            alert("Invalid theme selected!");
    }
}
