// CreatePaymentForm.js
import React, { useState } from 'react';
import axios from 'axios';

const CreatePaymentForm = () => {
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const token = localStorage.getItem('token');
      const response = await axios.post('https://backend-olnc.onrender.com/auth/create-payment', { amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response.data); // Log created payment data
    } catch (error) {
      console.error('Error creating payment:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <button type="submit">Create Payment</button>
    </form>
  );
};

export default CreatePaymentForm;
