import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function ConfirmDelivery() {
    const location = useLocation()
    const paymentIds = location.state.paymentids   

    const orderIds = location.state.orderId
    console.log(88, orderIds)

    const navigate = useNavigate()

    const [delivery, setDelivery] = useState({
        name: '',
        Note: '',
        paymentId: paymentIds
    });

    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [noRecipient, setNoRecipient] = useState(false);
    const [noDetails, setNoDetails] = useState(false);

    const imagFnset = (e) => {
        const img = e.target.files[0];
        setImage(img);
        setImagePreview(URL.createObjectURL(img)); 
    };

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

    const DeliverySaveFn = async () => {
        if(delivery.name === '' || delivery.Note === ''){
            delivery.name = '-'
            delivery.Note = '-'
        }
        const formData = new FormData();
        formData.append('image', image);
        formData.append('name', delivery.name);
        formData.append('Note', delivery.Note);
        formData.append('paymentId', delivery.paymentId);

        try {
            const rs = await axios.post('http://localhost:8889/dlivery/dliverys', formData);
            console.log("Response:", rs.data);

            OrderFnstatus()
            Swal.fire({
                position: "center",
                icon: "success",
                title: "ยืนยันการจัดส่ง",
                showConfirmButton: false,
                timer: 1500
              });
            navigate('/')
        } catch (err) {
            console.error("Error connecting to API: ", err);
        }
    };

    const OrderFnstatus = async () => {
        await axios.put(`http://localhost:8889/order/orderUpstatus/${orderIds}`,{
            status: 'จัดส่งเรียบร้อย'
        })
    }

    return (
        <div className="max-w-5xl mx-auto p-8 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold mb-6">ยืนยันการส่งก๋วยเตี๋ยว</h2>
            <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">ชื่อผู้รับหากมี</label>
                <input 
                    type="text" 
                    name="name" 
                    value={delivery.name} 
                    onChange={handleInputChange} 
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    disabled={noRecipient}
                />
                <div className="mt-2">
                    <label className="inline-flex items-center">
                        <input 
                            type="checkbox" 
                            name="noRecipient" 
                            checked={noRecipient} 
                            onChange={handleCheckboxChange}
                            className="form-checkbox h-4 w-4 text-blue-600"
                        />
                        <span className="ml-2 text-sm text-gray-700">ไม่มีชื่อผู้รับ</span>
                    </label>
                </div>
            </div>

            <div className="mb-4">
                <label htmlFor="Note" className="block text-sm font-medium text-gray-700">รายละเอียด</label>
                <input 
                    type="text" 
                    name="Note" 
                    value={delivery.Note} 
                    onChange={handleInputChange} 
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    disabled={noDetails}
                />
                <div className="mt-2">
                    <label className="inline-flex items-center">
                        <input 
                            type="checkbox" 
                            name="noDetails" 
                            checked={noDetails} 
                            onChange={handleCheckboxChange}
                            className="form-checkbox h-4 w-4 text-blue-600"
                        />
                        <span className="ml-2 text-sm text-gray-700">ไม่มีรายละเอียด</span>
                    </label>
                </div>
            </div>

            <label htmlFor="image" className="block text-sm font-medium text-gray-700">รูปภาพยืนยันการส่ง</label>
            <input type="file" name="image" id="image" onChange={imagFnset} className="mt-1 mb-4 block w-full text-sm text-gray-500" />
            {imagePreview && (
                <div className="mb-4">
                    <img src={imagePreview} alt="Selected" className="w-[90%] h-auto  object-cover rounded-md" />
                </div>
            )}
            {/* <div className="mb-4">
                <label htmlFor="paymentId" className="block text-sm font-medium text-gray-700">Payment ID</label>
                <input 
                    type="text" 
                    name="paymentId" 
                    value={delivery.paymentId} 
                    onChange={handleInputChange} 
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
                />
            </div> */}

            <button 
                onClick={DeliverySaveFn} 
                className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Submit
            </button>
        </div>
    );
}

export default ConfirmDelivery;
