import axios from 'axios';
import React, { useState, useEffect } from 'react';
import 'boxicons'
import Header from './Header';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [image, setImage] = useState('');
  const [imagebg, setImagebg] = useState('');
  const [ user, setUser ] = useState([])


  useEffect(() => {
    const profileShow = async () => {
      try {
        const token = localStorage.getItem('token');
        const rs = await axios.get('http://localhost:8889/auth/profileuser', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(rs.data);

        const rsuser = await axios.get('http://localhost:8889/auth/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
       
        setUser(rsuser.data)
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    profileShow();
  }, []);


  
  const handleApiimg = async (e) => {
    const imagebg = e.target.files[0];
    setImage(imagebg);

    if (imagebg) {
      const formData = new FormData();
      formData.append('image', imagebg);

      try {
        const token = localStorage.getItem('token');
        const response = await axios.put(
          `http://localhost:8889/auth/profileupdatebg/${profile.id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        console.log(response.data);
        window.location.reload();
      } catch (err) {
        console.error('Error uploading image:', err);
      }
    }
  };

  const mgbg = async (e) => {
    const file = e.target.files[0];
    setImagebg(file);
  
    if (file) {
      const formData = new FormData();
      formData.append('image', file); 
  
      try {
        const token = localStorage.getItem('token');
        const response = await axios.put(
          `http://localhost:8889/auth/profileupdate/${profile.id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
  
        console.log(response.data);
        window.location.reload();
      } catch (err) {
        console.error('Error uploading image:', err);
      }
    }
  };

  return (
    <div>
      <div className='h-[10%] bg-slate-500'></div>
      {profile && (
        <div>
           <div className='h-[10%]' >
            <img src={profile.imagebg || ''} alt="Profile"  className="w-full h-screen object-cover"/>
            <div className='mt-[-4rem]  bg-slate-950 '>
            <label 
              htmlFor="fileInputBg"
              className="flex flex-col items-center justify-center w-32 h-32border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-300 "
            >
              <span className="bg-zinc-50 w-32 h-8 text-center rounded-2xl"><box-icon name='edit-alt' type='solid' ></box-icon>แก้ไขรูปภาพ</span>
              <input
                  id="fileInputBg"
                  type="file"
                  onChange={handleApiimg}
                  className="hidden"
                  name='image'
                />
            </label>
            </div>
            
          </div>
          <div className='mt-[-5rem] '>
          <img src={profile.image || ''} alt="Profile" className='w-64 h-64 rounded-full object-cover ml-auto mr-auto'/>
          <div className='ml-[45rem] mt-[-3rem] '>
          <label 
              htmlFor="fileInputProfile" 
              className="flex flex-col items-center justify-center w-32 h-32border-2 border-gray-300 border-dashed cursor-pointer">
              <span className=" w-32  text-center rounded-2xl"><box-icon type='solid' name='camera'></box-icon></span>
              <input
                  id="fileInputProfile"
                  type="file"
                  onChange={mgbg}
                  className="hidden"
                  name='imagebg'
                />
            </label>
          </div>
          </div>
        </div>
      )}
      <div className='text-center mt-14 text-4xl'>
        <h1>{user.username}</h1>
        <h1>{user.email}</h1>
        <h1>{user.phon}</h1>
        </div>
    </div>
  );
};

export default Profile;
