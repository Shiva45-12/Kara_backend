require('dotenv').config(); 

const express = require('express');
const cors = require('cors');
const connectDB = require('./db/connection');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
// const cors = require('cors');
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello I am Backend');
});

// Routes
app.use('/api/partners', require('./routes/partners'));
app.use('/api/amc', require('./routes/amc'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/popup', require('./routes/popup'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/blogs', require('./routes/blog'));

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
