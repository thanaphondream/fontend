import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import 'boxicons'
// import { connect } from 'react-redux';


const CartOrders = () => {
    const [Cartorders, setPurchases] = useState([])
    const { UserId } = useParams()

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
    
    const handleDelete = async (id) => {
        try{
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:8889/auth/cartdelete/${id}`, {
                headers: { Authorization: `Bearer ${token}` } 
            });
            setPurchases(Cartorders.filter(cartorder => cartorder.id !== id));
            alert("ลบสินค้าแล้ว");
        }catch(err){
            console.error(err)
        }
    }
    console.log(Cartorders)

    const prices = () => {
        let totalPrice = 0;
        Cartorders.forEach(cartorder => {
            totalPrice += cartorder.price;
        });
        if(totalPrice === 0){
            totalPrice = 'ไม่มีสินค้า'
            
        }
        return totalPrice;
    }
    return( 
        <div>
            <div>
            <table className="table-auto border-collapse w-full mx-8">
                <thead>
                    <tr>
                        <th className="px-4 py-2 text-align: center" width="5px">ลำดับ</th>
                        <th className="px-4 py-2 text-align: center" width="300px">รูปภาพ</th>
                        <th className="px-4 py-2 text-align: center" width="300px">ชื่อเมนู</th>
                        <th className="px-4 py-2 text-align: center" width="400px">รายละเอียดสินค้า</th>
                        <th className="px-4 py-2 text-align: center" width="100px">ราคา</th>
                    </tr>
                </thead>
                {Cartorders.map((cartorder, index) => (
                <tbody key={cartorder.id}>
                    <tr>
                        <td className="px-4 py-2 text-align: cente text-centerr">{index + 1}</td>
                        <td className="px-4 py-2 text-align: center flex items-center justify-center">
                            <img src={cartorder.file} alt="" className="w-20" />
                        </td>
                        <td className="px-4 py-2 text-align: center text-center">{cartorder.ItemName}</td>
                        <td className="px-4 py-2 text-align: center white-space: nowrap">{cartorder.description}</td>
                        <td className="px-4 py-2 text-align: center text-center">{cartorder.price}</td>
                        <button className='bg-red-500 text-white px-4 py-2 rounded-md' onClick={() => handleDelete(cartorder.id)}>
                            <box-icon type='solid' name='message-square-x'></box-icon>
                        </button>
                    </tr>
                </tbody>
                ))}
            </table>
            <br />
            <hr />
            <br />
            <h1 className='ml-[70rem] text-2xl font-bold'>ราคารวม: {prices()}</h1>
            <br />
            <div className='ml-[70rem]'>
                <Link to={`/payment/Fs2224SbaRel2Ncvn123444Bncceddd101Mx12Z01`} className="btn btn-outline btn-success">
                    <button className='w-28'>สั่งซื้อ</button>
                </Link>
            </div>
            </div>        
        </div>
    )
}

export default CartOrders