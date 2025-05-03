const express = require("express");
const cors = require("cors");

const menu = [
    {
        name: "Americano",
        price: 2.5,
        type: "hot",
    },
    { name: "Latte", price: 3.0, type: "hot" },
    { name: "Cappuccino", price: 3.5, type: "hot" },
    { name: "Frozen Americano", price: 4.5, type: "cold" },
    { name: "Frozen Latte", price: 2.5, type: "cold" },
    { name: "Pup Cup", price: 0, type: "cold" },
];

    // 4/26/25 Youtube Class video - Half way through the follow along

const orderArray = [];





// ROUTES

const app = express();
app.use(cors());

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get("/", (req, res) => {
    console.log("hitting / route");
    res.send("Hello World");
});

app.get("/getMenu", (req, res) => {
    console.log("gn2 / menu"); 
    //rech out to the db to get the menu
    res.json(menu);
});

// for the form
const path = require("path");   
app.use(express.static(path.join(__dirname, "public")));

// Login 

const user = { username: "admin", password: "password123" };

app.post("/login", (req, res) => {
    console.log("gn2 / login", req.body);
    const {username, password} = req.body;
    if (username !== user.username || password !== user.password) {
    res.status(401).json({ message: "Not Authorized" });
    }
    res.status(200).json({message: "Login successful", menu: menu});
});


// Feedback Form 
app.post("/submit", (req, res) => {
    console.log("Feedback form submission:", req.body);

    res.send("Thank you for your feedback!");
});




app.listen(3000, () => {
    console.log('Server is on port 3000')
});
