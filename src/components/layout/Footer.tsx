import { FaFacebook, FaWhatsapp, FaEnvelope, FaHome } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer 
      className="py-4 mt-5"
      style={{ 
        backgroundColor: '#824a39',
        color: '#fdf2e9'
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <img
              src="https://res.cloudinary.com/dlkejgkqk/image/upload/v1752678018/logo_skiner.png"
              alt="Maoki House"
              style={{ width: '150px' }}
            />
            <p className="mt-3">Your local home in Saigon</p>
          </div>

          <div className="col-md-4">
            <h5 className="mb-3">Contact Us</h5>
            <div className="d-flex flex-column">
              <a 
                href="https://www.facebook.com/p/Maoki-House-100090585424824/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="mb-2 text-decoration-none"
                style={{ color: '#fdf2e9' }}
              >
                <FaFacebook className="me-2" /> Our Facebook Page
              </a>
              
              <a 
                href="https://wa.me/84868191581" 
                target="_blank" 
                rel="noopener noreferrer"
                className="mb-2 text-decoration-none"
                style={{ color: '#fdf2e9' }}
              >
                <FaWhatsapp className="me-2" /> +84868191581 (Whatsapp)
              </a>
              
              <a 
                href="mailto:maokihouse.sg@gmail.com"
                className="mb-2 text-decoration-none"
                style={{ color: '#fdf2e9' }}
              >
                <FaEnvelope className="me-2" /> maokihouse.sg@gmail.com
              </a>
              
              <a 
                href="https://www.airbnb.com/users/show/502109503" 
                target="_blank" 
                rel="noopener noreferrer"
                className="mb-2 text-decoration-none"
                style={{ color: '#fdf2e9' }}
              >
                <FaHome className="me-2" /> Our Airbnb Profile
              </a>
            </div>
          </div>

          <div className="col-md-4 text-md-end">
            <p>© {new Date().getFullYear()} Maoki House. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 