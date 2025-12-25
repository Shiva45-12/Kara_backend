require('dotenv').config(); 

const express = require('express');
const cors = require('cors');
const connectDB = require('./db/connection');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors(
  {
    origin: ["https://kara-frontend.onrender.com", "http://localhost:5000"],
    credentials: true,
  }
));

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

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
