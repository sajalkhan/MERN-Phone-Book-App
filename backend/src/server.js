const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const cors = require('cors');
const config = require('config');

const connectDB = require('./Config/db');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Connect Database
connectDB();

//Init req.body Middleware
app.use(express.json({ extended: false }));
app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Define Routes
app.use('/api/contact', require('./Routes/userContact'));
const PORT = process.env.PORT || 8080;

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' }); // here will pass an object to env so it will understand where the configuration file is located
const environment = process.env.NODE_ENV;

if(process.env.NODE_ENV === environment)
{
    app.use(express.static('frontend/build'));
    
    app.get('*', (req, res)=> {
        res.sendFile(path.resolve(__dirname,'frontend','build','index.html'));
    })
}

app.listen(PORT, () => console.log(`server started on port ${PORT}`));