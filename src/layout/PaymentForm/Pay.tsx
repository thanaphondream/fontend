import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Pay() {
  const location = useLocation();
  const Ids = location.state.pay_Id;
  const navigate = useNavigate();
  
  const [pay, setPay] = useState({
    paymentId: Ids,
    date: new Date(),
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const paySave = async () => {
    try {
      const formData = new FormData();
      formData.append('date', pay.date);
      formData.append('paymentId', pay.paymentId);
      formData.append('image', image);

      await axios.post('http://localhost:8889/payment/pay', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log('Payment successfully saved');
      payupdateFn();
    } catch (err) {
      console.error('Error saving payment:', err);
    }
  };

  const payupdateFn = async () => {
    try {
      await axios.put(`http://localhost:8889/payment/payments/${Ids}`, {
        pay: 'โอนจ่าย',
        status: 'โอนจ่ายแล้ว'
      });
      navigate('/');
    } catch (err) {
      console.error('Error updating payment status:', err);
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      navigate('/'); // Redirect to home page when back button is pressed
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">ส่งการชำระเงินของคุณ</h2>
        <div>
          <img src="https://v4i.rweb-images.com/www.telepartthai.com/images/editor/%e0%b8%9a%e0%b8%b1%e0%b8%8d%e0%b8%8a%e0%b8%b5%e0%b9%82%e0%b8%ad%e0%b8%99_%e0%b8%9a%e0%b8%a3%e0%b8%b4%e0%b8%a9%e0%b8%b1%e0%b8%97_%e0%b9%80%e0%b8%97%e0%b9%80%e0%b8%a5%e0%b8%9e%e0%b8%b2%e0%b8%a3%e0%b9%8c%e0%b8%97_%e0%b8%8a%e0%b9%89%e0%b8%ad%e0%b8%9bQR_Code.jpg" alt="QR Code" />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            อัปโหลดรูปภาพ
          </label>
          <input
            type="file"
            name="image"
            id="image"
            onChange={handleImageChange}
            className="mt-2 block w-full text-sm text-gray-500
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-full file:border-0
                       file:text-sm file:font-semibold
                       file:bg-indigo-50 file:text-indigo-700
                       hover:file:bg-indigo-100
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Image preview section */}
        {preview && (
          <div className="mb-4">
            <img src={preview} alt="Image preview" className="w-full rounded-lg" />
          </div>
        )}
        
        <div className="flex justify-center">
          <button
            className="bg-red-500 text-white font-bold py-2 px-4 rounded-full
                       hover:bg-red-600 transition duration-200"
            onClick={paySave}
          >
            ส่งการชำระเงิน
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pay;
