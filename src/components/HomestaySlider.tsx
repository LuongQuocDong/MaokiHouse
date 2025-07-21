import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import type { Homestay } from '../types';

interface HomestaySliderProps {
  homestay: Homestay;
}

const HomestaySlider = ({ homestay }: HomestaySliderProps) => {
  const [index, setIndex] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Get all images, starting with mainImageURL then the rest of imageURLs
  const images = [homestay.mainImageURL, ...(homestay.imageURLs || [])].filter(Boolean);
  
  // If there are no images, use the legacy imageURL
  if (images.length === 0 && homestay.imageURL) {
    images.push(homestay.imageURL);
  }

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{ display: 'inline-block', width: '100%' }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      onMouseEnter={() => {
        setIsHovered(true);
        setShowControls(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowControls(false);
      }}
    >
      <Link
        to={`/detail/${homestay.id}`}
        className="text-decoration-none"
      >
        <div className="image-container">
          <Carousel
            activeIndex={index}
            onSelect={handleSelect}
            interval={null} // Disable auto slide
            controls={false}
            indicators={false}
            wrap={true}
            slide={true}
            touch={true}
            pause="hover"
          >
            {images.map((imageUrl, idx) => (
              <Carousel.Item key={idx}>
                <img
                  src={imageUrl}
                  alt={`${homestay.title} - Image ${idx + 1}`}
                  className="card-img-top"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              </Carousel.Item>
            ))}
          </Carousel>

          {/* Custom Carousel Controls - Only show when hovered */}
          {showControls && images.length > 1 && (
            <>
              <button
                className="homestay-slider-control-btn prev"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleSelect(index === 0 ? images.length - 1 : index - 1);
                }}
              >
                <FaChevronLeft size={16} />
              </button>
              <button
                className="homestay-slider-control-btn next"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleSelect(index === images.length - 1 ? 0 : index + 1);
                }}
              >
                <FaChevronRight size={16} />
              </button>
            </>
          )}

          <div className="image-overlay">
            <div className="h4 mb-2">${homestay.price}/night</div>
            <div>Click to view details</div>
          </div>
        </div>
        <div className="card-body mt-3">
          <h2 className="h5 card-title text-primary">
            {homestay.title}
          </h2>
          <p className="card-text text-muted" style={{
            display: '-webkit-box',
            WebkitLineClamp: '2',
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {homestay.description}
          </p>
        </div>

        <style>
          {`
            .homestay-slider-control-btn {
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              background-color: rgba(255, 255, 255, 0.7);
              border: none;
              border-radius: 50%;
              width: 30px;
              height: 30px;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              color: #824a39;
              box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
              z-index: 10;
              opacity: 0.8;
              transition: all 0.3s ease;
            }

            .homestay-slider-control-btn:hover {
              background-color: rgba(255, 255, 255, 0.9);
              opacity: 1;
            }

            .homestay-slider-control-btn.prev {
              left: 10px;
            }

            .homestay-slider-control-btn.next {
              right: 10px;
            }
          `}
        </style>
      </Link>
    </motion.div>
  );
};

export default HomestaySlider; 