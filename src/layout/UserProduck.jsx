import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function UserProduck() {
  const [purchases, setPurchases] = useState([]);
  const { userId } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`http://localhost:8889/auth/purchases`, {
          headers: { Authorization: `Bearer ${token}` },
          // params: { userId } 
        });
        setPurchases(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [userId]); 


  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8889/auth/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` } 
      });
      setPurchases(purchases.filter(purchase => purchase.id !== id));
      alert("ลบสินค้าแล้ว");
    } catch (error) {
      console.error('Error deleting menu purchase:', error);
    }
  };

  return (
<div className='"flex flex-col justify-center items-center py-10'>
  <h2 className="text-2xl font-semibold mb-4">ข้อมูลการซื้อสินค้า</h2>
  <div className="container mx-auto mt-10 p-4 rounded-lg">
    {purchases.map(purchase => (
      
      <div key={purchase.id} className="border-b border-gray-200 py-4">
        <div className="flex items-center justify-between border-b border-gray-200 pb-9 mb-2">
          <div>
          <p className="text-lg font-semibold">ชื่อเมนู: {purchase.namemenu}</p>
        <p className="text-gray-600">ราคา: {purchase.price}</p>
        <p className="text-gray-600">จำนวน: {purchase.amount}</p>
        <p className="text-gray-600">วิธีการชำระเงิน: {purchase.pay}</p>
          </div>
       
       <div>
        <button className='bg-red-500 text-white px-4 py-2 rounded-md' onClick={() => handleDelete(purchase.id)} >ยกเลิก</button>
       </div>
        </div>
        {}
      </div>
    ))}
</div>

</div>
  );
}

export default UserProduck;


