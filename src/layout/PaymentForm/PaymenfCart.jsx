import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams} from 'react-router-dom';

const PaymentCart = () => {
    
    const [PaymenfCart, setPurchases] = useState([])
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

    return (
        <div>
        <p>55555555555</p>
        <div>
            {PaymenfCart.map(paymenfcarts => ( 
                <div key={paymenfcarts.id}>
                    <p>{paymenfcarts.ItemName}</p>
                    <p>{paymenfcarts.price}</p>
                </div>
            ))}
        </div>
    </div>
);
}

export default PaymentCart