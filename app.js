const express = require("express");
const app = express();
const port = 80;
const path = require("path");
const fs = require("fs");
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
mongoose.connect('mongodb://localhost/contactgym', { useNewUrlParser: true });

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    //   console.log("we are connected");
})

//create a schema
let contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    feedback: String

});

//finally compiled schema compiled (loked)
const Contact = mongoose.model('Contact', contactSchema);



//Express Specifiec stuff
app.use(express.static('static'));
app.use('/static', express.static('static'));
app.use(express.urlencoded());

//Pug specifiec stuff
// Set the template engine as pug
app.set('view engine', 'pug');

//set the view directory
app.set('views', path.join(__dirname, 'views'));

app.get("/", (req, res) => {

    const param = {};

    res.status(200).render('Home.pug', param);

})
app.get("/contact", (req, res) => {

    const param = {};

    res.status(200).render('Contact.pug', param);

})
app.get("/about", (req, res) => {

    const param = {};

    res.status(200).render('About.pug', param);

})
app.get("/services", (req, res) => {

    const param = {};

    res.status(200).render('Services.pug', param);

})

app.post("/contact", (req, res) => {
    const param1 = { "message": 'Your form is submitted successfully' };
    name1 = req.body.name;
    phone = req.body.phone;
    email = req.body.email;
    feedback = req.body.feedback;


    // let outputToWrite = `
    // the name of the client is ${name1}, 
    // his/her mobile no is ${phone}, 
    // email is ${email}  & 
    // Given feedback is ${feedback}`
    // fs.writeFileSync('output.txt',outputToWrite);

    var myData = new Contact(req.body);
    myData.save().then(() => {
        // location.reload(); 
        res.send("This item has been saved to the database")
        // alert("Thankyou for Subbmiting form..");
    }).catch(() => {
        res.status(400).send("item was not saved to the databse");
        // alert("item was not saved to the databse");
    })
    // res.status(200).render('contact.pug', param1);
    // console.log(req.body);

})



app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);

})
