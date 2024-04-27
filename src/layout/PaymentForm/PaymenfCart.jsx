import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams} from 'react-router-dom';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const PaymentCart = () => {
    const [formData, setFormData] = useState({
        amount: 1,
        userId: '',
        menuItemsId: '',
        username: '',
        price: '',
        pay: '',
        namemenu: ''
      });
      const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('');
    const [PaymenfCart, setPurchases] = useState([])
    const { UserId } = useParams()
    const [ user, setUser] = useState({})
    useEffect(() => {
        const fetchData = async () => {
            try{
                const token = localStorage.getItem('token')
                const rs = await axios.get(`http://localhost:8889/auth/cartorder`, {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { UserId } 
                  });
                  setPurchases(rs.data);
            }catch(err){
                console.error('Error fetcing data:', err)
            }
        }
        fetchData()
    }, [UserId])

    useEffect(() => {
        const fetchUser = async () => {
          try{
            const token1 = localStorage.getItem('token')
            const response01 = await axios.get(`http://localhost:8889/auth/user`,{
              headers: {Authorization: `Bearer ${token1}`}
            })
            setUser(response01.data)
          }catch (error){
            console.error('Error fetching product:', error)
          }
        }
    
        fetchUser()
      }, [UserId])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.pay === "") {
          Swal.fire({
            title: "กรุณาเลือกวิธีชำระ",
            text: "โปรดเลือกวิธีการชำระเงิน",
            icon: "warning"
          });
          return; 
        }
      
        try {
          Swal.fire({
            title: "ต้องการที่จะชำระเงินหรือไม่",
            text: "คุณต้องการที่จะดำเนินการชำระเงินหรือไม่",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "ใช่, ฉันต้องการชำระเงิน",
            cancelButtonText: "ไม่, ฉันไม่ต้องการชำระเงิน",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33"
          }).then(async (result) => {
            if (result.isConfirmed) {
              try {
                // ส่งข้อมูลไปยังเซิร์ฟเวอร์ของคุณ
                await Promise.all(PaymenfCart.map(async (item) => {
                  const response1 = await axios.post('http://localhost:8889/auth/payment', {
                      productId: item.menuItemsId,
                      amount: formData.amount,
                      userId: formData.userId,
                      menutemsId: formData.menuItemsId,
                      username: formData.username,
                      price: item.price * formData.amount,
                      pay: formData.pay,
                      namemenu:  item.ItemName
                  });
                  console.log('Payment successful:', response1.data);
                }));
                Swal.fire(
                  "ชำระเงินสำเร็จ!",
                  "คุณได้ทำการชำระเงินเรียบร้อยแล้ว",
                  "success"
                );
                navigate('/')
              } catch (error) {
                console.error('Error processing payment:', error);
                setErrorMessage('An error occurred while processing payment. Please try again later.');
              }
            }
          });
        } catch (error) {
          console.error('Error processing payment:', error);
          setErrorMessage('An error occurred while processing payment. Please try again later.');
        }
    };
    
      console.log(formData)

    return (
        <div>
          <br />
          <h1 className='text-center'>ชำระเงิน</h1>
            <br />
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <div>
            {PaymenfCart.map(paymenfcarts => ( 
            <div key={paymenfcarts.id}  className="mb-8">
                <hr /><br />
            <div  className='w-20  mx-auto'>
                <img src={paymenfcarts.file} alt="" className="rounded-lg block w-50" style={{ width: '500px' }}/>
            </div>
            <br />
          <div  className='flex flex-col text-center'>
            <label htmlFor="namemenu" className="text-lg">ชื่อเมนู : </label>
            <input type="text" name='namemenu' id='namemenu' value={formData.namemenu = paymenfcarts.ItemName} onCanPlay={handleChange} className="text-2xl font-bold text-center"  readOnly/>
          </div>
          <br />
          <div className='menuItemsId text-center'>
            <label htmlFor="menuItemsId" className="text-lg ">  MenuID:     </label>
            <input type="text" id="menuItemsId" name="menuItemsId" value={formData.menuItemsId = paymenfcarts.menutemsId} onChange={handleChange}  className="border-2 border-gray-200 p-2 rounded-md mb-4 w-12"  readOnly />
          </div>
          <br />
          <div className="text-center">
            <div className="amount1">
              <label htmlFor="amount" className="text-lg ">Amount:  </label>
              <input type="number" id="amount" name="amount" value={formData.amount} onChange={handleChange} min="1" max="10"  className="border-2 border-gray-200 p-2 rounded-md mb-4 w-20"/>
            </div>
            <br />
            <div className=" text-center">
              <label htmlFor="price" className=" text-center font-bold">price : </label>
              <input className='w-9 font-bold  text-red-600' type="text" name='price' id='price' value={formData.price = paymenfcarts.price * formData.amount} onChange={handleChange} readOnly/>
            </div>
          </div>
          <br /><br />
          <div className="text-center">
            <label htmlFor="userId">User ID :   </label>
            <input type="text" id="userId" name="userId" className='w-12' value={formData.userId = user.id}  onChange={handleChange} />
          </div>
          <br /><br />
          <div  className="text-center  ">
              <label htmlFor="username">UserName : </label>
              <input className='w-16' type="text" name='username' id='username' value={formData.username = user.username} onChange={handleChange} />
            </div>
            </div>
            ))}
        </div>
        <br />
        <hr />
        <br />
        <div className="text-center">
            
        </div>
        <br />
        <div className="text-center">
          <select
              name="pay"
              value={formData.pay} 
              onChange={handleChange}
              className="select select-bordered w-full max-w-xs"
            >
              <option>เลือกวิธีชำระ</option>
              <option value="ปลายทาง">ปลายทาง</option>
              <option value="โอนจ่าย">โอนจ่าย</option>
            </select>
          </div>
          <br />
          <div className='text-center'>
          <button onClick={handleSubmit} className="btn btn-outline btn-success">Pay Now</button>
          </div>
            
    </div>
);
}

export default PaymentCart