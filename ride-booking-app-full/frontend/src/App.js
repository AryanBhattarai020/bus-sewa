
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [seats, setSeats] = useState(Array(12).fill(false));
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/bookings').then(res => {
      const bookedSeats = res.data.map(b => b.seatNumber);
      const updatedSeats = seats.map((_, i) => bookedSeats.includes(i));
      setSeats(updatedSeats);
    });
  }, []);

  const handleBooking = (i) => {
    if (seats[i]) return alert('Seat already booked!');
    axios.post('http://localhost:5000/book', { seatNumber: i, userName: name, phone })
      .then(() => window.location.reload())
      .catch(err => alert('Booking failed'));
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Book Your Seat</h2>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} /><br />
      <input placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} /><br /><br />
      {seats.map((booked, i) => (
        <button key={i} onClick={() => handleBooking(i)} style={{
          margin: '5px',
          backgroundColor: booked ? 'gray' : 'lightgreen',
          padding: '10px 20px'
        }}>{i + 1}</button>
      ))}
    </div>
  );
};

export default App;
