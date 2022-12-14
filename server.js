require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to databse'));

app.use(express.json());
app.use(cors());

const subscribersRouter = require('./routes/subscribers');

app.use('/subscribers', subscribersRouter);

app.listen(5000, () => console.log('Server is up!'));
