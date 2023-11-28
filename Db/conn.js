const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const DB = process.env.DATABASE;
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
    console.log("connection is succesful")
}).catch(() => {
    console.log("connection is not succes")
})