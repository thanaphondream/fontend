import axios from 'axios';
import { useEffect, useState } from 'react';
import './CSS/UserHome.css';
import Strer from '../potter/Proster';
import { Link } from 'react-router-dom';
import Prosterwash from '../potter/Prosterwash';

export default function UserHome() {
  const [menutems, setMenutems] = useState([]);

  useEffect(() => {
    const fetchMenutems = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8889/auth/getmenutems', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMenutems(response.data);
      } catch (error) {
        console.error('Error fetching menutems:', error);
      }
    };

    fetchMenutems();
  }, []);

  const handleAddToCart = async (itemId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8889/auth/cart/add', { itemId }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data); 
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };


  return (
    <div>
      <Strer />
      <div className="user-home-container">
        {menutems.map((item) => (
          <div key={item.id} className="product-item">
            <Link to={`/product/${item.id}`}>
              <img src={item.file} alt="" />
              <h3 className="product-title">{item.ItemName}</h3>
              <p className="product-price">ราคา: {item.price} บาท</p>
            </Link>
            <br />
            <Link
              to={`/payment/${item.id}/Fs2224SbaRel2Ncvn123444Bncceddd101Mx12Z01`}
              className="btn btn-outline btn-success"
            >
              <button>สั่งซื้อ</button>
            </Link>
            <button className="btn btn-accent" onClick={() => handleAddToCart(item.id)}>
              เพิ่มลงตะกร้า
            </button>
            <div className="button-group"></div>
          </div>
        ))}
        <hr />
      </div>
      <Prosterwash />
    </div>
  );
}
