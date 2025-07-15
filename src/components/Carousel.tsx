import { Carousel } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { ref, get } from 'firebase/database';
import { database } from '../config/firebase';
import type { Homestay } from '../types';

const HomeCarousel = () => {
  const [airbnbLink, setAirbnbLink] = useState('');
  const [isHovered, setIsHovered] = useState(false);

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

  return (
    <div 
      className="position-relative mb-5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Carousel>
        {images.map((image, index) => (
          <Carousel.Item key={index}>
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
                backgroundColor: 'rgba(130, 74, 57, 0.7)',
                borderRadius: '8px',
                padding: '15px'
              }}
            >
              <h3>{image.caption}</h3>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
      {airbnbLink && (
        <div 
          className="position-absolute top-50 start-50 translate-middle"
          style={{
            opacity: isHovered ? 1 : 0,
            visibility: isHovered ? 'visible' : 'hidden',
            transition: 'all 0.5s ease'
          }}
        >
          <a
            href={airbnbLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-danger btn-lg"
            style={{
              backgroundColor: 'rgba(255, 56, 92, 0.9)',
              borderColor: '#ff385c',
              borderRadius: '50px',
              padding: '15px 30px',
              fontSize: '1.2rem',
              fontWeight: '600',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(4px)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
              e.currentTarget.style.backgroundColor = 'rgba(255, 56, 92, 1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
              e.currentTarget.style.backgroundColor = 'rgba(255, 56, 92, 0.9)';
            }}
          >
            Book Now on Airbnb
          </a>
        </div>
      )}
    </div>
  );
};

export default HomeCarousel; 