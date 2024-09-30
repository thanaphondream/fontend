import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import { useNavigate, Link, useLocation } from 'react-router-dom';

const PaymentForm = () => {
  const location = useLocation();
    const { product } = location.state || {};

    console.log('Product received:', product);
  
    const [ user, setUser ] = useState([])
    const [ locations, setLocations ] = useState([])
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [ locationId, setLocationId ] = useState([])
    const [ lo, setLo ] = useState([])
    const locationIds = localStorage.getItem('loca')
    console.log("ffss",locationIds)
    const user1 = localStorage.getItem('user')
    const [ payments, setPayments ] = useState({
      pay: '',
  })
  const navigate = useNavigate()
  
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

        }else{
        const token = localStorage.getItem('token')
        const rs = await axios.get(`https://backend-olnc.onrender.com/location/location/${locationIds}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
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
    
    const ordersFn = async () => {
      if(lo === '' || lo.length === 0){
        Swal.fire({
            title: "ไม่มีที่อยู่?",
            text: "กรุณาใสที่อยู่ก่อน",
            icon: "question"
          });
      }else if(payments.pay === ''){
      Swal.fire({
          title: "เลือกรายการชำระ?",
          text: "เลือกรายการชำระเพื่อยืนยัน",
          icon: "question"
        });
      }else{
      try{
        const rs = await axios.post('https://backend-olnc.onrender.com/order/orders', {
          total_all: 1,
          allprice: product.price,
          status: 'รอยืนยันการสั้ง',
          date: new Date(),
        })
  
        await axios.post('https://backend-olnc.onrender.com/order/ordercart', {
          total: 1,
          all_price: product.price,
          status: 'ordercart',
          menutemsId: product.id,
          userId: user1,
          orderId: rs.data.order.id
        })
  
        const rspy = await axios.post('https://backend-olnc.onrender.com/payment/payments', {
          userId: user1,
          amount: 1.0,
          pay: 'paydelivery',
          status: 'ชำระแล้ว',
          locationId: lo,
          orderId: rs.data.order.id
        })
        setPayments(rspy.data)
        localStorage.setItem('loca', lo)
        const token = localStorage.getItem('token')
        await axios.get(`https://backend-olnc.onrender.com/payment/linemenu/${rspy.data.payment.id}`,{
            headers: { Authorization: `Bearer ${token}` }
        })
        navigate('/')
      }catch(err){
        console.error(err)
      }
    }
    }
  
  
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
          <div className='p-5'>
                    <div>
        <div className='gap-4 '>
        <label htmlFor="paydelivery"> 
                <div className='w-full border object-cover border-slate-950 h-[5rem]  rounded-lg' >
                    <div className='-p-5'>
                        <input 
                        type="radio" 
                        id="paydelivery" 
                        name="payment" 
                        value="จ่ายเงินสด" 
                        onChange={(e) => setPayments(prev => ({ ...prev, pay: e.target.value }))} 
                    />
                        </div>
                    <div className='text-center'>
                    <div className='flex ml-[32%]'>
                    <box-icon name='money-withdraw' ></box-icon>
                    <p className='font-medium'>จ่ายปลายทาง</p>
                    </div>
                    <p className='text-sm'>ชำระเงินเมื่อได้รับก๋วยเตี๋ยว</p>
                    </div>
                    </div>
                </label>
                <label htmlFor="transfer"> 
                <div className='w-full border object-cover border-slate-950 h-[5rem]  rounded-lg mt-2' >
                    <div className='-p-5'>
                        <input 
                            type="radio" 
                            id="transfer" 
                            name="payment" 
                            value="โอนจ่าย" 
                            onChange={(e) => setPayments(prev => ({ ...prev, pay: e.target.value }))} 
                        />
                    </div>
                    <div className=''>
                    <div className='flex ml-[32%]'>
                    <box-icon name='transfer'></box-icon>
                    <p className='font-medium text-sky-500'>โอนจ่าย</p>
                    </div>
                    <p className='text-sm ml-[29%] text-sky-400'>ชำระเงินเมื่อผ่านการโอน</p>
                    </div>
                    </div>
                </label>
        </div>
        </div>
          </div>

          <div className='mt-4'>
        <p className='font-semibold'>วิธีการการจัดส่ง</p>
        <div className='ml-14 border border-slate-950 w-[15rem] h-[8rem] text-center p-[10%] m-5  rounded-lg'>
        <h1 className='font-medium text-slate-950'>ส่งฟรี</h1>
        <p className='text-sm'>ตั้งแต่ 15-30 ส.ค</p>
      </div>
        </div>
        <div className=''>
        <p className='font-semibold'>สรุปข้อมูลคำสั่งซื้อ</p>
        <div className='p-5'>
          <div className='flex-wrap flex gap-44'>
          <div><p>ยอดรวม ({1} ชิ้น)</p></div>
          <div><p>฿{product.price} </p></div>
          </div>
          <div className='flex-wrap flex gap-56 mt-5'>
                  <div><p>ค่าจัดส่ง</p></div>
                  <div><p>฿{0} </p></div>
            </div>
            <div className="border-b-2 border-sky-900 mt-5 mr-4"></div>
            <div className='flex-wrap flex gap-44 mt-1'>           
                    <div><p className='font-medium'>ยอดรวมทั้งสิ้น:</p></div>
                    <div><p className='text-sky-900 font-medium'>฿{product.price} </p></div>
            </div>
        </div>
        </div>
      
      <button className='btn btn-success w-full mt-2' onClick={ordersFn}>สั้งซื้อ</button>
        </div>
      </div>
        <div  className='w-[48%] bg-zinc-50  ml-[10%] -m-[38%] '>
        <div>
        <h1 className='font-semibold'>เมนูรวมทั้งหมด {1} เมนู {1} จำนวน</h1>
      </div>
        <div>
              <div className='flex overflow-x-auto  ml-4 gap-5 m-5'>
                <br />
                <img src={product.file} alt="" className="w-20 h-20"/>
                <p className='text-sm'>{product.description}</p>
                <p>฿{product.price}</p>
                <p className='ml-10'>จำนวน {1}</p>
                <br /><br />
              </div>
          </div>
      </div>
      </div>
    )
  }

export default PaymentForm;


