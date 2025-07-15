import { useState } from 'react';

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
          <a href="https://www.facebook.com/p/Maoki-House-100090585424824/" target="_blank" rel="noopener noreferrer" className="contact-item">
            <i className="bi bi-facebook contact-icon"></i>
            <span>Our Facebook Page</span>
          </a>
          
          <a href="https://wa.me/84868191581" target="_blank" rel="noopener noreferrer" className="contact-item">
            <i className="bi bi-whatsapp contact-icon"></i>
            <span>+84868191581 (Whatsapp)</span>
          </a>
          
          <a href="mailto:maokihouse.sg@gmail.com" className="contact-item">
            <i className="bi bi-envelope contact-icon"></i>
            <span>maokihouse.sg@gmail.com</span>
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
              background-color: #824a39;
              color: white;
              border: none;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 24px;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
              transition: all 0.3s ease;
              z-index: 1000;
            }

            .floating-contact-btn:hover {
              transform: scale(1.05);
              background-color: #6b3d2f;
            }

            .contact-panel {
              position: fixed;
              bottom: 6rem;
              right: 2rem;
              width: 300px;
              background-color: white;
              border-radius: 12px;
              box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
              transform: translateY(20px);
              opacity: 0;
              visibility: hidden;
              transition: all 0.3s ease;
              z-index: 999;
            }

            .contact-panel.open {
              transform: translateY(0);
              opacity: 1;
              visibility: visible;
            }

            .contact-panel-header {
              background-color: #824a39;
              color: white;
              padding: 1rem;
              border-radius: 12px 12px 0 0;
            }

            .contact-panel-header h3 {
              margin: 0;
              font-size: 1.1rem;
              font-weight: 500;
            }

            .contact-panel-content {
              padding: 1rem;
            }

            .contact-item {
              display: flex;
              align-items: center;
              padding: 0.75rem;
              color: #333;
              text-decoration: none;
              border-radius: 8px;
              transition: all 0.2s ease;
              margin-bottom: 0.5rem;
              background-color: #f8f9fa;
            }

            .contact-item:hover {
              background-color: #ffe6d8;
              color: #824a39;
            }

            .contact-icon {
              font-size: 1.5rem;
              margin-right: 1rem;
            }
          `}
        </style>
      </div>
    </>
  );
};

export default ContactPanel; 