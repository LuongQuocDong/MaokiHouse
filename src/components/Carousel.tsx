import { Carousel } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { ref, get } from 'firebase/database';
import { database } from '../config/firebase';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import type { Homestay } from '../types';

const HomeCarousel = () => {
  const [airbnbLink, setAirbnbLink] = useState('');
  const [index, setIndex] = useState(0);
  const [mouseX, setMouseX] = useState(0);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    const fetchFirstHomestay = async () => {
      try {
        const homestaysRef = ref(database, 'homestays');
        const snapshot = await get(homestaysRef);
        if (snapshot.exists()) {
          const homestays = Object.values(snapshot.val()) as Homestay[];
          if (homestays.length > 0) {
            setAirbnbLink(homestays[0].airbnbLink);
          }
        }
      } catch (error) {
        console.error('Error fetching Airbnb link:', error);
      }
    };

    fetchFirstHomestay();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouseX(e.clientX - rect.left);
  };

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

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleSelect(index === 0 ? images.length - 1 : index - 1);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleSelect(index === images.length - 1 ? 0 : index + 1);
  };

  return (
    <div 
      className="position-relative mb-5"
      onMouseEnter={() => {
        setShowControls(true);
      }}
      onMouseLeave={() => {
        setShowControls(false);
      }}
      onMouseMove={handleMouseMove}
    >
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        interval={5000}
        className="carousel-custom"
        controls={false}
        indicators={true}
      >
        {images.map((image, idx) => (
          <Carousel.Item key={idx}>
            <img
              className="d-block w-100"
              src={image.url}
              alt={image.alt}
              style={{
                height: '500px',
                objectFit: 'cover',
                borderRadius: '8px'
              }}
            />
            <Carousel.Caption
              style={{
                padding: '15px',
                background: 'transparent',
                pointerEvents: 'none'
              }}
            >
              <h3 className="caption-text">
                {image.caption}
              </h3>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

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

      {/* Custom Carousel Controls */}
      {showControls && (
        <>
          <motion.button
            className="carousel-control-btn prev"
            onClick={handlePrev}
            initial={{ opacity: 0, x: -20 }}
            animate={{ 
              opacity: mouseX < window.innerWidth / 2 ? 1 : 0,
              x: mouseX < window.innerWidth / 2 ? 0 : -20
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <FaChevronLeft size={24} />
          </motion.button>
          <motion.button
            className="carousel-control-btn next"
            onClick={handleNext}
            initial={{ opacity: 0, x: 20 }}
            animate={{ 
              opacity: mouseX >= window.innerWidth / 2 ? 1 : 0,
              x: mouseX >= window.innerWidth / 2 ? 0 : 20
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <FaChevronRight size={24} />
          </motion.button>
        </>
      )}

      <style>
        {`
          .carousel-custom {
            position: relative;
          }

          .carousel-item {
            transition: all 1s cubic-bezier(0.4, 0, 0.2, 1) !important;
          }

          .carousel-indicators {
            margin-bottom: 2rem;
            gap: 8px;
            z-index: 20;
          }

          .carousel-indicators [data-bs-target] {
            width: 30px !important;
            height: 4px !important;
            border-radius: 4px !important;
            margin: 0 !important;
            background-color: rgba(255, 255, 255, 0.5) !important;
            border: none !important;
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1) !important;
            position: relative;
            opacity: 0.5;
          }

          .carousel-indicators .active {
            background-color: #fff !important;
            opacity: 1;
            width: 45px !important;
          }

          .carousel-indicators [data-bs-target]:hover {
            opacity: 0.8;
            width: 35px !important;
          }

          .carousel-control-btn {
            position: absolute;
            top: 40%;
            transform: translateY(-50%);
            background-color: rgba(255, 255, 255, 0.9);
            border: none;
            border-radius: 50%;
            width: 48px;
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            color: #824a39;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 20;
          }

          .carousel-control-btn.prev {
            left: 20px;
          }

          .carousel-control-btn.next {
            right: 20px;
          }
          
          .carousel-caption {
            bottom: 35% !important;
          }

          .caption-text {
            margin: 0;
            margin-bottom: 20px;
            font-size: 2.5rem;
            font-weight: 700;
            color: white;
            text-shadow: 
              -2px -2px 0 #824a39,
              2px -2px 0 #824a39,
              -2px 2px 0 #824a39,
              2px 2px 0 #824a39,
              0 0 8px rgba(130, 74, 57, 0.7);
            letter-spacing: 1px;
          }
        `}
      </style>
    </div>
  );
};

export default HomeCarousel; 