import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function ConfirmDelivery() {
    const location = useLocation();
    const paymentIds = location.state.paymentids;
    const orderIds = location.state.orderId;
    const navigate = useNavigate();

    const [notes, setNotes] = useState(false);
    const [delivery, setDelivery] = useState({
        Note: '',
        paymentId: paymentIds,
        date: new Date()
    });

    const [imgpay, setImgPay] = useState(null);
    const [imgpayPreview, setImgPayPreview] = useState(null);

    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const [noRecipient, setNoRecipient] = useState(false);
    const [noDetails, setNoDetails] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDelivery((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        if (name === 'noRecipient') {
            setNoRecipient(checked);
            if (checked) setDelivery((prev) => ({ ...prev, name: '' }));
        }
        if (name === 'noDetails') {
            setNoDetails(checked);
            if (checked) setDelivery((prev) => ({ ...prev, Note: '' }));
        }
    };

    const imgpayFnset = (e) => {
        const img = e.target.files[0];
        setImgPay(img);
        setImgPayPreview(URL.createObjectURL(img));
    };

    const imagFnset = (e) => {
        const img = e.target.files[0];
        setImage(img);
        setImagePreview(URL.createObjectURL(img));
    };

    const DeliverySaveFn = async () => {
        if (delivery.Note === '') {
            delivery.Note = '-';
        }
        const formData = new FormData();
        formData.append('image', image);
        formData.append('imgpay', imgpay); 
        formData.append('Note', delivery.Note || '-');
        formData.append('paymentId', delivery.paymentId);
        formData.append('date', delivery.date);

        try {
            const rs = await axios.post('http://localhost:8889/dlivery/dliverys', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                  },
            });
            console.log("Response:", rs.data);

            await OrderFnstatus();
            Swal.fire({
                position: "center",
                icon: "success",
                title: "ยืนยันการจัดส่ง",
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/');
        } catch (err) {
            console.error("Error connecting to API: ", err);
        }
    };

    const OrderFnstatus = async () => {
        await axios.put(`http://localhost:8889/order/orderUpstatus/${orderIds}`, {
            status: 'จัดส่งเรียบร้อย'
        });
    };

    return (
        <div className="max-w-5xl mx-auto p-8 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold mb-6">ยืนยันการส่งก๋วยเตี๋ยว</h2>

            <p onClick={() => setNotes(true)} className='text-sky-500'>หากไม่มีคนรับอาหาร</p>

            {notes && (
                <div className="mb-4">
                    <label htmlFor="Note" className="block text-sm font-medium text-gray-700">หากไม่มีผู้รับอาหารให้ใส่หมายเหตุ</label>
                    <input
                        type="text"
                        name="Note"
                        value={delivery.Note}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        disabled={noDetails}
                    />
                    {/* <div className="mt-2">
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                name="noDetails"
                                checked={noDetails}
                                onChange={handleCheckboxChange}
                                className="form-checkbox h-4 w-4 text-blue-600"
                            />
                            <span className="ml-2 text-sm text-gray-700">หากไม่มีหมายเหตุ</span>
                        </label>
                    </div> */}
                </div>
            )}

            <br /><br />

            <label htmlFor="imgpay" className="block text-sm font-medium text-gray-700">รูปภาพยืนยันการชำระ</label>
            <input type="file" name="imgpay" id="imgpay" onChange={imgpayFnset} className="mt-1 mb-4 block w-full text-sm text-gray-500" />
            {imgpayPreview && (
                <div className="mb-4">
                    <img src={imgpayPreview} alt="Selected Payment" className="w-[90%] h-auto object-cover rounded-md" />
                </div>
            )}

            <label htmlFor="image" className="block text-sm font-medium text-gray-700">รูปภาพยืนยันการส่ง</label>
            <input type="file" name="image" id="image" onChange={imagFnset} className="mt-1 mb-4 block w-full text-sm text-gray-500" />
            {imagePreview && (
                <div className="mb-4">
                    <img src={imagePreview} alt="Selected Delivery" className="w-[90%] h-auto object-cover rounded-md" />
                </div>
            )}

            <button
                onClick={DeliverySaveFn}
                className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                ยืนยันการจัดส่ง
            </button>
        </div>
    );
}

export default ConfirmDelivery;
