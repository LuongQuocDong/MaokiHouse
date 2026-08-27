import { FaFacebook, FaWhatsapp, FaEnvelope, FaHome } from 'react-icons/fa';
import { CONTACT_LINKS } from '../../constants/contact';

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
              src={CONTACT_LINKS.logoURL}
              alt="Maoki House"
              style={{ width: '150px' }}
            />
            <p className="mt-3">Your local home in Saigon</p>
          </div>

          <div className="col-md-4">
            <h5 className="mb-3">Contact Us</h5>
            <div className="d-flex flex-column">
              <a
                href={CONTACT_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-2 text-decoration-none"
                style={{ color: '#fdf2e9' }}
              >
                <FaFacebook className="me-2" /> Our Facebook Page
              </a>

              <a
                href={CONTACT_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-2 text-decoration-none"
                style={{ color: '#fdf2e9' }}
              >
                <FaWhatsapp className="me-2" /> {CONTACT_LINKS.whatsappDisplay}
              </a>

              <a
                href={CONTACT_LINKS.emailHref}
                className="mb-2 text-decoration-none"
                style={{ color: '#fdf2e9' }}
              >
                <FaEnvelope className="me-2" /> {CONTACT_LINKS.email}
              </a>

              <a
                href={CONTACT_LINKS.airbnb}
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