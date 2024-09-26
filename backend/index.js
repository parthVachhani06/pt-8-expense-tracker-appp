const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const authrouter = require('./routes/authrouter')
const db = require('./models/db');
const multer = require('multer');
require('dotenv').config();

const PORT = process.env.PORT || 8080

app.use(bodyParser.json({ limit: '10mb' }));
app.use(cors());
app.use('/uploads', express.static('uploads'));


app.get('/', (req, res) => {
    res.send('Hello World');
})

app.use('/auth', authrouter)
app.use('/api', authrouter);


app.listen(PORT, () => {
    console.log("Server is Running Succesfully....");

})