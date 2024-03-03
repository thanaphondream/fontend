import axios from 'axios';    
import { useEffect, useState } from 'react';
import './CSS/UserHome.css'
import Strer from "../potter/Proster"
import { Link } from 'react-router-dom'; 
import Prosterbelow from '../potter/prosterbelow';

export default function UserHome() {
  const [menutems, setMenutems] = useState([]);

  useEffect(() => {
    const fetchMenutems = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8889/auth/getmenutems', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMenutems(response.data);
      } catch (error) {
        console.error('Error fetching menutems:', error);
      }
    };

    fetchMenutems();
  }, []);

  return (
    <div className="user-home-container">
      <div>
        <Strer/>
        <progress className="progress w-56"></progress>
      </div>
      {menutems.map((item) => (
        <div key={item.id} className="product-item">
          <Link to={`/product/${item.id}`}>
            <img src={item.file} alt=""/>
            <h3 className="product-title">{item.ItemName}</h3>
            <p className="product-price">ราคา: {item.price}</p>
          </Link>
          <div className="button-group"></div>
        </div>
      ))}
      <hr />
      <div>
      <Prosterbelow/>
      </div>
    </div>
  );
}
