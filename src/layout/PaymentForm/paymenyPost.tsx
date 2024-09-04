import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const paymenyPost = (props) => {
    const { el, lo} = props
    const navigate = useNavigate()
    const user = localStorage.getItem('user')
    console.log("el is props ", lo)
    const [ payments, setPayments ] = useState({
        pay: '',
    })
    // el.map(l => {
    //     console.log("ffas",l.userId)
    // })

    const allpost = () => {
        const all_priceSum = el.reduce((sum, item) => sum + item.all_price, 0)
        const totals = el.reduce((sum, item) => sum + item.total, 0)
        // console.log('All Price Sum:', all_priceSum);
        return { all_priceSum, totals }
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
                const { all_priceSum, totals } = allpost();
                const rs = await axios.post('http://localhost:8889/order/orders', {
                    total_all: totals,
                    allprice: all_priceSum,
                    status: 'รอยืนยันการสั้ง',
                    date: new Date(),
                    // userId: el.map(l => l.userId),
                    // menutemsId: el.map(l => l.menutemsId),
                    // total: el.map(l => l.total),
                    // all_price: el.map(l => l.all_price)
                })
                
                el.map(async(l) => {
                    console.log("el is : ", l, rs.data.order.id)
                const rx = await axios.post('http://localhost:8889/order/ordercart',{
                    total: l.total, 
                    all_price: l.all_price,
                    status: 'ordercart',
                    menutemsId: l.menutemsId,
                    userId: l.userId,
                    orderId: rs.data.order.id
                })
                })
                paymentPost(rs.data)
            }catch(err){
                console.error(err)
            }
        }
    }
    
    const paymentPost = async (rs) => {
        try{
            
            let mony = ''
            if(payments.pay === 'โอนจ่าย'){
                mony = 'ยังไม่ชำระการโอน'
            }else{
                mony = 'ชำระปลายทาง'
            }

            const rspy = await axios.post('http://localhost:8889/payment/payments',{
                userId: user,
                amount: 1.0,
                pay: payments.pay,
                status: mony,
                locationId: lo,
                orderId: rs.order.id
            })
            setPayments(rspy.data)
            localStorage.setItem('loca', lo)
            const token = localStorage.getItem('token')
            await axios.get(`http://localhost:8889/payment/linemenu/${rspy.data.payment.id}`,{
                headers: { Authorization: `Bearer ${token}` }
            })

            deletecart()
            
            if( rspy.data.payment.pay === 'โอนจ่าย'){
                const pay_Id = rspy.data.payment.id
                navigate('/pay', {state: { pay_Id }})
            }else{
                navigate('/')
            }
        }catch(err){
            console.error(err)
        }
    }

    const deletecart = async () => {
        try{
           el.map(async(l) => {
            await axios.delete(`http://localhost:8889/cart/carts/${l.id}`)
           })
        }catch(err){
            console.error(`เกิดข้อผิพลาด ${err}`)
        }
    }
    const Summary = () => {
        const totals = el.reduce((sum, item) => sum + item.total, 0)
        const all_priceSum = el.reduce((sum, item) => sum + item.all_price, 0)

        return(
            <div className='p-5'>
                <div className='flex-wrap flex gap-44'>
                    <div><p>ยอดรวม ({totals} ชิ้น)</p></div>
                    <div><p>฿{all_priceSum} </p></div>
            </div>
            <div className='flex-wrap flex gap-56 mt-5'>
                    <div><p>ค่าจัดส่ง</p></div>
                    <div><p>฿{0} </p></div>
            </div>
            <div className="border-b-2 border-sky-900 mt-5 mr-4"></div>
            <div className='flex-wrap flex gap-44 mt-1'>           
                    <div><p className='font-medium'>ยอดรวมทั้งสิ้น:</p></div>
                    <div><p className='text-sky-900 font-medium'>฿{all_priceSum} </p></div>
            </div>
            </div>
        )
    }
  return (
    <div className='p-5'>
        <p>{el.total}</p>
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
        <div className='mt-4'>
        <p className='font-semibold'>วิธีการการจัดส่ง</p>
        <div className='ml-14 border border-slate-950 w-[15rem] h-[8rem] text-center p-[10%] m-5  rounded-lg'>
        <h1 className='font-medium text-slate-950'>ส่งฟรี</h1>
        <p className='text-sm'>ตั้งแต่ 15-30 ส.ค</p>
      </div>
        </div>

        <div className=''>
        <p className='font-semibold'>สรุปข้อมูลคำสั่งซื้อ</p>
        {Summary()}
        </div>
      
      <button className='btn btn-success w-full mt-2' onClick={ordersFn}>สั้งซื้อ</button>
    </div>
  )
}

export default paymenyPost