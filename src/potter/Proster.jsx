import React from "react";
import './Proster.css'
import img1 from '../layout/img/image-131-edited.png'
import img2 from '../layout/img/423422491_312187558510202_7161949334469326633_n.png'


const Proster = () =>{
    return(
        <div className="poster">
            <div className="hero-left">
                <h2> NEW ARRIVALS ONLY</h2>
                <div>
                    <div className="hero-hand-icon">
                        <p>ใหม่</p>
                        {/* <img src={hand_icon} alt="" /> */}
                    </div>
                    <p>ก๋วยเตี๋ยว</p>
                    <p>ร้าน ฮ้าฟฟูลล</p>
                </div>
                <div className="hero-latest-btn">
                    {/* <img src={arrow_icon} alt="" /> */}
                </div>
            </div>
            <div className="carousel w-full">
  <div id="slide1" className="carousel-item relative w-full">
    <img src={img1} className="w-full cccc" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide4" className="btn btn-circle">❮</a> 
      <a href="#slide2" className="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide2" className="carousel-item relative w-full">
    <img src={img2} className="w-full cccc" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide1" className="btn btn-circle">❮</a> 
      <a href="#slide3" className="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide3" className="carousel-item relative w-full">
    <img src="https://i.pinimg.com/564x/dc/80/6d/dc806ddc96d2467c5f7e1bba46acc6fe.jpg" className="w-full cccc" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide2" className="btn btn-circle">❮</a> 
      <a href="#slide4" className="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide4" className="carousel-item relative w-full">
    <img src="https://i.pinimg.com/564x/11/69/df/1169df8b2573bdc0f6a892b281ca75b0.jpg" className="w-full cccc" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide3" className="btn btn-circle">❮</a> 
      <a href="#slide1" className="btn btn-circle">❯</a>
    </div>
  </div>
</div>

        </div>
    )
}

export default Proster