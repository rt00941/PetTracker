const config = require('./config')
const express = require('express');
const app = express();
const { Client } = require('pg');

const client = new Client(config);

// connect to your database
client.connect(function (err) {

    if (err) console.log(err);
});

// method for querying from the database
function QueryPets(query, callback) {
    
    client.query(query,
        callback
    )
}

module.exports = QueryPets;