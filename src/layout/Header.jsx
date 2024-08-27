import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useAuth from '../hooks/useAuth';
import img69 from './img/image-131-edited.png';
import './CSS/Header.css';
import 'boxicons/css/boxicons.min.css';
// import { els, res } from './CartOrder/CartOrders';


const userNav = [
  { to: '/', text: 'หน้าหลัก', icon: 'home' },
  { to: '/Usreproduck', text: 'รายการที่ซื้อ', icon: 'list-ul' },
  { to: '/cartorder', text: 'ตะกร้า', icon: 'cart-alt', },
];


export default function Header() {
  const { user, logout } = useAuth();
  const [showLogout, setShowLogout] = useState(false);
  const finalNav = user?.id ? userNav : [];

  const navigate = useNavigate();

  const hdlLogout = () => {
    logout();
    navigate('/');
  };

  const handleProfileClick = () => {
    setShowLogout(!showLogout);
  };

  const handleProfile = () => {
    setShowLogout(false);
  };
  
  const hdhome = () => {
    navigate('/');
  }


  return (
    <div className="navbar bg-base-100">
      <div onClick={hdhome}>
        <img src={img69} alt="Logo" className="h-20 w-20 mx-5 rounded-full" />
        <h1 className="text-xl font-bold">ร้านฮ้าฟฟูล</h1> {/* Updated CSS class */}
      </div>
      <div className="flex-1 mt-10">
        <ul className="menu menu-horizontal px-1">
          {finalNav.map(el => (
            <li key={el.to}>
              <Link to={el.to} onClick={handleProfile}>
                <box-icon name={el.icon} className="mr-2"></box-icon>{el.text}
                {/* <p className='w-6 rounded-full bg-red-600 text-gray-50 text-center'>{el.ta}</p> */}
              </Link>
            </li>
          ))}
        </ul>
        {user?.id && showLogout && (
          <ul className="menu menu-horizontal px-1 ml-auto">
            <li className="bg-red-500 text-white">
              <Link to="#" onClick={hdlLogout}>Logout</Link>
            </li>
          </ul>
        )}
      </div>
      {!showLogout && (
        <div className="flex-none m-5">
          <box-icon name='user'></box-icon>
          <Link
            to="/profile"
            onClick={handleProfileClick}
          >
            {user?.id ? user.username : 'Guest'}
          </Link>
        </div>
      )}
    </div>
  );
}
