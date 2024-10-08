import axios from 'axios';
import { useEffect, useState } from 'react';
import './CSS/UserHome.css';
import Strer from '../potter/Proster';
import { Link } from 'react-router-dom';
import Prosterwash from '../potter/Prosterwash';
import 'boxicons'

export default function UserHome() {
  const [menutems, setMenutems] = useState([]);
  const [ user, setUser ] = useState([])
  const [ carts, setCarts ] = useState([])

  useEffect(() => {
    const fetchMenutems = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://backend-olnc.onrender.com/auth/getmenutems', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMenutems(response.data);

        const rsuser = await axios.get('https://backend-olnc.onrender.com/auth/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(rsuser.data)

        const rscarts = await axios.get('https://backend-olnc.onrender.com/cart/carts/', {
          headers: { Authorization: `Bearer ${token}`},
        })
        setCarts(rscarts.data)
        // console.log(rscarts.data)

      } catch (error) {
        console.error('Error fetching menutems:', error);
      }
    };

    fetchMenutems();
  }, []);


    const cartShow = async () => {
      try{
        const token = localStorage.getItem('token');
        const rscarts = await axios.get('https://backend-olnc.onrender.com/cart/carts/', {
          headers: { Authorization: `Bearer ${token}`},
        })
        setCarts(rscarts.data)
      }catch(err){
        console.error(err)
      }
    }

  const handleAddToCart = async (itemId, itemprice) => {
    try {
      const token = localStorage.getItem('token');
      const cartItimechix = carts.find(cart => cart.menutemsId === itemId)
      console.log("sffsafff11", cartItimechix)


      if(cartItimechix){
        const nexttotal = cartItimechix?.total + 1;
        const nextprice = cartItimechix?.all_price + itemprice;
        console.log(nextprice, nexttotal)
        await axios.put(`https://backend-olnc.onrender.com/cart/carts/${cartItimechix.id}`,{
          total : nexttotal,
          all_price: nextprice
        })
      }else{
        const response = await axios.post('https://backend-olnc.onrender.com/cart/carts/', { 
          total: 1,
          all_price: itemprice,
          userId: user.id,
          status: 'pm',
          menutemsId: itemId
       }, {
         headers: { Authorization: `Bearer ${token}` },
       });
       console.log(response.data); 
      }
      cartShow()

      // window.location.reload();
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const status = (item) => {
    if (item.status === 0) {
      return (
        <div>
          <img src={item.file} alt="" />
          <h3 className="product-title">{item.ItemName}</h3>
          <p className="product-price">ราคา: {item.price} บาท</p>
          <p className='text-red-600 font-semibold'>ก๋วยเตี๋ยวหมดแล้ว</p>
        </div>
      );
    } else {
      return (
        <div>
          <Link to={`/product/${item.id}`}>
            <img src={item.file} alt="" />
            <h3 className="product-title">{item.ItemName}</h3>
            <p className="product-price">ราคา: {item.price} บาท</p>
          </Link>
          <br />
          <button
            className="btn btn-accent"
            onClick={() => handleAddToCart(item.id, item.price)}
          >
            <box-icon name="cart-add"></box-icon>
            เพิ่มลงตะกร้า
          </button>
          <div className="button-group"></div>
        </div>
      );
    }
  };
  
  return (
    <div>
      <Strer />
      <div className="user-home-container">
        {menutems.map((item) => (
          <div key={item.id} className="product-item">
            {status(item)}
          </div>
        ))}
        <hr />
      </div>
      <Prosterwash />
    </div>
  );
  
}
