import React from "react";
import './Proster.css'
import img1 from '../layout/img/image-131-edited.png'
import img2 from '../layout/img/9df753370d3f57e6d1325129db200f93.gif'


const Proster = () =>{
    return(
        <div className="poster">
          <div className="imgmenu">
          <img src={img1} alt=""/>
          </div>
          <div className="texts">
            <br /><br /><br />
            <p>
              ยินดีต้อนรับสู้ร้านของเรา เรายินดีที่ท่านมาอุดนุนร้านของเรา 
              <br /><br />ร้านของมีสินค้าที่เกี่ยวกับอาหาร สอาด ปลอยภัย
              <br /> เราคัดสานมาอยากดีและทำอาหารเพื่อความตั้งใจเพื่อให้รสชาติที่อารายย 
              <br /><br /> ขอขอบคุณลูกค้าทุกท่านที่มาเลือกอาหารของเรานะครับ
            </p><br />
            <img id="animated-gif" src={img2} alt=""  />
          </div>
          <div>
            
          </div>
        </div>
    )
}

export default Proster