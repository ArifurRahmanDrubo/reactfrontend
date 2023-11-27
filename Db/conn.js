const mongoose = require('mongoose');

const DB = process.env.DATABASE;
mongoose.connect(DB)
    .then(() => {
    console.log("connection is succesful")
}).catch(() => {
    console.log("connection is not succes")
})