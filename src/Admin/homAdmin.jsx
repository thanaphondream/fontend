import axios from 'axios';
import { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import { Link } from 'react-router-dom';

export default function HomeAdmin() {
  const [menuItems, setMenuItems] = useState([]);

  const fetchMenuItems = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://backend-olnc.onrender.com/auth/getmenutems', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMenuItems(response.data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  useEffect(() => {
    
    fetchMenuItems();
  }, []);

  const editstatus0 = async (id) => {
    try{
      const rs = await axios.put(`https://backend-olnc.onrender.com/auth/monusstatus/${id}`, {
        status: 0
      })
      console.log(rs.data)
      alert('ทำการลดสินค้าแล้ว')
      fetchMenuItems()
    }catch(err){
      console.error(err)
    }
  }

  const editstatus1 = async (id) => {
    try{
      const rs = await axios.put(`https://backend-olnc.onrender.com/auth/monusstatus/${id}`, {
        status: 1
      })
      console.log(rs.data)
      alert('ทำการเพิ่มสินค้าแล้ว')
      fetchMenuItems()
    }catch(err){
      console.error(err)
    }
  }

 const status = (item) => {
  if(item.status === 0){
    return(
      <div className='w-32 text-center ml-auto  '>
        <p className='bg-green-600 h-8 shadow-lg rounded-lg' onClick={() => editstatus1(item.id)}>เพิ่มเมนู</p>
      </div>
    )
  }else{
    return(
      <div className='w-32 text-center ml-auto  '>
        <p className='bg-red-500 h-8 shadow-lg rounded-lg' onClick={() => editstatus0(item.id)}>เมนูหมด</p>
      </div>
    )
  }
 }

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
          {status(item)}
        </div>
      ))}
    </div>
  );
}
