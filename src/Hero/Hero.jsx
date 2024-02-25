import React from "react";
import './Hero.css'

const Hero = () => {
    return (
        <div className="hero">
            <div className="footer-logo">
                {/* <img src={footer_logo} alt="" /> */}
                {/* <p>SHOOPPER</p> */}
                <br /><br />
            </div>
            <br /><br /><br />
            <ul className="footer-links">
                {/* <li>Company</li>
                <li>Products</li>
                <li>Offices</li>
                <li>About</li>
                <li>Contact</li> */}
            </ul>
            <div className="footer-social-icon">
                <div className="footer-icons-container">
                    {/* <img src={instagram_icon} alt="" /> */}
                </div>
                <div className="footer-icons-container">
                    {/* <img src={pintester_icon} alt="" /> */}
                </div>
                <div className="footer-icons-container">
                    {/* <img src={whatsapp} alt="" /> */}
                </div>
            </div>
            <br /><br /><br />
            <div className="footercopyright">
                <hr />
                <p>Coryright @ 2023 -All Right Reserved.</p>
            </div>
        </div>
    )
}

export default Hero