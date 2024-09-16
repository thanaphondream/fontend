import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const guestNav = [
  { to: '/' }
];

const userNav = [
  { to: '/', text: 'Home' }
];

export default function HeaderAdmin() {
  const { user, logout } = useAuth();
  const finalNav = user?.id ? userNav : guestNav;

  const navigate = useNavigate();

  const hdlLogout = () => {
    logout();
    navigate('/');
  };
  const hdlProduct = () => {
    navigate('/Admin');
  };
  const hdlHome = () => {
    navigate('/');
  };
  const hdMyGrach = () => {
    navigate('/Grach');
  };

  const hdRole = () => {
    navigate('/updaterole')
  }

  const hdlorderconfirm = () => {
    navigate('/confirmorder')
  }

  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold cursor-pointer" onClick={hdlHome}>
          เจ้าของร้าน
        </div>
        <nav className="ml-auto flex space-x-4">
        <a className="hover:text-gray-400 cursor-pointer" onClick={hdlorderconfirm}>
            ยืนยันคำสั่งซื้อ
          </a>
          <a className="hover:text-gray-400 cursor-pointer" onClick={hdlProduct}>
            เพิ่มเมนู
          </a>
          {/* <a className="hover:text-gray-400 cursor-pointer" onClick={hdRole}>
            roleUpdate
          </a> */}
          <a className="hover:text-gray-400 cursor-pointer" onClick={hdMyGrach}>
            ดูยอดขาย
          </a>
          {user?.id && (
            <Link
              to="#"
              onClick={hdlLogout}
              className="hover:text-gray-400 cursor-pointer text-red-600"
            >
              ล็อกเอาท์
            </Link>
          )}
          {/* {finalNav.map(el => (
            <Link
              key={el.to}
              to={el.to}
              className="hover:text-gray-400 cursor-pointer"
            >
              {el.text || 'Home'}
            </Link>
          ))} */}
        </nav>
      </div>
    </header>
  );
}
