import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './getProductById.css';
import Swal from 'sweetalert2';
import 'boxicons'

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState({});
  const [review, setReview] = useState({ 
    rating: 0, 
    comment: '',    
    userId: 1 ,
    menutemsId: id
  })
  const [ user, setUser ] =useState([])
  const [ reviews, setReviews ] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8889/auth/getproduct/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setProduct(response.data);

        const rs = await axios.get('http://localhost:8889/auth/user', {
          headers: { Authorization: `Bearer ${token}`}
        })

        setUser(rs.data)
        console.log(rs.data)

        const rsreviews = await axios.get(`http://localhost:8889/auth/reviewproduct/${id}`,{
          headers: { Authorization: `Bearer ${token}` }
        })
        setReviews(rsreviews.data)
        // console.log(rsreviews.data)
        // rsreviews.data.map(m => {
        //   console.log(m.id)
        //   m.Reviews.map(p => {
        //     console.log(p.id)
        //   })
        // })
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleOrder = () => {
    console.log(`Ordering product with ID ${product.id}`);
  };

  const handleAddToCart = () => {
    console.log(`Adding product with ID ${product.id} to cart`);
  };

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReview((prevReview) => ({ ...prevReview, [name]: value }));
  };

  const handleRatingChange = (e) => {
    setReview((prevReview) => ({ ...prevReview, rating: parseInt(e.target.value) }));
  };

  const handleReviewSubmit = async () => {
    if(review.comment === "" || review.rating === 0) {
      Swal.fire({
        title: "หรอกข้อความคอมเม้นในคอมเม้นด้วยและให้ดาวด้วย",
        text: "โปรดใสข้อความ !!",
        icon: "warning"
      });
    }else{
      try {
        review.userId = user.id
        const response = await axios.post('http://localhost:8889/auth/reviews', review, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        console.log('Review submitted:', response.data);
        window.location.reload();
      } catch (error) {
        console.error('Error submitting review:', error);
      }
    }
  
  };

  const LinkId = () => {
    navigate('/PaymentForm', { state: { product } })
  }

  const forrating = (i) => {

    return (
      <div>
      {Array(i).fill(null).map((_, index) => (
          <box-icon type='solid' name='star'></box-icon>
        ))}
    </div>
    )
  }

  console.log("seif", product)
  return (
    <div className="product-detail-container">
      <div className='imgs ml-56'>
        <img alt="" src={product.file} />
      </div>
      <div className="boxs border-sky-500">
        <br /><br />
        {/* <hr /> */}
        <h2>ชื่อเมนู: {product.ItemName}</h2>
        <br /><br />
        <p>คำอธิบาย: <br /> {product.description}</p>
        <br />
        <p>ราคา: {product.price}</p>
        <hr /><br />
        <hr />
        <br />
        <div className='border-sky-500'>
          <div>

              <button className='btn btn-outline btn-success' onClick={LinkId}>สั่งซื้อ</button>

          </div>
          </div>
      </div>
      {/* <div className='justify-items-start border-solid border-2  w-[80%] p-10'> */}
      <div className='justify-items-start border-solid  w-[80%] p-10'>
          <div>
          <div>
            <hr />
            <div className="rating rating-lg">
              <input type="radio" name="rating" value={1} onChange={handleRatingChange} className="mask mask-star-2" />   
              <input type="radio" name="rating" value={2} onChange={handleRatingChange} className="mask mask-star-2" />
              <input type="radio" name="rating" value={3} onChange={handleRatingChange} className="mask mask-star-2" defaultChecked />
              <input type="radio" name="rating" value={4} onChange={handleRatingChange} className="mask mask-star-2" />
              <input type="radio" name="rating" value={5} onChange={handleRatingChange} className="mask mask-star-2" />
            </div>
            <br />
           <div>
           <input
              type="text"
              name="comment"
              value={review.comment}
              onChange={handleReviewChange}
              placeholder="Type here"
              className="input input-bordered input-lg w-full max-w-xs"
            />
           </div>
            <button onClick={handleReviewSubmit} className='btn btn-info mt-5'>โพสต์เพื่อรีวิว</button>
          </div>
        </div>
        <br />
        <hr />
        <div className=''>
          { reviews.map(items => (
            <div key={items.id}>
                
                {items.Reviews.map(item => (
                  <div key={item.id}>
                      <p>{item.user.email}</p>
                     <div className="rating rating-lg">
                      {forrating(item.rating)}
                    </div>
                    <p>{item.comment}</p>
                    <hr />
                  </div>
                ))}
            </div>
          ))}
        </div>
          </div>
    </div>
  );
}
