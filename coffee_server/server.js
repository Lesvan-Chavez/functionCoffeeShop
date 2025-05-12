const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const supabase = require('./db');

// ROUTES

const app = express();
app.use(cors());

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get("/", (req, res) => {
    console.log("hitting / route");
    res.send("Hello World");
});


// menu from SupaBase
app.get("/getMenu", async (req, res) => { 
    const {data: menu, error} = await supabase.from('menu').select();

    if (error) {
        console.error('error', error);
        return res.status(500).json({ error: error.message});
    }
    console.log('menu', menu);
    console.error('error', error)
    res.json(menu);
});

// ordering: 
const orderArray = [];

app.post('/checkout', (req, res) => {
    console.log('Server checkout', req.body)
if(!req.body || req.body.length < 1) {
    res.status(400).json({ message: "At least one item required" });
}
    const order = req.body;
    orderArray.push(order);
    console.log('Order', orderArray);

    const confirmationNumber = "123456789ABC";

    res.status(200).json({ message: "Order Recieved!", confirmationNumber: confirmationNumber });

});


// for the form
const path = require("path");   
app.use(express.static(path.join(__dirname, "public")));

// Login 
// Login: okcoders@okcoders.com Password: okcoders.com

app.post('/login', async (req, res) => {
    console.log('gn2 /login', req.body)
    const { data, error } = await supabase.auth.signInWithPassword({
        email: req.body.username,
        password: req.body.password
    });
    if (error) {
        console.error('Signin error', error);
        return res.status(401).json({ error: error.message });
    }
    res.status(200).json({message: 'Success'})
});


//Contact us form 
app.post("/submit", async (req, res) => {
    console.log("Feedback form submission:", req.body);
    if (!req.body || req.body.length < 1) {
        res.status(400).json({ message: "Error submitting contact form! Ensure all fieds are complete."})
    }
    const messageObj = req.body;
    const { data, error } = await supabase
    .from('contact_form_messages')
    .insert([
        {
            first_name: messageObj.firstName,
            last_name: messageObj.lastName,
            email: messageObj.email,
            comment: messageObj.comment,
        }
    ])
    if (error) {
        console.error('Form error', error)
        return res.status(500).json({ error: error.message})
    }
    res.status(200).json({message: "Message Received!"})
});




app.listen(3000, () => {
    console.log('Server is on port 3000')
});
