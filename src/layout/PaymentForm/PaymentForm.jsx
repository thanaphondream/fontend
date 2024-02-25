import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './PaymentForm.css'

const PaymentForm = () => {
  const { id } = useParams(); 
  const [formData, setFormData] = useState({
    amount: 1,
    userId: '',
    menuItemsId: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8889/auth/getproduct/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response1 = await axios.post('http://localhost:8889/auth/payment', {
        productId: id,
        amount: formData.amount,
        userId: formData.userId,
        menutemsId: formData.menuItemsId
      });
      setFormData(response1.data);
      console.log('Payment successful:', response1.data);
    } catch (error) {
      console.error('Error processing payment:', error);
      setErrorMessage('An error occurred while processing payment. Please try again later.');
    }
  };
  

  return (
    <div className='payment'>
      <div className="paymentMethods">
        <label>เลือกวิธีการชำระเงิน:</label>
        <div>
          <input type="radio" id="COD" name="paymentMethod" className="radio theme-controller"value="COD" onChange={handleChange} />
          <label for="COD">ปลายทาง</label>
          <img src="https://i.pinimg.com/564x/72/42/47/724247e8906287cb912e90f999420963.jpg" alt="COD" />
        </div>
        <div>
          <input type="radio" id="BankTransfer" name="paymentMethod" value="BankTransfer" className="radio theme-controller"onChange={handleChange} />
          <label for="BankTransfer">ธนาคาร</label>
          <img src="https://i.pinimg.com/564x/ce/ff/26/ceff2672e54405aae07c0173304fc077.jpg" alt="Bank Transfer" />
        </div>
        <div>
          <input type="radio" id="CreditCard" name="paymentMethod" value="CreditCard" className="radio theme-controller"onChange={handleChange} />
          <label for="CreditCard">บัตรเครดิต/เดบิต</label>
          <img src="https://i.pinimg.com/564x/91/6d/98/916d9851dde1de1424dc80307c709506.jpg" alt="Credit Card" />
        </div>
      </div>
  
      <div className='paymentfrom'>
        <h2>Payment Form</h2>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="cen">
            <br /><br />
            <img src={product.file} alt="" />
          </div>
          <div className="manu">
            <label htmlFor="menuItemsId">ชื่อเมนู :<strong> {product.ItemName }</strong>  MenuID:     </label>
            <input type="text" id="menuItemsId" name="menuItemsId" value={formData.menuItemsId = product.id} onChange={handleChange} readOnly />
          </div>
          <br />
          <br />
          <hr />
          <br />
          <div className="amounnts">
            <div className="amount1">
              <label htmlFor="amount">Amount:  </label>
              <input type="number" id="amount" name="amount" value={formData.amount} onChange={handleChange} min="1" max="10" />
            </div>
            <div className="amount2">
              <p>ราคารวม: {product.price * formData.amount}</p>
            </div>
          </div>
          <br /><br />
          <div className="userIds">
            <label htmlFor="userId">User ID:   </label>
            <input type="text" id="userId" name="userId" value={formData.userId} onChange={handleChange} />
          </div>
          <div className="button">
            <button type="submit" className="btn btn-outline btn-success">Pay Now</button>
          </div>
        </form>
      </div>
    </div>
  );
  
  }
export default PaymentForm;
