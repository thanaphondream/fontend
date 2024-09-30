import axios from 'axios'
import { useState } from "react";
import useAuth from '../hooks/useAuth'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const navigate = useNavigate()
  const { setUser } = useAuth()
  const [input, setInput] = useState({
    username: '', 
    password: ''
  })

  const hdlChange = e => {
    setInput(prv => ({ ...prv, [e.target.name]: e.target.value }))
  }

  const hdlSubmit = async e => {
    try {
      e.preventDefault()
      // validation
      const rs = await axios.post('https://backend-olnc.onrender.com/auth/login', input)
      // console.log(rs.data.token)
      // console.log(rs)
      // console.log("sfsf",rs.data)
      localStorage.setItem('token', rs.data.token)
      
      const rs1 = await axios.get('https://backend-olnc.onrender.com/auth/me', {
        headers: { Authorization: `Bearer ${rs.data.token}` }
      })
      console.log(rs1.data)
      localStorage.setItem('user',rs1.data.id)
      const lo = true
      localStorage.setItem('loca', lo)
      setUser(rs1.data)
      navigate('/')
      Swal.fire({
        position: "center",
        icon: "success",
        title: "ยินดีต้อนรับสู่ร้านของเรานะครับ",
        showConfirmButton: false,
        timer: 1500
      });
      
    } catch(err) {
      console.log(err.message)
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด!",
        text: "ไม่สามารถล็อกอินได้!",
        footer: '<a href="#">ตรวจสอบรหัสผ่าน?</a>'
      });
    }
  }

  const re = () => {
    navigate('/register')
  }

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row lg:justify-between lg:items-center">
        {/* Left Section - Text */}
        <div className="text-center lg:text-left lg:max-w-lg">
          <h1 className="text-5xl font-bold">ล็อกอินเพื่อเข้าสู่ระบบ!</h1>
          <p className="py-6 text-gray-600">
            ทำการล็อกอินเพื่อมาเป็นส่วนของร้านเรากับเมนูเตี๋ยวมากมาย เช่น ก๋วยเตี๋ยวเรือที่มีความนิยมแพร่หลาย 
            ก๋วยเตี๋ยวต้มยำที่มีความเผ็ดแซ็บอร่อย ก๋วยเตี๋ยวน้ำข้มน้ำใสที่อร่อยและคุ้มค่า และอื่นๆ ทั้งสะอาด ปลอดภัย และจัดส่งเร็ว คุ้มค่า คุ้มราคาแน่นนอน<br /><br />
            มาเป็นส่วนหนึ่งเพื่ออุดหนุนร้านเรานะครับ
          </p>
        </div>
  
        {/* Right Section - Login Form */}
        <div className="card bg-base-100  max-w-sm shadow-2xl w-[50rem]">
          <div className="p-6 mx-auto rounded-lg">
            <h2 className="text-3xl font-semibold mb-5">ล็อกอิน</h2>
            <form className="flex flex-col gap-4" onSubmit={hdlSubmit}>
              {/* Username Field */}
              <label className="form-control">
                <span className="label-text text-lg">ชื่อผู้ใช้</span>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  name="username"
                  value={input.username}
                  onChange={hdlChange}
                  placeholder="กรอกชื่อผู้ใช้"
                />
              </label>
  
              {/* Password Field */}
              <label className="form-control">
                <span className="label-text text-lg">รหัสผ่าน</span>
                <input
                  type="password"
                  className="input input-bordered w-full"
                  name="password"
                  value={input.password}
                  onChange={hdlChange}
                  placeholder="กรอกรหัสผ่าน"
                />
              </label>
  
              {/* Submit Button */}
              <button type="submit" className="btn btn-info btn-block mt-4">
                ล็อกอิน
              </button>
            </form>
  
            {/* Register Link */}
            <p className="text-cyan-400 text-center mt-4 cursor-pointer" onClick={re}>
              สร้างบัญชี
            </p>
          </div>
        </div>
      </div>
    </div>
  );
  
}
