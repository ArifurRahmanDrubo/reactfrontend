const dotenv = require('dotenv')
const mongoose = require('mongoose');
const express = require('express');
const app = express();

dotenv.config({ path: "./.env" });
require('./Db/conn');

app.use(express.json());
var cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(require('./router/auth'));

const PORT = process.env.PORT;



// app.get("/about", (req, res) => {
//     res.cookie("test", "arif");
//     res.send(` Hello I am from from Aboutpage`)
// });

app.get("/contact", (req, res) => {
    res.send(` Hello I am from from Contractpage`)
});
app.get("/login", (req, res) => {
    res.send(` Hello I am from from Loginpage`)
});
app.get("/signup", (req, res) => {
    res.send(` Hello I am from from Signuppage`)
});



app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`)
});