import axios from 'axios'
import {useState} from "react";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function RegisterForm() {
  const navigate = useNavigate()
  const [input, setInput] = useState({
    username : '', 
    password : '',
    confirmPassword : '',
    email : '',
    phon : '',
    role : '',
    image: 'https://p16-va.lemon8cdn.com/tos-alisg-i-0000/374f6408e6b44147ac405bc1bbca43b8~tplv-tej9nj120t-origin.webp',
    imagebg: 'https://i.pinimg.com/564x/73/52/4b/73524b16fad4a2ba65c96af556964d72.jpg'
  })

  const hdlChange = e => {
    setInput( prv => ( { ...prv, [e.target.name] : e.target.value } ) )
  }

  const hdlSubmit = async e => {
    try {
      e.preventDefault()
      if(input.password !== input.confirmPassword) {
        Swal.fire({
          title: "รหัสผ่านไม่ตรงกัน?",
          text: "โปรดหรอกรหัสผ่านให้ตรงกัน!!!",
          icon: "question"
        });
      }
      const rs = await axios.post('https://backend-olnc.onrender.com/auth/register', input)
      console.log(rs)
      if(rs.status === 200) {
        Swal.fire({
          position: "center",
          icon: "Register Successful",
          title: "สมัครสมาชิกสำเร็จแล้ว",
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/loing')
      }
    }catch(err) {
      console.log( err.message)
    }

  }

  const re = () => {
    navigate('/loing')
  }

  return (
<div className="p-5 border w-4/6 min-w-[800px] mx-auto rounded mt-5 flex flex-col gap-64">
  <form className="flex flex-col gap-2 p-5" onSubmit={hdlSubmit}>
    <p className="text-3xl mb-5">สมัครสมาชิก</p>
    
    {/* Username Field */}
    <label className="form-control w-full max-w-xs">
      <div className="label"> ชื่อผู้ใช้
        <span className="label-text"></span>
      </div>
      <input
        type="text"
        className="input input-bordered w-full max-w-xs"
        name="username"
        value={input.username}
        onChange={hdlChange}
        placeholder="USERNAME"
      />
    </label>
    
    {/* Email Field */}
    <label className="form-control w-full max-w-xs">
      <div className="label"> อีเมล
        <span className="label-text"></span>
      </div>
      <input
        type="email"
        className="input input-bordered w-full max-w-xs"
        name="email"
        value={input.email}
        onChange={hdlChange}
        placeholder="Email"
      />
    </label>
    
    {/* Phone Field */}
    <label className="form-control w-full max-w-xs">
      <div className="label"> เบอร์โทร
        <span className="label-text"></span>
      </div>
      <input
        type="tel"
        className="input input-bordered w-full max-w-xs"
        name="phon"
        value={input.phon}
        onChange={hdlChange}
        placeholder="PHON"
      />
    </label>
    
    {/* Password Field */}
    <label className="form-control w-full max-w-xs">
      <div className="label"> รหัสผ่าน
        <span className="label-text"></span>
      </div>
      <input
        type="password"
        className="input input-bordered w-full max-w-xs"
        name="password"
        value={input.password}
        onChange={hdlChange}
        placeholder="Password"
      />
    </label>
    
    {/* Confirm Password Field */}
    <label className="form-control w-full max-w-xs">
      <div className="label"> ยืนยันรหัสผ่าน
        <span className="label-text"></span>
      </div>
      <input
        type="password"
        className="input input-bordered w-full max-w-xs"
        name="confirmPassword"
        value={input.confirmPassword}
        onChange={hdlChange}
        placeholder="Confirm Password"
      />
    </label>
    
    {/* Buttons */}
    <div className="flex gap-5 p-5 w-[20rem]">
      <button type="submit" className="btn btn-outline btn-info mt-7 border">สมัคร</button>
      <button type="reset" className="btn btn-outline btn-warning mt-7 border">ล้างข้อมูล</button>
    </div>
    <p className='ml-16 text-cyan-400' onClick={re}>ล็อกอิน</p>
  </form>
  
  {/* Image */}
  <div className='mt-[-58rem] ml-[30rem] border'>
    <img src="https://i.pinimg.com/736x/11/3c/ae/113cae8f3f62647ef9b4c30f089636fd.jpg" alt="" className='h-[40rem] w-[35rem]'/>
  </div>
</div>

  );
}