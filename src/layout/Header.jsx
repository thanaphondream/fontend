import {Link, useNavigate, Route} from 'react-router-dom'
import useAuth from '../hooks/useAuth';
import img69 from './img/image-131-edited.png'
import './CSS/Header.css'



const guestNav = [
  { to : '/', text: 'Login' },
  { to : '/register', text: 'Register' },
]

const userNav = [
  { to : '/', text: 'Home' },
  // { to : '/new', text: 'New Todo' },
  {to : '/new', text: 'ร้านค้าแนะนำ'}
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
      <img src={img69} alt="" className='h-20 w-20 mx-5 rounded-full' />
        <ul className="menu menu-horizontal px-1">
          { finalNav.map( el => (
            <li key={el.to} >
              <Link to={el.to}>{el.text}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-none">
      {/* <a className="btn btn-ghost text-xl">Hello, {user?.id ? user.username : 'Guest'}</a> */}
      <a className="btn btn-ghost text-xl">{user?.id ? user.username : 'Guest'}</a>
        <ul className="menu menu-horizontal px-1">
          { user?.id && (
            <li>
              <Link to='#' onClick={hdlLogout}>Logout</Link>
            </li>
          ) }
        </ul>
      </div>
    </div>
  );
}
