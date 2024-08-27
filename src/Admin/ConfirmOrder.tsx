import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ConfirmOrder() {
    const [order, setOrder] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('User not authenticated');
                    setLoading(false);
                    return;
                }

                const response = await axios.get('http://localhost:8889/order/orderofficer', {
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

    const pendingBookings = order.filter((bk) => bk.status === 'รอยืนยันการสั้ง');

    console.log(pendingBookings);

    const LinkAFn = (order) => {
        navigate('/already', {state: {order}})
    }

    return (
        <div className="text-center mx-auto max-w-4xl p-6">
            <h1 className="text-2xl font-bold mb-4">งานทั้งหมด</h1>
            
            {loading ? (
                <p>Loading orders...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : pendingBookings.length === 0 ? (
                <p>No orders waiting for confirmation.</p>
            ) : (
                <div className="space-y-4 text-left mt-10">
                    {pendingBookings.map((orders) => {
                        const orderalls = orders.ordercart.length;

                        return (
                            <div
                                key={orders.id}
                                onClick={() => LinkAFn(orders)}
                                className="border-2 border-orange-300 w-[90%] mx-auto p-4 rounded-lg hover:shadow-lg transition-shadow duration-300 cursor-pointer"
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
                                    <p className="bg-amber-300 w-32 py-1 px-2 rounded-lg inline-block text-center">{orders.status}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default ConfirmOrder;