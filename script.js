let loggedInUser = null;
const cart = [];
let appliedDiscount = 0;

// login function:
async function handleLogin(event) {
    event.preventDefault();
    const usernameElement = document.getElementById('username');
    const username = usernameElement.value;
    const passwordElement = document.getElementById('password');
    const password = passwordElement.value;

    const response = await fetch('http://localhost:3000/login', 
    {
        method: "POST",
        headers: {
        "Content-Type": "application/json" },
        body: JSON.stringify({
        username: username,
        password: password
        })
    });
    
    
    if (!response.ok) {
        alert('invalid credentials');
    };

    let responseJson = await response.json();
    console.log('responseJson', responseJson);

    let welcomeMessageElement = document.getElementById("welcome-message");
    welcomeMessageElement.innerText = `Welcome ${username}`;
};

    // if (
    //     user.username !== usernameElement ||
    //     user.password !== passwordElement
    // ) {
    //     alert(`User or Password not found`);
    //     return;
    // } else {
    //     loggedInUser = user;
    // }



// adding items to cart function

function addToCart(name, price) {
    // console.log("item in addToCart", name, price);

    price = parseFloat(price);

    // If the cart is empty, add the first item directly
    if (cart.length === 0) {
        const objectToInsert = {
            drink: name,
            cost: price,
            quantity: 1,
        };
        cart.push(objectToInsert);
    }
    // if cart is not empty, we need to check if the passed in item exists
    else {
        // you will see booleans created like this pretty often. it's typically called a flag.
        let itemExists = false;

        // check if item already exists in cart. if it is then increase the quantity and set the flag to true
        // you will notice 'break'.  this is a keyword in javascript.  it breaks out of the loop.  it is used here to break out as soon if the item is found since there is no need to keep going. unlike return, which would exit the entire function, break just exits the loop
        for (let index = 0; index < cart.length; index++) {
            if (cart[index].drink === name) {
                cart[index].quantity++;
                itemExists = true;
                break;
            }
        }

        // if there are items in the cart, but this item does not exist, add it to the cart
        if (!itemExists) {
            const objectToInsert = {
                drink: name,
                cost: price,
                quantity: 1,
            };
            cart.push(objectToInsert);
        }
    }

    // call (invoke) the updateCart() function.  we orginally had the updateCart() code in the addToCart() function, but it is more readable to separate it out.
    updateCart();
}

// updating the cart

function updateCart() {
    let totalCost = 0;
    let ulElement = document.getElementById("cart-items");
    ulElement.innerHTML = "";

    for (let index = 0; index < cart.length; index++) {
        // console.log(`addedCartItem`, cart[index]);

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
        totalCost -= totalCost * (appliedDiscount / 100);
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

function applyPromoCode() {
    const userCode = document
        .getElementById("promoCodeInput")
        .value.toUpperCase();
    const messageElement = document.getElementById("message");
    let totalElement = document.getElementById("total");
    let currentTotal = parseFloat(totalElement.innerText); // Get current total as a number

    if (promoCodes[userCode]) {
        let discount = promoCodes[userCode];
        appliedDiscount = discount; // Store discount for future cart updates for update function

        let newTotal = currentTotal - currentTotal * (discount / 100);
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

// need to add weather API that recs bev based off the temp
// 4/5/25 okcoders yt vid^

function createMenu(menu) {
    let ulElement = document.getElementById("menu");
    ulElement.style.listStyleType = "none";
    if (menu && menu.length > 0) {
        for (let i = 0; i < menu.length; i++) {
            const liElement = document.createElement("li");
            liElement.innerHTML = `
            <div class="menu-item">
            <span id="${menu[i].name}">${menu[i].name}</span>
            <button onclick="addToCart('${menu[i].name}', '${menu[i].price}')">Add To Cart ($${menu[i].price.toFixed(2)})</button>

            </div>`;
            ulElement.appendChild(liElement);
        }
    }
}


async function getMenuFromServer() {
    const responseMenu = await fetch("http://localhost:3000/getMenu");
    // console.log("menuFetch", responseMenu);
    if (responseMenu.status != 200) {
        console.error("response error");
        return;
    }
    let data = await responseMenu.json();
    console.log("menuData", data);

    createMenu(data);
}

// this function needs to add createMenu() and getUserLocation() from the weather API
document.addEventListener("DOMContentLoaded", function () {
    // practiceGetRoute();
    getMenuFromServer();
});


// Form Submission 
const form = document.getElementById("contact_form_messages");

async function submitFormData(formData) {
const responseForm = await fetch("http://localhost:3000/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
});

if (!responseForm.ok) {
    const text = await responseForm.text();
    throw new Error(`Server error ${responseForm.status}: ${text}`);
}
return responseForm; 
}

form.addEventListener("submit", (event) => {
event.preventDefault();

const data = Object.fromEntries(new FormData(form).entries());

if (
    !data.firstName.trim() ||
    !data.lastName.trim()  ||
    !data.email.trim()     ||
    !data.comments.trim()      
) {
    error.innerText = "Please fill in First Name, Last Name, Email, and Comments.";
    return;
}


submitFormData(data)
    .then(() => {
    console.log("Form data successfully sent!");
    })
    .catch((err) => {
    console.error("Error submitting form:", err);
    });
});

