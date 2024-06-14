const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const connectDB = require('./config/db-connect');

// ROUTES

const server = express();

const port = process.env.PORT || 8080;

server.listen(port, () => console.log(`Server is listining on ${port}`));
