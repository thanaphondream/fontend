import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function OrderCancel() {
    const [order, setOrder] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('https://backend-olnc.onrender.com/order/orderofficer', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setOrder(response.data);
            } catch (err) {
                setError('Failed to fetch order data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const pendingBookings = order.filter((bk) => bk.status === 'ยกเลิกเมนู');
    return (
        <div className="text-center mx-auto max-w-4xl p-6">
            <h1 className="text-2xl font-bold mb-4">รายการยกเลิกทั้งหมด</h1>
            
            {loading ? (
                <p>Loading orders...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : pendingBookings.length === 0 ? (
                <p>No orders waiting for confirmation.</p>
            ) : (
                <div className="space-y-4 text-left mt-10">
                    <div className='text-center'>
                    </div>
                    {pendingBookings.map((orders) => {
                        const orderalls = orders.ordercart.length;

                        return (
                            <div
                                key={orders.id}
                                onClick={() => LinkAFn(orders)}
                                className="border-2 border-red-500 w-[90%] mx-auto p-4 rounded-lg hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                            >
                                <div className="mb-2">
                                    {orders.Payment.map((m) => (
                                        <div key={m.id}>
                                            <p className="font-semibold text-lg">ชื่อ: {m.user.username}</p>
                                        </div>
                                    ))}
                                </div>
                                <h1 className="text-lg font-semibold mt-4">รายการเมนู</h1>
                                <div>
                                    <p>รายการรวม: {orderalls} รายการ</p>
                                    <p>จำนวนรวม: {orders.total_all} จำนวน</p>
                                    <p>ราคารวม: {orders.allprice} บาท</p>
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
                                    <p className="bg-red-500 w-32 py-1 px-2 rounded-lg inline-block text-center">{orders.status}</p>
                                </div>
                                <div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default OrderCancel