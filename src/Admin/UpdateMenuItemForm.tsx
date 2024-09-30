import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

const FileInputComponent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [item, setItem] = useState({
    ItemName: '',
    price: '',
    description: '',
    file: ''
  });
  const [imageUrl, setImageUrl] = useState(''); // Store the image URL to display the selected image

  useEffect(() => {
    const fetchMenuItem = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://backend-olnc.onrender.com/auth/getproduct/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setItem(response.data);
        if (response.data.file) {
          setImageUrl(response.data.file); // Display the current image if it exists
        }
      } catch (error) {
        console.error('Error fetching menu item:', error);
      }
    };

    fetchMenuItem();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem(prevItem => ({
      ...prevItem,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setItem(prevItem => ({
      ...prevItem,
      file
    }));

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result); // Preview the selected image
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('ItemName', item.ItemName);
      formData.append('price', item.price);
      formData.append('description', item.description);

      console.log("file: ", item.file)
      formData.append('file', item.file); 


      const token = localStorage.getItem('token');
      const rs = await axios.put(`https://backend-olnc.onrender.com/auth/munus/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        }
      });

      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">อัพเดพเมนู</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="ItemName" className="block text-sm font-medium text-gray-700">ชื่อเมนู</label>
          <input
            type="text"
            id="ItemName"
            name="ItemName"
            value={item.ItemName}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">ราคา</label>
          <input
            type="number"
            id="price"
            name="price"
            value={item.price}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">รายละเอียด</label>
          <textarea
            id="description"
            name="description"
            value={item.description}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
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

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            อัพเดพ
          </button>
          <Link
            to="/"
            className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            ยกเลิก
          </Link>
        </div>
      </form>
    </div>
  );
};

export default FileInputComponent;

