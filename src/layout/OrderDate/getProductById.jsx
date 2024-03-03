import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom'; 
import './getProductById.css'

export default function ProductDetail() {
  const [product, setProduct] = useState({});
  const { id } = useParams();

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

  const handleOrder = () => {
    console.log(`Ordering product with ID ${product.id}`);
  };

  const handleAddToCart = () => {
    console.log(`Adding product with ID ${product.id} to cart`);
  };

  return (
    <div className="product-detail-container">
      <div className='imgs'>
      <img alt="" src={product.file} />
      </div>
      <div className="boxs">
          <br /><br />
        <hr />
        <h2>ชื่อเมนู: {product.ItemName}</h2>
        <br /><br />
        <p>คำอธิบาย: <br /> {product.description}</p>
        <br />
        <p>ราคา: {product.price}</p>
        <hr /><br />
        <button onClick={handleOrder}>สั่งซื้อ</button>
        <br />
        <hr />
        <hr />
        <br />
        <Link to={`/payment/${product.id}/Fs2224SbaRel2Ncvn123444Bncceddd101Mx12Z01`} className="btn btn-outline btn-success">
        <button>ชำระเงิน</button>
        </Link>
      </div>
    </div>
  );
}
