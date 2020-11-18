// Load the Express package as a module
const express = require("express");
// Access the exported service
const app = express();

//Load and access Multer package
const multer = require("multer");
const upload = multer();

// Load the body-parser package as a module and access jsonParser
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

// Serve content of the "public and css" subfolder directly
app.use(express.static("public"));
app.use(express.static("css"));

// Enable CORS (see https://enable-cors.org/server_expressjs.html)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});


//For now, create an array of articles in this file
//Create an array to store articles.
//Start it with a few dummy entries
const articles = [
    {
        id: 1,
        title: "First Blog",
        content: "The first entry is short"
    },
    {
        id: 2,
        title: "Second Blog",
        content: "Some text here"
    },
    {
        id: 3,
        title: "Testing",
        content: "Performing a test"
    },
    {
        id: 4,
        title: "Life",
        content: "Pondering the meaning of life"
    }
]

//Function to return max value an array
const getMaxId = (articles) => {return articles.reduce((max, val) => (max > val) ? max : val, 0)};




// Return the index.html for requests to the root URL ("/")
app.get("/", (request, response) => {
    //response.send("Hello from Express!");
    response.sendFile(`${__dirname}/views/index.html`);
});

// GET - Return ex1.html (form) 
app.get("/ex1", (request, response) => {
    response.sendFile(`${__dirname}/views/ex1.html`);
});

// POST Return a confirmation that the form was processed
app.post("/ex1", upload.array(), (request, response) => {
    const name = request.body.name;
    const email = request.body.email;
    response.send(`${name}, Thank you for your order.  We will keep you posted on delivery status at ${email}.`);
});

// GET - Return ex2.html (form) 
app.get("/ex2", (request, response) => {
    response.sendFile(`${__dirname}/views/ex2.html`);
});

// API to process JSON object
app.post("/api/countries", jsonParser, (request, response) => {
    const countries = request.body;
    const name = countries.name;
    const numVisited = countries.countries.length;
    response.send(`Your name is ${name} and you visited ${numVisited} countries.  Keep traveling!`);
});

// GET - Return ex3.html (form) 
app.get("/articles", (request, response) => {
    response.sendFile(`${__dirname}/views/ex3.html`);
});

//POST - Add article to array (with max ID) / Return confirmation message
app.post("/articles", upload.array(), (request, response) => {
    const title = request.body.title;
    const content = request.body.content;
    const nextId = getMaxId(articles.map(article => article.id)) + 1;
    const newArticle = {
        id: nextId,
        title: title,
        content: content
    };
    articles.push(newArticle);
    response.send(`New article added successfully with title "${title}" and ID ${nextId}!`);
});


// Start listening to incoming requests
// If process.env.PORT is not defined, port number 3000 is used
const listener = app.listen(process.env.PORT || 3000, () => {
    console.log(`Your app is listening on port ${listener.address().port}`);
});