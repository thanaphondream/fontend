import axios from 'axios';    
import { useEffect, useState } from 'react';

export default function homeAdmin() {
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

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const rs = await axios.delete(`http://localhost:8889/auth/deletemenu/${id}`, {
        headers: { Authorization: `Bearer ${token}` } 
      });
      setMenuItems(menuItems.filter(item => item.id !== id));
      console.log(rs.data)
      alert("ลบสินค้าแล้ว");
    } catch (error) {
      console.error('Error deleting menu purchase:', error);
    }
  };

  return (
    <div >
      {menuItems.map((item) => (
        <div key={item.id}  class=" bg-gray-200 w-full m-10">
            <div>
            <img className="w-20" src={item.file} alt=""/>
            </div>
            <div>
            <h3 className="">{item.itemName}</h3>
            </div>
            <div>
            <p className="">ราคา: {item.price}</p>
            </div>
          <button  className='bg-red-500 text-white px-4 py-2 rounded-md' onClick={() => handleDelete(item.id)}>ลบ</button>
          <div className="divider" ></div>
        </div>
      ))}
      <hr />
      <div></div>
    </div>
  );
}
