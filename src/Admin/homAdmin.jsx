import axios from 'axios';
import { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import { Link } from 'react-router-dom';

export default function HomeAdmin() {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8889/auth/getmenutems', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMenuItems(response.data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };
    fetchMenuItems();
  }, []);

 

  return (
    <div className="container mx-auto p-4">
      <div className="text-3xl mb-5 ml-20 font-bold">เมนูทั้งหมด</div>
      {menuItems.map((item) => (
        <div key={item.id} className="bg-white shadow-lg rounded-lg overflow-hidden mb-6">
          <Link to={`/updatemunu/${item.id}`}>
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img className="h-48 w-full object-cover md:w-48" src={item.file} alt={item.itemName} />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold">{item.itemName}</h3>
              <p className='text-gray-700 mt-2'>ชื่อเมนู {item.ItemName}</p>
              <p className="text-gray-700 mt-2">ราคา {item.price} บาท</p>
              <p className='text-gray-700 mt-2'>รายละเอียด</p>
              <p className='text-gray-700 mt-2'>{item.description}</p>
            </div>
          </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
