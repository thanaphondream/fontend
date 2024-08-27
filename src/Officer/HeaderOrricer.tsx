import {Link, useNavigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth';

const guestNav = [
  { to : '/' }
]

const userNav = [
  { to : '/', text: '' }
]




export default function HeaderOrricer() {
  const {user, logout} = useAuth()
  const finalNav = user?.id ? userNav :guestNav


  const navigate = useNavigate()

  const hdlLogout = () => {
    logout()
    navigate('/')
  }
  const hdlhome = () => {
    navigate('/')
  }

 

  return (
<ul className="list-none p-0 m-0">
    <div className="navbar bg-base-100 shadow-md py-4 px-6 flex justify-between items-center">
        <div className="navbar-start">
            <a className="btn btn-ghost text-xl font-semibold text-gray-800 hover:text-primary" onClick={hdlhome}>
                หน้าหลัก
            </a>
        </div>

        <div className="navbar-end">
            {user?.id && (
                <li className="inline-block">
                    <Link to="#" onClick={hdlLogout} className="text-gray-700 hover:text-red-500 font-medium px-4">
                        Logout
                    </Link>
                </li>
            )}
        </div>
    </div>

    <div className="bg-gray-50 py-4 shadow-inner">
        <ul className="flex space-x-4 justify-center">
            {finalNav.map((el) => (
                <li key={el.to} className="text-gray-600 hover:text-blue-600 font-medium">
                    <Link to={el.to} className="px-3 py-2 block rounded hover:bg-gray-200">
                        {el.text}
                    </Link>
                </li>
            ))}
        </ul>
    </div>
</ul>


    )
  }
