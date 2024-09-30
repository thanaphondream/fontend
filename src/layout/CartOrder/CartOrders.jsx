import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

const API_BASE_URL = 'https://backend-olnc.onrender.com/cart/carts/'; 

const CartOrders = () => {
    const [Cartorders, setPurchases] = useState([]);
    const [selectedItems, setSelectedItems] = useState(new Set()); 
    const { UserId } = useParams();
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(API_BASE_URL, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setPurchases(response.data);
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        };
        fetchData();
    }, [UserId]);

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`https://backend-olnc.onrender.com/cart/carts/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPurchases(Cartorders.filter(cartorder => cartorder.id !== id));
            //  window.location.reload();
            alert("Item deleted successfully");
        } catch (err) {
            console.error('Error deleting item:', err);
        }
    };

    const handleCheckboxChange = (id) => {
        setSelectedItems(prev => {
            const newSelected = new Set(prev);
            if (newSelected.has(id)) {
                newSelected.delete(id);
            } else {
                newSelected.add(id);
            }
            return newSelected;
        });
    };

 

    const updatetotal = async (id, newTotal) => {
        try {
            const currentItem = Cartorders.find(item => item.id === id);
    
            let newAllPrice;
            if (newTotal > currentItem.total) {
                newAllPrice = (currentItem.all_price / currentItem.total) * newTotal;
            } else if (newTotal < currentItem.total) {
                newAllPrice = (currentItem.all_price / currentItem.total) * newTotal;
            } else {
                newAllPrice = currentItem.all_price;
            }
    
            const response = await axios.put(`https://backend-olnc.onrender.com/cart/carts/${id}`, {
                total: newTotal,
                all_price: newAllPrice,
            });
    
            console.log('Cart updated successfully:', response.data);
    
            setPurchases(Cartorders.map(item =>
                item.id === id ? { ...item, total: newTotal, all_price: newAllPrice } : item
            ));
            //  window.location.reload();
        } catch (err) {
            console.error('Error updating cart:', err);
        }
    };

    const prices = () => {
        let totalPrice = Cartorders.reduce((sum, cartorder) => sum + cartorder.all_price, 0);
        return totalPrice === 0 ? 'ไม่มีสินค้า' : totalPrice;
    };

    const handleProceedToPayment = () => {
        const selectedCartItems = Cartorders.filter(cartorder => selectedItems.has(cartorder.id));
        navigate('/payment', { state: { selectedCartItems } });
    };

    const isButtonDisabled = selectedItems.size === 0;

    return (
        <div>
            <div>
                <table className="table-auto border-collapse w-full mx-8">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-center">เลือก</th>
                            {/* <th className="px-4 py-2 text-center">ลำดับ</th> */}
                            <th className="px-4 py-2 text-center">รูปภาพ</th>
                            <th className="px-4 py-2 text-center">ชื่อเมนู</th>
                            <th className="px-4 py-2 text-center">จำนวนสินค้า</th>
                            <th className="px-4 py-2 text-center">ราคา</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Cartorders.map((cartorder, index) => (
                            <tr key={cartorder.id}>
                                <td className="px-4 py-2 text-center">
                                    <input
                                        type="checkbox"
                                        checked={selectedItems.has(cartorder.id)}
                                        onChange={() => handleCheckboxChange(cartorder.id)}
                                    />
                                </td>
                                {/* <td className="px-4 py-2 text-center">{index + 1}</td> */}
                                <td className="px-4 py-2 text-center">
                                    <img src={cartorder.menutems.file} alt="" className="w-20" />
                                </td>
                                <td className="px-4 py-2 text-center">{cartorder.menutems.ItemName}</td>
                                <td className="px-4 py-2 text-center">
                                    <input
                                        type="number"
                                        value={cartorder.total}
                                        min="1"
                                        onChange={(e) => updatetotal(cartorder.id, parseInt(e.target.value))}
                                        className="w-16 border border-gray-300 rounded px-2 py-1"
                                    />
                                </td>
                                <td className="px-4 py-2 text-center">{cartorder.all_price}</td>
                                <td className="px-4 py-2 text-center">
                                    <button
                                        className='bg-red-500 text-white px-4 py-2 rounded-md'
                                        onClick={() => handleDelete(cartorder.id)}
                                    >
                                        <box-icon type='solid' name='message-square-x'></box-icon>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <br />
                <hr />
                <br />
                <h1 className='ml-[70rem] text-2xl font-bold'>ราคารวม: {prices()}</h1>
                <br />
                <div className='ml-[70rem]'>
                <button
                        className={`btn ${isButtonDisabled ? 'btn-warning' : 'btn-outline btn-success'} w-28`}
                        onClick={handleProceedToPayment}
                        disabled={isButtonDisabled}
                    >
                        สั่งซื้อ
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartOrders;

// const api = 'https://backend-olnc.onrender.com/cart/carts/'
// const token = localStorage.getItem('token');
//     const response = await axios.get(api, {
//         headers: { Authorization: `Bearer ${token}` },
// });


// export const els = response.data.reduce((sum, item, index) => sum + item.total, 0)
// export const res = response.data