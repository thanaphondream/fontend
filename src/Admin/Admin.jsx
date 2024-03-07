import { useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom'; 

export default function ProductForm() {
  const [input, setInput] = useState({
    ItemName: '',
    price: '',
    description: '',
    file: ''
  });

  const hdlChange = e => {
    setInput(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const hdlSubmit = async e => {
    try {
      if(!input.ItemName || !input.price || !input.description || !input.file){
        return alert(`กรุณากรอกข้อความใหม่`)
      }
      e.preventDefault();
      const rs = await axios.post('http://localhost:8889/auth/menutems', input);
      console.log(rs);
      setInput(rs.data);
      alert('Create new OK');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form className="flex flex-col min-w-[600px] border rounded w-5/6 mx-auto p-4 gap-6" onSubmit={hdlSubmit}>
      <div className="text-3xl mb-5 ml-20 font-bold">Create Product</div>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">name</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full"
          name="ItemName"
          value={input.ItemName}
          onChange={hdlChange}
        />
      </label>

      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">price</span>
        </div>
        <input
          type="number"
          placeholder="Type here"
          className="input input-bordered w-full"
          name="price"
          value={input.price}
          onChange={hdlChange}
        />
      </label>

      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">description</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full"
          name="description"
          value={input.description}
          onChange={hdlChange}
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">url</span>
        </div>
        <input
          type="text"
          placeholder="ใส่ลิงค์รูปภาพ"
          className="input input-bordered w-full"
          name="file"
          value={input.file}
          onChange={hdlChange}
        />
      </label>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
}
