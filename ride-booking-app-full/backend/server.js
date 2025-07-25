
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("DB connection error", err));

const bookingSchema = new mongoose.Schema({
  seatNumber: Number,
  userName: String,
  phone: String
});

const Booking = mongoose.model('Booking', bookingSchema);

app.get('/bookings', async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);
});

app.post('/book', async (req, res) => {
  const { seatNumber, userName, phone } = req.body;
  const exists = await Booking.findOne({ seatNumber });
  if (exists) return res.status(400).json({ error: "Seat already booked" });
  await Booking.create({ seatNumber, userName, phone });
  res.json({ message: "Seat booked" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
