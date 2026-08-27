import { FaFacebook, FaWhatsapp, FaEnvelope, FaHome } from 'react-icons/fa';
import { CONTACT_LINKS } from '../../constants/contact';

const Footer = () => {
  return (
    <footer
      className="pt-5 pb-4 mt-5"
      style={{
        backgroundColor: 'var(--color-charcoal)',
        color: 'var(--color-cream)'
      }}
    >
      <div className="container">
        <div className="row gy-4">
          <div className="col-md-4">
            <img
              src={CONTACT_LINKS.logoURL}
              alt="Maoki House"
              style={{ width: '150px' }}
            />
            <p className="mt-3 mb-0" style={{ color: 'var(--color-gold-light)', opacity: 0.85, fontStyle: 'italic' }}>
              Your local home in Saigon
            </p>
          </div>

          <div className="col-md-4">
            <h5 className="mb-3 footer-heading">Contact Us</h5>
            <div className="d-flex flex-column">
              <a
                href={CONTACT_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-2 footer-link"
              >
                <FaFacebook className="me-2" /> Our Facebook Page
              </a>

              <a
                href={CONTACT_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-2 footer-link"
              >
                <FaWhatsapp className="me-2" /> {CONTACT_LINKS.whatsappDisplay}
              </a>

              <a
                href={CONTACT_LINKS.emailHref}
                className="mb-2 footer-link"
              >
                <FaEnvelope className="me-2" /> {CONTACT_LINKS.email}
              </a>

              <a
                href={CONTACT_LINKS.airbnb}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-2 footer-link"
              >
                <FaHome className="me-2" /> Our Airbnb Profile
              </a>
            </div>
          </div>

          <div className="col-md-4">
            <h5 className="mb-3 footer-heading">Explore</h5>
            <div className="d-flex flex-column">
              <a href="/" className="mb-2 footer-link">Home</a>
              <a href="/about" className="mb-2 footer-link">About Us</a>
              <a href="/contact" className="mb-2 footer-link">Contact Us</a>
            </div>
          </div>
        </div>

        <div className="footer-divider my-4"></div>

        <div className="text-center">
          <p className="mb-0" style={{ opacity: 0.6, fontSize: '0.9rem' }}>
            &copy; {new Date().getFullYear()} Maoki House. All rights reserved.
          </p>
        </div>
      </div>

      <style>
        {`
          .footer-heading {
            font-family: var(--font-display);
            color: var(--color-gold-light);
            letter-spacing: 0.03em;
          }

          .footer-link {
            color: var(--color-cream);
            opacity: 0.85;
            text-decoration: none;
            transition: opacity 0.25s ease, color 0.25s ease, transform 0.25s ease;
            width: fit-content;
          }

          .footer-link:hover {
            opacity: 1;
            color: var(--color-gold);
            transform: translateX(4px);
          }

          .footer-divider {
            height: 1px;
            background: linear-gradient(90deg, transparent, var(--color-gold), transparent);
            opacity: 0.5;
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;
