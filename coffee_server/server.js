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

const user = { username: "admin", password: "password123" };

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

app.post("/login", (req, res) => {
    console.log("gn2 / login", req.body);
    const username = req.body.username;
    const password = req.body.password;
    if (username != user.username || password != user.password) { // not fully working get GPT to help
        res.statusCode(401).json({ message: "Not Authorized"});
    } 
    
});

app.listen(3000, () => {
    console.log('Server is on port 3000')
});
