import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import 'boxicons'
import Swal from 'sweetalert2';
import img from './img/แกง2-990x510-1.jpg'

function UserProduck() {
  const [purchases, setPurchases] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`http://localhost:8889/auth/purchases`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { userId } 
        });
        setPurchases(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [userId]); 

  const createReceiptImage = (purchase) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 400;
    canvas.height = 200;
    ctx.shadowColor = '#888';
    ctx.shadowBlur = 10;
    ctx.fillStyle = "#d9faef";
    ctx.fillRect(5, 5, canvas.width - 10, canvas.height - 10);
    ctx.fillStyle = '#6894fc';
    ctx.font = 'bold 14px Arial';
    const em = "🧾"
    const emoji = "🍜";
    ctx.fillText('ใบเสร็จชำระร้านฮ้าฟฟูลล', 20, 20)
    ctx.fillText('-------------------------------------------------------------------------------', 20, 30)
    ctx.fillText(`ชื่อคุณ: ${purchase.username} ${em}`, 20, 50);
    ctx.fillText(`ชื่อเมนู: ${purchase.namemenu}`, 20, 70);
    ctx.fillText(`ราคา: ${purchase.price} บาท`, 20, 90);
    ctx.fillText(`จำนวน: ${purchase.amount}`, 20, 110);
    ctx.fillText(`วิธีการชำระเงิน: ${purchase.pay}`, 20, 130);
    // ctx.fillText(`รวมเป็นเงิน: ${purchase.price * purchase.amount} บาท`, 20, 150);
    ctx.fillText(`รวมเป็นเงิน: ${purchase.price} บาท`, 20, 150);
    ctx.fillText(`วันที่: ${new Date().toLocaleString()}`, 20, 170);
    ctx.fillText(`${emoji}`,300,190)
    ctx.fillText('-------------------------------------------------------------------------------', 20, 180)
    return canvas.toDataURL();
};


  const box = (purchase) => {
    Swal.fire({
      title: "ใบเสร็จ",
      text: "นี่คือรูปภาพใบเสร็จ",
      imageUrl: createReceiptImage(purchase),
      imageWidth: 500,
      imageHeight: 250,
      imageAlt: "ใบเสร็จ"
    });
  }
  

  return (
    <div className="flex flex-col justify-center items-center py-10">
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
                <button className='bg-blue-500 px-4 py-2 rounded-md ml-2' onClick={() => box(purchase)}>
                <box-icon name='receipt'></box-icon> แสดงรูปภาพใบเสร็จ
                </button>
                <a href={createReceiptImage(purchase)} download={`${purchase.namemenu}.png`}>
                  <button className='bg-green-500 px-4 py-2 rounded-md ml-2'>
                    <box-icon name='down-arrow-alt' ></box-icon> ดาวน์โหลดใบเสร็จ
                  </button>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserProduck;
