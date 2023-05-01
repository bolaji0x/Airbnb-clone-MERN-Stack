import React, { useState } from 'react'
import { FaArrowUp, FaGlobe, FaTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom'
const Footer = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleToggleClick = () => {
      setIsModalOpen(!isModalOpen);
    };
  return (
    <>
    <div className='footer-container'>

        <div>
            {!isModalOpen && (
            <footer className="footer-modal">
            <button onClick={handleToggleClick} className='cf-btn'><FaTimes className='cf-icon' /></button>
                <div className="bd-container">
                    
                    <div className="footer__content">

                        <div className="footer__links">
                            <h2>Support</h2>
                            <h3><Link className='flink' to="#">Help Center</Link></h3>
                            <h3><Link className='flink' to="#">Aircover</Link></h3>
                            <h3><Link className='flink' to="#">Supporting Peeople with disabiltites</Link></h3>
                            <h3><Link className='flink' to="#">Our COVID-19 Response</Link></h3>
                            <h3><Link className='flink'to="#">Report a neighbborhood concern</Link></h3>
                        </div>
                        <div className="footer__links">
                            <h2>Community</h2>
                            <h3><Link className='flink' to="#">Airbnb.org disaster relief housing</Link></h3>
                            <h3><Link className='flink' to="#">Combating discrimination</Link></h3>
                    
                        </div>

                        <div className="footer__links">
                            <h2>Hosting</h2>
                            <h3><Link className='flink' to="#">Airbnb your home</Link></h3>
                            <h3><Link className='flink' to="#">AirCover for Hosts</Link></h3>
                            <h3><Link className='flink' to="#">Explore housing resources</Link></h3>
                            <h3><Link className='flink' to="#">Visi our community forum</Link></h3>
                            <h3><Link className='flink' to="#">How to hose responsibily</Link></h3>
                            <h3><Link className='flink' to="#">Airbnb friendly apartments</Link></h3>
                        </div>

                        <div className="footer__links">
                            <h2>Airbnb</h2>
                            <h3><Link className='flink' to="#"> Newsroom</Link></h3>
                            <h3><Link className='flink' to="#">Learn about new features</Link></h3>
                            <h3><Link className='flink' to="#">Letter from out founders</Link></h3>
                            <h3><Link className='flink' to="#">Careers</Link></h3>
                            <h3><Link className='flink' to="#">Investors</Link></h3>
                            <h3><Link className='flink' to="#">Gift cards</Link></h3>
                        </div>
                    </div>
                </div>
                
                
            </footer>
            )}
        </div>
            

        <footer className='footer-section'>
            <div className='footer bd-container'>
                <div className='left-footer'>
                    <p className='footer-text'>C 2023 Airbnb, Inc</p>
                    <p className='footer-text'>Terms</p>
                    <p className='footer-text'>Sitemap</p>
                    <p className='footer-text'>Privacy</p>
                    <p className='footer-text'>Your Privacy Choices</p>
                </div>
                <div className='right-footer'>
                    <FaGlobe className='footer-icon' />
                    <p className='footer-text'>N NGN</p>
                    <p className='footer-text'>Support & resources</p>
                    <button onClick={handleToggleClick} className='toggle-fbtn'><FaArrowUp className='footer-icon' /></button>
                </div>
            </div>            
       
            
        </footer>

    </div>
    
    

    
    </>
  )
}

export default Footer