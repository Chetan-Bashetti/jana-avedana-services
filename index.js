const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const connectDB = require('./config/db-connect');

// ROUTES
const queryRoutes = require('./routes/queryRoutes');

dotenv.config();
connectDB();

const server = express();

server.use(express.json());
server.use(cors());

server.use('/querys', queryRoutes);

const port = process.env.PORT || 8080;

server.listen(port, () => console.log(`Server is listining on ${port}`));
