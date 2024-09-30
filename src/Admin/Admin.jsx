import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ProductForm() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    ItemName: '',
    price: '',
    description: '',
    file: null
  });
  const [imageUrl, setImageUrl] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput(prevItem => ({
      ...prevItem,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setInput(prevItem => ({
      ...prevItem,
      file: file
    }));

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImageUrl('');
    }
  };

  const hdlSubmit = async e => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('ItemName', input.ItemName);
      formData.append('price', input.price);
      formData.append('description', input.description);
      formData.append('image', input.file);
      const token = localStorage.getItem('token');
      const rs = await axios.post('https://backend-olnc.onrender.com/auth/menutems', formData ,{
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    )

      console.log(rs);
      setInput({
        ItemName: '',
        price: '',
        description: '',
        file: null
      });
      setImageUrl('');
      navigate('/');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form className="flex flex-col min-w-[600px] border rounded w-5/6 mx-auto p-4 gap-6" onSubmit={hdlSubmit}>
      <div className="text-3xl mb-5 ml-20 font-bold">เพิ่มเมนู</div>
      
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">ชื่อเมนู</span>
        </div>
        <input
          type="text"
          // placeholder="Type here"
          className="input input-bordered w-full"
          name="ItemName"
          value={input.ItemName}
          onChange={handleChange}
        />
      </label>

      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">ราคา</span>
        </div>
        <input
          type="number"
          // placeholder="Type here"
          className="input input-bordered w-full"
          name="price"
          value={input.price}
          onChange={handleChange}
        />
      </label>

      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">รายละเอียด</span>
        </div>
        <input
          type="text"
          // placeholder="Type here"
          className="input input-bordered w-full"
          name="description"
          value={input.description}
          onChange={handleChange}
        />
      </label>

      <div className="mb-4">
        <label htmlFor="file" className="block text-sm font-medium text-gray-700">รูปภาพ</label>
        <input
          type="file"
          id="file"
          name="file"
          onChange={handleFileChange}
          className="mt-1 block w-full"
        />
      </div>

      {imageUrl && <img src={imageUrl} alt="Selected" className="mb-4" />}

      <button type="submit" className="btn btn-primary">ยืนยัน</button>
    </form>
  );
}

