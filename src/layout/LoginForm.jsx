import axios from 'axios'
import {useState} from "react";
import useAuth from '../hooks/useAuth'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const navigate = useNavigate()
  const { setUser } = useAuth()
  const [input, setInput] = useState({
    username : '', 
    password : ''
  })

  const hdlChange = e => {
    setInput( prv => ( { ...prv, [e.target.name] : e.target.value } ) )
  }

  const hdlSubmit = async e => {
    try {
      e.preventDefault()
      // validation
      const rs = await axios.post('http://localhost:8889/auth/login', input)
      // console.log(rs.data.token)
      // console.log(rs)
      localStorage.setItem('token', rs.data.token)
      const rs1 = await axios.get('http://localhost:8889/auth/me', {
        headers : { Authorization : `Bearer ${rs.data.token}` }
      })
      // console.log(rs1.data)
      setUser(rs1.data)
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500
      });
      
    }catch(err) {
      console.log( err.message)
    }
  }

  return (
    <div className="p-5 border w-4/6 min-w-[500px] mx-auto rounded mt-5 ">
    <div className="background-image"></div>
  <div className="text-3xl mb-5">Please Login</div>
  <form className="flex flex-col gap-2" onSubmit={hdlSubmit}>
    {/* Username Field */}
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">username</span>
      </div>
      <input
        type="text"
        className="input input-bordered w-full max-w-xs"
        name="username"
        value={input.username}
        onChange={hdlChange}
      />
    </label>

    {/* Password Field */}
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">password</span>
      </div>
      <input
        type="password"
        className="input input-bordered w-full max-w-xs"
        name="password"
        value={input.password}
        onChange={hdlChange}
      />
    </label>

    {/* Submit Button */}
    <div className="flex gap-5">
      <button type="submit" className="btn btn-outline btn-info mt-7">Login</button>
    </div>
  </form>
</div>

  );
}
