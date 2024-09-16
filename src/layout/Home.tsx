import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './CSS/UserHome.css';
import Strer from '../potter/Proster';
import { Link, useNavigate } from 'react-router-dom'; // Corrected import of useNavigate
import Prosterwash from '../potter/Prosterwash';
import 'boxicons';
import Swal from 'sweetalert2';

function Home() {
    const [menutems, setMenutems] = useState([]); // State to hold menu items
    const navigate = useNavigate(); // Hook to programmatically navigate

    const fetchMenutems = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8889/auth/getmenutems', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMenutems(response.data);
        } catch (error) {
            console.error('Error fetching menutems:', error);
        }
    };

    useEffect(() => {
        fetchMenutems();
    }, []);

    const LinkLogin = () => {
      Swal.fire({
        title: "คุณยังไม่เข้าสู่ระบบ!",
        text: "กรุณาทำการล็อกอินเพื่อเข้าสู่ระบบหน่อยครับ",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: 'ยกเลิก',
        confirmButtonText: "ล็อกอิน"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/loing'); 
        }
      });
    };

    return (
        <div>
          <div className='text-center'>
            <p>กรุณาข้อสู่ระบบเพื่อเป็นส้วนหนึ่งของเรา</p>
            <Link to={`/loing`}><p className='text-cyan-600'>ล็อกอินเข้าสู่ระบบ</p></Link>
          </div>
          <br />
            <Strer />
            <div className="user-home-container">
                {menutems.map((item) => (
                    <div key={item.id} className="product-item" onClick={LinkLogin}>
                            <img src={item.file} alt="" />
                            <h3 className="product-title">{item.ItemName}</h3>
                            <p className="product-price">ราคา: {item.price} บาท</p>
                        <button className="btn btn-accent" onClick={LinkLogin}>
                            <box-icon name='cart-add'></box-icon>
                            เพิ่มลงตะกร้า
                        </button>
                        <div className="button-group"></div>
                    </div>
                ))}
                <hr />
            </div>
            <Prosterwash />
        </div>
    );
}

export default Home;
