const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bundleRoutes = require('./routes/bundleRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const cors = require('cors');
const { swaggerUi, swaggerSpec } = require('./swagger/swagger');
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/bundles', authMiddleware, bundleRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));


  module.exports = app;