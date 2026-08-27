import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { homestayService } from '../services/homestayService';
import ImageCarousel from './ImageCarousel';

const images = [
  {
    url: 'https://res.cloudinary.com/dlkejgkqk/image/upload/v1752588058/carousel1_detuga.jpg',
    alt: 'Maoki House Welcome',
    caption: 'Welcome to Maoki House'
  },
  {
    url: 'https://res.cloudinary.com/dlkejgkqk/image/upload/v1752588057/carousel2_hbopq7.jpg',
    alt: 'Comfortable Living Space',
    caption: 'Comfortable Living Spaces'
  },
  {
    url: 'https://res.cloudinary.com/dlkejgkqk/image/upload/v1752588057/carousel3_niy7f8.jpg',
    alt: 'Modern Amenities',
    caption: 'Modern Amenities'
  },
  {
    url: 'https://res.cloudinary.com/dlkejgkqk/image/upload/v1752588057/carousel4_uswfub.jpg ',
    alt: 'Beautiful Views',
    caption: 'Beautiful Views'
  },
  {
    url: 'https://res.cloudinary.com/dlkejgkqk/image/upload/v1752588057/carousel5_lsbbqs.jpg',
    alt: 'Peaceful Environment',
    caption: 'Peaceful Environment'
  }
];

const HomeCarousel = () => {
  const [airbnbLink, setAirbnbLink] = useState('');

  useEffect(() => {
    const fetchFirstHomestay = async () => {
      try {
        const homestays = await homestayService.list();
        if (homestays.length > 0) {
          setAirbnbLink(homestays[0].airbnbLink);
        }
      } catch (error) {
        console.error('Error fetching Airbnb link:', error);
      }
    };

    fetchFirstHomestay();
  }, []);

  return (
    <div className="position-relative mb-5">
      <ImageCarousel images={images} height="500px" interval={5000} captionStyle="shadow-text" />

      {/* Airbnb Button - Positioned with absolute positioning */}
      {airbnbLink && (
        <div
          className="position-absolute start-50 translate-middle-x"
          style={{
            zIndex: 10,
            top: '80%',
            pointerEvents: 'auto',
            textAlign: 'center'
          }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ display: 'inline-block' }}
          >
            <motion.a
              href={airbnbLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-danger btn-lg"
              style={{
                backgroundColor: 'rgba(255, 56, 92, 0.9)',
                border: '2px solid #ff385c',
                color: 'white',
                padding: '15px 30px',
                borderRadius: '50px',
                fontSize: '1.2rem',
                fontWeight: '600',
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(4px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 56, 92, 1)';
                e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 56, 92, 0.9)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
              }}
            >
              Book Now
            </motion.a>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default HomeCarousel;
