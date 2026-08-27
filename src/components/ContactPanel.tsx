import { useState } from 'react';
import { CONTACT_LINKS } from '../constants/contact';

const ContactPanel = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="floating-contact-btn"
        aria-label={isOpen ? 'Close contact panel' : 'Open contact panel'}
      >
        <i className={`bi ${isOpen ? 'bi-x-lg' : 'bi-chat-dots-fill'}`}></i>
      </button>

      {/* Contact Panel */}
      <div className={`contact-panel ${isOpen ? 'open' : ''}`}>
        <div className="contact-panel-header">
          <h3>Need Help? We are here for you</h3>
        </div>
        
        <div className="contact-panel-content">
          <a href={CONTACT_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="contact-item">
            <i className="bi bi-facebook contact-icon"></i>
            <span>Our Facebook Page</span>
          </a>

          <a href={CONTACT_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="contact-item">
            <i className="bi bi-whatsapp contact-icon"></i>
            <span>{CONTACT_LINKS.whatsappDisplay}</span>
          </a>

          <a href={CONTACT_LINKS.emailHref} className="contact-item">
            <i className="bi bi-envelope contact-icon"></i>
            <span>{CONTACT_LINKS.email}</span>
          </a>

          <a href={CONTACT_LINKS.airbnb} target="_blank" rel="noopener noreferrer" className="contact-item">
            <i className="bi bi-house-heart contact-icon"></i>
            <span>Our Airbnb Profile</span>
          </a>
        </div>

        <style>
          {`
            .floating-contact-btn {
              position: fixed;
              bottom: 2rem;
              right: 2rem;
              width: 60px;
              height: 60px;
              border-radius: 50%;
              background: linear-gradient(135deg, var(--color-gold), var(--color-primary));
              color: var(--color-cream);
              border: none;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 24px;
              box-shadow: var(--shadow-elevated);
              transition: all 0.3s ease;
              z-index: 1000;
            }

            .floating-contact-btn:hover {
              transform: scale(1.06);
              filter: brightness(1.08);
            }

            .contact-panel {
              position: fixed;
              bottom: 6rem;
              right: 2rem;
              width: 300px;
              background-color: var(--color-cream);
              border-radius: 14px;
              box-shadow: var(--shadow-elevated);
              transform: translateY(20px);
              opacity: 0;
              visibility: hidden;
              transition: all 0.3s ease;
              z-index: 999;
              overflow: hidden;
            }

            .contact-panel.open {
              transform: translateY(0);
              opacity: 1;
              visibility: visible;
            }

            .contact-panel-header {
              background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
              color: var(--color-cream);
              padding: 1rem 1.25rem;
            }

            .contact-panel-header h3 {
              margin: 0;
              font-family: var(--font-display);
              font-size: 1.05rem;
              font-weight: 600;
            }

            .contact-panel-content {
              padding: 1rem;
            }

            .contact-item {
              display: flex;
              align-items: center;
              padding: 0.75rem;
              color: var(--color-ink);
              text-decoration: none;
              border-radius: 8px;
              transition: all 0.2s ease;
              margin-bottom: 0.5rem;
              background-color: var(--color-blush);
            }

            .contact-item:hover {
              background-color: var(--color-gold-light);
              color: var(--color-primary-dark);
              transform: translateX(2px);
            }

            .contact-icon {
              font-size: 1.5rem;
              margin-right: 1rem;
              color: var(--color-primary);
            }
          `}
        </style>
      </div>
    </>
  );
};

export default ContactPanel; 