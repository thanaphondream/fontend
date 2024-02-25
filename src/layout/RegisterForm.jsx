import axios from 'axios'
import {useState} from "react";

export default function RegisterForm() {
  const [input, setInput] = useState({
    username : '', 
    password : '',
    confirmPassword : '',
    email : '',
    phon : '',
    role : '',
    Address : ''
  })

  const hdlChange = e => {
    setInput( prv => ( { ...prv, [e.target.name] : e.target.value } ) )
  }

  const hdlSubmit = async e => {
    try {
      e.preventDefault()
      // validation
      if(input.password !== input.confirmPassword) {
        return alert('Please check confirm password')
      }
      const rs = await axios.post('http://localhost:8889/auth/register', input)
      console.log(rs)
      if(rs.status === 200) {
        alert('Register Successful')
      }
    }catch(err) {
      console.log( err.message)
    }

  }

  return (
    <div className="p-5 border w-4/6 min-w-[500px] mx-auto rounded mt-5 ">
      <div className="text-3xl mb-5">Register Form</div>
      <form className="flex flex-col gap-2" onSubmit={hdlSubmit}>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text"></span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            name="username"
            value={input.username}
            onChange={ hdlChange }
            placeholder="USERNAME"
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text"></span>
          </div>
          <input
            type="email"
            className="input input-bordered w-full max-w-xs"
            name="email"
            value={input.email}
            onChange={ hdlChange }
            placeholder="Email"
          />
        </label>
        <label className="form-controlbb w-full max-w-xs">
          <div className="label">
            <span className="label-text"></span>
          </div>
          <input
            type="phon"
            className="input input-bordered w-full max-w-xs"
            name="phon"
            value={input.phon}
            onChange={ hdlChange }
            placeholder="PHON"
          />
        </label>
        <label className="form-controlbb w-full max-w-xs">
          <div className="label">
            <span className="label-text">Role</span>
          </div>
          <select
              name="role"
              value={input.role} // หรือ defaultValue={input.role} ถ้าต้องการใช้เฉพาะค่าเริ่มต้น
              onChange={hdlChange}
              className="select select-bordered w-full max-w-xs"
            >
              <option disabled>Select Role</option>
              <option value="ADMIN">Admin</option>
              <option value="USER">User</option>
            </select>

        </label>
          <label className="form-controlbb b w-full max-w-xs">
          <div className="label">
            <span className="label-text"></span>
          </div>
          <input
            type="Address"
            className="input input-bordered w-full max-w-xs"
            name="Address"
            value={input.Address}
            onChange={ hdlChange }
            placeholder="Address"
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text"></span>
          </div>
          <input
            type="password"
            className="input input-bordered w-full max-w-xs"
            name="password"
            value={ input.password }
            onChange={ hdlChange }
            placeholder="Password"
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text"></span>
          </div>
          <input
            type="password"
            className="input input-bordered w-full max-w-xs"
            name="confirmPassword"
            value={input.confirmPassword}
            onChange={ hdlChange }
            placeholder="Confirm Password"
          />
        </label>
        <div className="flex gap-5 ">
          <button type="submit" className="btn btn-outline btn-info mt-7">Submit</button>
          <button type="reset" className="btn btn-outline btn-warning mt-7">Reset</button>
        </div>
      </form>
    </div>
  );
}
