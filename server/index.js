const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = 5000
const fs = require('fs');

// Allow cross origin requests between ports
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,
   optionSuccessStatus:200,
}
app.use(cors(corsOptions)) 

// set up body parser to get body from routes
app.use(bodyParser.json())

// route handling from routes.js in routes folder
const routes = require('./routes/routes.js')(app, fs);

// launch on defined port
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})