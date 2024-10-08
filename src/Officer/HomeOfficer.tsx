import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 

function HomeOfficer() {
  const [order, setOrder] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const ShowAlldata = async () => {
      try {
        const token = localStorage.getItem('token');
        const rsorder = await axios.get('https://backend-olnc.onrender.com/order/orderofficer', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrder(rsorder.data);
      } catch (err) {
        console.error('เกิดข้อผิดพลาด', err);
      }
    };
    ShowAlldata();
  }, []);

  const LinkDelivery = (orderData) => {
    navigate('/delivery', { state: { orderData } });
  };

  const pendingBookings = order.filter((bk) => bk.status === 'กำลังจัดส่ง');

  const LinkFinished = () => {
    navigate('/finishedWork', {state: { p: 22}})
  }

  return (
    <div className="text-center mx-auto max-w-4xl p-6">
    <h1 className="text-2xl font-bold mb-4">งานทั้งหมด</h1>

    <div>
        <button className='btn btn-warning text-slate-950'>งานที่ยังไม่เส็จ</button>
        <button className="btn btn-success" onClick={LinkFinished}>งานที่เส็จแล้ว</button>
    </div>
    <div className="space-y-4 text-left mt-10">
        {pendingBookings.map((orders) => (
            <div
                key={orders.id}
                onClick={() => LinkDelivery(orders)}
                className="border-2 border-orange-300 w-[90%] mx-auto p-4 rounded-lg hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            >
                <div className="mb-2">
                    {orders.Payment.map((m) => (
                        <div key={m.id}>
                            <p className="font-semibold text-lg">ชื่อ: {m.user.username}</p>
                        </div>
                    ))}
                </div>

                <h1 className="text-lg font-semibold mt-4">ที่อยู่</h1>
                {orders.Payment.map((m) => (
                    <div key={m.id} className="text-left mt-2 text-gray-700">
                        <p>
                            จังหวัด {m.location.provinces}, อำเภอ {m.location.amphures},{' '}
                            {m.location.districts}, ถนน {m.location.road}, หมู่บ้านที่{' '}
                            {m.location.village}, บ้านเลขที่ {m.location.house_number},{' '}
                            {m.location.other}
                        </p>
                    </div>
                ))}

                <div className="text-right mt-4">
                    <p className="bg-amber-300 w-32 py-1 px-2 rounded-lg inline-block text-center">{orders.status}</p>
                </div>
            </div>
        ))}
    </div>
</div>

  );
}

export default HomeOfficer;
