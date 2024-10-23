const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const admin = require('firebase-admin');
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  }),
});

const app = express();

// Middleware
app.use(cors({
  origin: 'https://main.dr06ddvd7a4iq.amplifyapp.com', // Allow requests from the frontend
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'BookNest',
})
  .then(() => console.log('Connected to MongoDB BookNest database'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Route imports
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');
const profileRoutes = require('./routes/profile');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/profile', profileRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
