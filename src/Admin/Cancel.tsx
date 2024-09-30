import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Cancel() {
    const location = useLocation();
    const orders = location?.state?.orderData;

    const [cancels, setCancels] = useState({
        note: '',
        date: new Date(), // Setting the default date to current date
        orderId: orders?.id // Using optional chaining to prevent errors
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCancels((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const cancelmenu = async () => {
        try {
            await axios.post('https://backend-olnc.onrender.com/dlivery/cancel', cancels);
            await orderstatus();
            navigate('/');
        } catch (error) {
            console.error('Error cancelling order:', error);
        }
    };

    const orderstatus = async () => {
        try {
            await axios.put(`https://backend-olnc.onrender.com/order/orderUpstatus/${orders?.id}`, {
                status: 'ยกเลิกเมนู'
            });
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">ยกเลิกOrder</h2>
        <input
            type="text"
            id="note"
            name="note"
            value={cancels.note}
            onChange={handleInputChange}
            placeholder="เหตุผลในการยกเลิก"
            className="w-full h-12 px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
            className="w-full py-2 text-white bg-red-500 hover:bg-red-600 rounded-md shadow-md transition duration-300"
            onClick={cancelmenu}
        >
            ยืนการยกเลิก
        </button>
    </div>
    );
}

export default Cancel;
