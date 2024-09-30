import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams} from 'react-router-dom';
import Swal from 'sweetalert2';
import { useNavigate,  useLocation, Link } from 'react-router-dom';
import Modal from 'react-modal';
import PaymenyPost from './paymenyPost';

const PaymentCart = () => {
  const location = useLocation();
  const { selectedCartItems } = location.state || {};
  console.log(selectedCartItems)
  // const rq = selectedCartItems[0]
  const [ user, setUser ] = useState([])
  const [ locations, setLocations ] = useState([])
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [ locationId, setLocationId ] = useState([])
  const [ lo, setLo ] = useState([])
  const locationIds = localStorage.getItem('loca')
  console.log("ffss",locationIds)
  

  useEffect(() => {
    const Data_all = async () => {
      try{
        const token = localStorage.getItem('token')
        const rsUser = await axios.get('https://backend-olnc.onrender.com/auth/user', {
          headers: { Authorization: `Bearer ${token}` },
        })
        setUser(rsUser.data)

        const rslocation = await axios.get('https://backend-olnc.onrender.com/location/locationid', {
          headers: { Authorization: `Bearer ${token}` },
        })
        setLocations(rslocation.data)
        console.log("df",rslocation.data)

      }catch(err){
        console.error(`เกิดข้อผิดพลาด ${err}`)
      }
    }
    Data_all()
    locationIdShow()
    // rqA1()
  }, [])

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const model = () => {
    return(
      <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="เลือกที่อยู่"
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          maxWidth: '600px',
        }
      }}
    >
      <h2 className='text-center'>เลือกที่อยู่</h2>
      {locations.length > 0 ? (
       <div className='p-8'>
         <ul>
          {locations.map((location, index) => (
            <li className='border border-sky-100 p-2' key={index} onClick={() => locationIdShow(location.id)}> 
            จังหวัด {location.provinces}  
            อำเภอ {location.amphures} 
            ตำบล {location.districts} 
            ถนน {location.road} 
            หมู่บ้านที่ {location.village} 
            บ้านเลขที่  {location.house_number} 
            และอื่นๆ  {location.other} 
            รหัสไปรษณีย์: {location.zip_code}</li>
          ))}
        </ul>
       </div>
      ) : (
        <p>ยังไม่มีที่อยู่</p>
      )}
      <button onClick={closeModal}>ปิด</button>
      <Link  to={`/location`}>
            <button className="btn">เลือกข้อมูล</button>
        </Link>
    </Modal>
    )
  }

  const locationIdShow = async (los) => {
    try{
      console.log("fafa",los)
      if(los){
        const token = localStorage.getItem('token')
      const rs = await axios.get(`https://backend-olnc.onrender.com/location/location/${los}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setLocationId(rs.data)
      setLo(rs.data.id)
      // const user1 = localStorage.getItem('user')
      // // console.log("user Is 88888", rs.data.userId, user1, rs.data)
      // // console.log(rs.data.userId == user1, "fsfsfsf")
      // if (rs.data.userId === user1) {
      //   setLo(rs.data.id);
      // } else {
      //   setLo('');
      // }
      }else{
      const token = localStorage.getItem('token')
      const rs = await axios.get(`https://backend-olnc.onrender.com/location/location/${locationIds}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const user1 = localStorage.getItem('user')
      // console.log("user Is 88888", rs.data.userId, user1, rs.data.id)
      // console.log(rs.data.userId == user1, "fsfsfsf")
      setLocationId(rs.data)

      if (rs.data.userId == user1) {
        setLo(rs.data.id);
      } else {
        setLo('');
      }
      }
      closeModal()
    }catch(err){
      console.log(err)
    }
  }

  // const rqA1 = () => {
  //   console.log("ffsfafafaffafaf",locationId)
  //   const user1 = localStorage.getItem('user')
  //   console.log("user Is 88888", locationId.userId, user1, locationId.id)
  //     if (locationId.userId === user1) {
  //       setLo(locationId.id);
  //     } else {
  //       setLo('');
  //     }
  // }

  const patget = () => {
    const totalSum = selectedCartItems.length;
    const total = selectedCartItems.reduce((sum, item, index) => sum + item.total, 0);

    return(
      <div>
        <h1 className='font-semibold'>เมนูรวมทั้งหมด {totalSum} เมนู {total} จำนวน</h1>
      </div>
    )  
  };
 
  // console.log("ffs88888888888122", lo)

  return(
    <div>
      <div className='flex-wrap flex content-center gap-10 justify-center p-1'>
      <div className='bg-zinc-50 w-[48%] h-[8rem] p-2'>
        <p className='ml-4 font-semibold'>ที่อยู่ในการจัดส่ง</p>
        <p className='ml-4 font-medium'>{user.username}  {user.phon}</p>
        <div className='ml-[35rem] -mt-10'>
          <button className='bg-teal-300 rounded-lg ' onClick={openModal}>แก้ไขที่อยู่</button>
        </div>  
        {model()}
        {locations.length ? (
        <div className='m-5 font-medium'>
          {locations.map((location, index) => (
            <p key={index}></p>

          ))}
          <p >จังหวัด {locationId.provinces} 
            อำเภอ {locationId.amphures} 
            ตำบล {locationId.districts} 
            ถนน {locationId.road} 
            หมู่บ้านที่ {locationId.village} 
            บ้านเลขที่  {locationId.house_number} 
            และอื่นๆ  {locationId.other} 
            รหัสไปรษณีย์: {locationId.zip_code}</p>
        </div>
      ) : (
        <div className='text-center mt-5'>
          <p>ยังไม่มีที่อยู่</p>
          <Link  to={`/location`}>
            <button className="btn">เลือกข้อมูล</button>
        </Link>
        </div>
      )}
      </div>

      <div className='w-[30%] bg-zinc-50 '>
        <p className='font-semibold ml-4 mt-2'>เลือกวิธีการชำระ</p>
        <PaymenyPost  el={selectedCartItems} lo={lo} />
      </div>
    </div>
    <div  className='w-[48%] bg-zinc-50  ml-[10%] -m-[32rem] p-2'>
    {patget() }

     
        <div>
        {selectedCartItems.map((item, index) => (
            <div key={item.id} className='flex overflow-x-auto  ml-4 gap-5 m-5'>
              <br />
              <img src={item.menutems.file} alt="" className="w-20 h-20"/>
              <p className='text-sm'>{item.menutems.description}</p>
              <p>฿{item.all_price}</p>
              <p className='ml-10'>จำนวน {item.total}</p>
              <br /><br />
            </div>
        ))}
        </div>
    </div>
    </div>
  )
}

export default PaymentCart