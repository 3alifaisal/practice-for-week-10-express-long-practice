const express = require('express');
const path = require("path");
require("express-async-errors");
const app = express();


// serving static files 
app.use("/static",express.static(path.join(__dirname,"assets")))


// parsing body as JSON
app.use(express.json())

app.use((req,res,next)=> {
  console.log(` request method: ${req.method}`)
  console.log(` URL PATH: ${req.url}`)
  res.on("finish", () => {
    console.log(` response statusCode: ${res.statusCode}`)
  })
  next()
})

// For testing purposes, GET /
app.get('/', (req, res) => {
  res.json("Express server running. No content provided at root level. Please use another route.");
});

// For testing express.json middleware
app.post('/test-json', (req, res, next) => {
  // send the body as JSON with a Content-Type header of "application/json"
  // finishes the response, res.end()

  res.json(req.body);
 
  next();
});

// For testing express-async-errors
app.get('/test-error', async (req, res) => {
  throw new Error("Hello World!")
});

app.use((req, res, next) => {
  // Create a new error with a status code of 404 and an error message
  const error = new Error("Resource not found");
  error.statusCode = 404;

  // Pass the error to the next middleware if no route matches the request
  next(error);
});

const port = 5000;
app.listen(port, () => console.log('Server is listening on port', port));