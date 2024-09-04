import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import 'boxicons';
import Swal from 'sweetalert2';

function UserProduck() {
  const navigate = useNavigate()
  const [purchases, setPurchases] = useState([]);
  const [expandedItem, setExpandedItem] = useState(null); // Track expanded item
  const { userId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8889/payment/payment`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { userId }
        });
        setPurchases(response.data);
        // console.log(response.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userId]);

  const createReceiptImage = (purchase) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    const baseHeight = 440; 
    const lineHeight = 40; 
    const receiptHeight = baseHeight + purchase.order.ordercart.length * lineHeight;
    canvas.width = 300;     
    canvas.height = receiptHeight;
  
    // Background and shadow
    ctx.shadowBlur = 3;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  
    // Header
    ctx.fillStyle = '#000000';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('ใบเสร็จ', canvas.width / 2, 30);
  
    ctx.font = '12px Arial';
    ctx.fillText('ร้านฮ้าฟฟูลล', canvas.width / 2, 50);
    ctx.fillText('ทางแยกบ้านนาขมิ้น ตำบลนาขมิ้น', canvas.width / 2, 70);
    ctx.fillText('อำเภอโพนสวรรค์ จังหวัดนครพนม', canvas.width / 2, 90);
  
    ctx.textAlign = 'left';
    ctx.fillText('---------------------------------------------', 20, 110);
  
    // Customer details
    ctx.font = '12px Arial';
    ctx.fillText(`ชื่อ: ${purchase.user.username}`, 20, 130);
    ctx.fillText(`เบอร์โทร: ${purchase.user.phon}`, 20, 150);
  
    // Payment details
    ctx.fillText(`ชำระโดย: ${purchase.pay}`, 20, 170);
    ctx.fillText(`สถานะ: ${purchase.order.status}`, 20, 190);
  
    ctx.fillText('---------------------------------------------', 20, 210);
  
    // Order items and calculating totals
    let totalItems = 0;
    let totalPrice = 0;
  
    purchase.order.ordercart.forEach((item, index) => {
      const itemYPosition = 230 + index * lineHeight;
      ctx.fillText(`${item.menutems.ItemName} (x${item.total})`, 20, itemYPosition);
      ctx.textAlign = 'right';
      ctx.fillText(`${item.all_price} บาท`, canvas.width - 20, itemYPosition);
      ctx.textAlign = 'left';
  
      totalItems += item.total;
      totalPrice += item.all_price;
    });
  
    // Total quantity and price
    const totalYPosition = 230 + purchase.order.ordercart.length * lineHeight;
    ctx.fillText('---------------------------------------------', 20, totalYPosition);
    ctx.fillText(`จำนวนทั้งหมด: ${totalItems} รายการ`, 20, totalYPosition + lineHeight);
    ctx.fillText(`รวมทั้งหมด: ${totalPrice} บาท`, 20, totalYPosition + 2 * lineHeight);
    
    // Date and footer
    ctx.fillText(`วันที่: ${new Date(purchase.order.date).toLocaleDateString()}`, 20, totalYPosition + 3 * lineHeight);
    ctx.textAlign = 'center';
    ctx.fillText('ขอบคุณที่ใช้บริการ', canvas.width / 2, totalYPosition + 5 * lineHeight);
  
    return canvas.toDataURL();
  };

  const box = (purchase) => {
    Swal.fire({
      title: "ใบเสร็จ",
      text: "นี่คือรูปภาพใบเสร็จ",
      imageUrl: createReceiptImage(purchase),
      imageWidth: 300,
      imageHeight: 500,
      imageAlt: "ใบเสร็จ"
    });
  };

  const handleToggleDetails = (itemId) => {
    setExpandedItem(prevItem => (prevItem === itemId ? null : itemId));
  };


  const statusorderFn = (purchase) => {
    const pay_Id = purchase.id

    if(purchase.status === 'โอนจ่ายแล้ว' || purchase.status === 'ชำระปลายทาง'){
      if (purchase.order.status === 'รอยืนยันการสั้ง'){
        return (
          <div>
            <p className='text-cyan-600'>{purchase?.order?.status}</p>
            <p className='text-pink-500'>กำลังดำเนินการทำก๋วยเตี๋ยวอยู่กรุณารอสักครู่นะครับ</p>
          </div>
        )
      }
      else if (purchase.order.status === 'กำลังจัดส่ง') {
        return (
          <div>
             <p className='text-cyan-600'>{purchase?.order?.status}</p>
            <p className="text-orange-500">กำลังดำเนินการจัดส่งอยู่</p>
            <p className="text-amber-400">ใช้เวลาประมาณ: 10 นาทีถึง 4 ชั่วโมง</p>
          </div>
        );
      } else if (purchase.order.status === 'จัดส่งเรียบร้อย') {
        return (
          <div>
             <p className='text-cyan-600'>{purchase?.order?.status}</p>
            <p className="text-green-500">จัดส่งเรียบแล้วครับ</p>
          </div>
        );
      } else if (purchase.order.status === 'ยกเลิกเมนู'){
        return (
          <div>
            <p className='text-red-500'>{purchase?.order?.status}</p>
            <p className='text-cyan-600'>สินค้าถูกยกเลิกเนื่องจาก {purchase.order?.Cancel[0].note}</p>
          </div>
        )
      }
    }else {
      return(
        <div>
          <p className='text-amber-400'>{purchase.status}</p>
          <p className='text-teal-400'>รายการยังไม่โอนจ่ายกรุณาโอนจ่ายหน่อยครับ</p>
          <p onClick={() => navigate('/pay', { state: { pay_Id }})} className='text-slate-950 bg-cyan-400 mt-5 text-center w-24 rounded-lg'>กดเพื่อชำระ</p>
        </div>
      )
    }
  };

  const slipbutton = (purchase) => {
    if(purchase.order.status === 'จัดส่งเรียบร้อย'){
      return(
        <div className="flex items-center">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2 flex items-center"
          onClick={() => box(purchase)}
        >
          <box-icon name="receipt" color="white"></box-icon>
          <span className="ml-2">แสดงรูปภาพใบเสร็จ</span>
        </button>
        <a href={createReceiptImage(purchase)} download={`${purchase.user.username}.png`}>
          <button className="bg-green-500 text-white px-4 py-2 rounded-md ml-2 flex items-center">
            <box-icon name="down-arrow-alt" color="white"></box-icon>
            <span className="ml-2">ดาวน์โหลดใบเสร็จ</span>
          </button>
        </a>
      </div>
      )
    }
  }

  return (
    <div className="flex flex-col justify-center items-center py-10">
      <h2 className="text-2xl font-semibold mb-4">ประวัติการซื้อสินค้า</h2>
      <div className="container mx-auto mt-10 p-4 rounded-lg bg-white shadow-lg">
        {purchases.length > 0 ? (
          purchases.map((purchase) => (
            <div key={purchase.id} className="border-b border-gray-200 py-4 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold">คุณ: {purchase.user.username}</p>
                  <p className="text-gray-600">จำนวนเงิน: {purchase.amount} บาท</p>
                  <p className="text-gray-600">วิธีชำระ: {purchase.pay}</p>
                  <p className="text-gray-600">สถานะ: {purchase.status}</p>
                  <ul className="text-gray-600 mt-2">
                    {purchase.order.ordercart.map((item) => (
                      <li key={item.id}>
                        <div className="flex items-center justify-between">
                          <span>{item.menutems.ItemName} (x{item.total}): {item.all_price} บาท</span>
                          <button
                            className="text-blue-500 ml-2"
                            onClick={() => handleToggleDetails(item.id)}
                          >
                            {expandedItem === item.id ? 'ซ่อนรายละเอียด' : 'ดูรายละเอียด'}
                          </button>
                        </div>
                        {expandedItem === item.id && (
                          <div className="mt-2">
                            {item.menutems.file && (
                              <img
                                src={item.menutems.file}
                                alt={item.menutems.ItemName}
                                className="w-32 h-32 object-cover"
                              />
                            )}
                            <p className="text-gray-600 mt-2">{item.menutems.description}</p>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4">
                    {statusorderFn(purchase)}
                  </div>
                </div>
                    {slipbutton(purchase)}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">ยังไม่มีประวัติการซื้อสินค้า</p>
        )}
      </div>
    </div>
  );
}

export default UserProduck;
