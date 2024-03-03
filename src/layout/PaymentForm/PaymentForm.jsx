import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './PaymentForm.css'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const PaymentForm = () => {
  const navigate = useNavigate()
  const { id } = useParams(); 
  const [formData, setFormData] = useState({
    amount: 1,
    userId: '',
    menuItemsId: '',
    username: '',
    price: '',
    pay: '',
    namemenu: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [product, setProduct] = useState({});
  const [ user, setUser] = useState({})

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

  useEffect(() => {
    const fetchUser = async () => {
      try{
        const token1 = localStorage.getItem('token')
        const response01 = await axios.get(`http://localhost:8889/auth/user`,{
          headers: {Authorization: `Bearer ${token1}`}
        })
        setUser(response01.data)
      }catch (error){
        console.error('Error fetching product:', error)
      }
    }

    fetchUser()
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {

    if(!formData.pay){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>'
      });
    }

    e.preventDefault();
    try {
      const response1 = await axios.post('http://localhost:8889/auth/payment', {
        productId: id,
        amount: formData.amount,
        userId: formData.userId,
        menutemsId: formData.menuItemsId,
        username: formData.username,
        price: formData.price,
        pay: formData.pay,
        namemenu: formData.namemenu
      });
      setFormData(response1.data);
      console.log('Payment successful:', response1.data);
      if(response1.status === 200){
        Swal.fire({
          title: "Custom width, padding, color, background.",
          width: 600,
          padding: "3em",
          color: "#716add",
          background: "#fff url(/images/trees.png)",
          backdrop: `
            rgba(0,0,123,0.4)
            url("https://media.tenor.com/Mwzug9zxYh0AAAAi/nyan-cat-every-nyan.gif")
            left top
            no-repeat
          `
        });
        navigate('/')
      }
      
    } catch (error) {
      console.error('Error processing payment:', error);
      setErrorMessage('An error occurred while processing payment. Please try again later.');
    }
  };
  

  return (
    <div className='payment'>
      <div className='imgfile'>
      <img src={product.file} alt="" />
      </div>
      <div className='paymentfrom'>
        <h2>Payment Form</h2>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="cen">
            <br /><br />
            <img src={product.file} alt="" />
          </div>
          <div className='menuname'>
            <label htmlFor="namemenu">ชื่อเมนู : </label>
            <input type="text" name='namemenu' id='namemenu' value={formData.namemenu = product.ItemName} onCanPlay={handleChange} readOnly/>
          </div>
          <div className="manu">
            <label htmlFor="menuItemsId">  MenuID:     </label>
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
            <div className="prices">
              <label htmlFor="price">price : </label>
              <input type="text" name='price' id='price' value={formData.price = product.price * formData.amount } onChange={handleChange} readOnly/>
            </div>

          </div>
          <br /><br />
          <div className="userIds">
            <label htmlFor="userId">User ID :   </label>
            <input type="text" id="userId" name="userId" value={formData.userId = user.id}  onChange={handleChange} readOnly/>
          </div>
          <div className="usernames">
              <label htmlFor="username">UserName : </label>
              <input type="text" name='username' id='username' value={formData.username = user.username} onChange={handleChange} readOnly/>
            </div>
          <div className="Address">
            <label htmlFor="Address">Address : </label>
            <input type="text" id='Address' name='Address' value={user.Address} />
          </div>
          <div className="pay">
          <select
              name="pay"
              value={formData.pay} 
              onChange={handleChange}
              className="select select-bordered w-full max-w-xs"
            >
              <option >เลือกวิธีชำระ</option>
              <option value="ปลายทาง">ปลายทาง</option>
              <option value="โอนจ่าย">โอนจ่าย</option>
            </select>
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
