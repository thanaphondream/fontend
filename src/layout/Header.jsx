import {Link, useNavigate, Route} from 'react-router-dom'
import useAuth from '../hooks/useAuth';
import img69 from './img/image-131-edited.png'
import './CSS/Header.css'



const guestNav = [
  { to : '/', text: 'Login' },
  { to : '/register', text: 'Register' },
]

const userNav = [
  { to : '/', text: 'หน้าหลัก' },
  {to : '/Usreproduck', text: 'รายการที่ซื้อ'}
]

export default function Header() {
  const {user, logout} = useAuth()
  const finalNav = user?.id ? userNav : guestNav

  const navigate = useNavigate()

  const hdlLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <ul className="menu menu-horizontal px-1">
          { finalNav.map( el => (
            <li key={el.to} >
              <Link to={el.to}>{el.text}</Link>
            </li>
          ))}
        </ul>
        <ul className="menu menu-horizontal px-1">
          { user?.id && (
            <li className='bg-red-500 text-white ml-[50rem]'>
              <Link to='#' onClick={hdlLogout}>Logout</Link>
            </li>
          ) }
        </ul>
      </div>
      <div className="flex-none">
      <img src={img69} alt="" className='h-20 w-20 mx-5 rounded-full' />
      <h1>ร้านฮ้าฟฟูล </h1>
      <a className="btn btn-ghost text-xl">{user?.id ? user.username : 'Guest'}</a>
      </div>
    </div>
  );
}
