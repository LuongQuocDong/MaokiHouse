import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useHomestayDetail } from '../hooks/useHomestayDetail';

const HomestayDetail = () => {
  const { id } = useParams();
  const { homestay, loading, error } = useHomestayDetail(id);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [mouseX, setMouseX] = useState(0);

  if (loading) return <div>Loading...</div>;
  if (error || !homestay) return <div>Error loading homestay details</div>;

  const images = [homestay.mainImageURL, ...(homestay.imageURLs || [])].filter(Boolean);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouseX(e.clientX - rect.left);
  };

  return (
    <div className="container-fluid max-width-4xl mx-auto px-0">
      <div 
        className="position-relative mb-4"
        onMouseEnter={() => {
          setIsHovered(true);
          setShowControls(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          setShowControls(false);
        }}
        onMouseMove={handleMouseMove}
      >
        <Carousel
          activeIndex={selectedImageIndex}
          onSelect={(index) => setSelectedImageIndex(index)}
          interval={5000}
          controls={false}
          fade={true}
        >
          {images.map((imageUrl, index) => (
            <Carousel.Item 
              key={index}
              style={{
                transition: 'transform 0.6s ease-in-out'
              }}
            >
              <motion.img
                src={imageUrl}
                alt={`${homestay.title} - Image ${index + 1}`}
                className="w-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: 0.6,
                  ease: "easeInOut"
                }}
                style={{ 
                  height: '500px', 
                  objectFit: 'cover',
                  borderRadius: '8px'
                }}
              />
            </Carousel.Item>
          ))}
        </Carousel>

        {/* Custom Carousel Controls */}
        {showControls && (
          <>
            <motion.button
              className="carousel-control-btn prev"
              onClick={() => setSelectedImageIndex(selectedImageIndex === 0 ? images.length - 1 : selectedImageIndex - 1)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: mouseX < window.innerWidth / 2 ? 1 : 0,
                x: mouseX < window.innerWidth / 2 ? 0 : -20
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{
                position: 'absolute',
                left: '20px',
                top: '40%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(130, 74, 57, 0.7)',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                cursor: 'pointer',
                backdropFilter: 'blur(4px)',
                zIndex: 2
              }}
            >
              <FaChevronLeft size={20} />
            </motion.button>

            <motion.button
              className="carousel-control-btn next"
              onClick={() => setSelectedImageIndex(selectedImageIndex === images.length - 1 ? 0 : selectedImageIndex + 1)}
              initial={{ opacity: 0, x: 20 }}
              animate={{ 
                opacity: mouseX > window.innerWidth / 2 ? 1 : 0,
                x: mouseX > window.innerWidth / 2 ? 0 : 20
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{
                position: 'absolute',
                right: '20px',
                top: '40%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(130, 74, 57, 0.7)',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                cursor: 'pointer',
                backdropFilter: 'blur(4px)',
                zIndex: 2
              }}
            >
              <FaChevronRight size={20} />
            </motion.button>
          </>
        )}

        {images.length > 1 && (
          <div className="mt-3 d-flex gap-2 overflow-auto pb-2">
            {images.map((imageUrl, index) => (
              <motion.img
                key={index}
                src={imageUrl}
                alt={`${homestay.title} - Thumbnail ${index + 1}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`rounded cursor-pointer ${index === selectedImageIndex ? 'border border-primary' : ''}`}
                style={{
                  width: '80px',
                  height: '80px',
                  objectFit: 'cover',
                  cursor: 'pointer',
                  opacity: index === selectedImageIndex ? 1 : 0.7,
                  transition: 'opacity 0.3s ease'
                }}
                onClick={() => setSelectedImageIndex(index)}
              />
            ))}
          </div>
        )}
      </div>
      
      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <h1 className="display-5 text-primary mb-4">{homestay.title}</h1>
          <p className="text-muted mb-4" style={{ whiteSpace: 'pre-line' }}>{homestay.description}</p>
          
          <div className="border-top pt-4">
            <div className="row align-items-center">
              <div className="col-12 col-md-6 mb-3 mb-md-0">
                <div className="h3 text-primary mb-0">
                  ${homestay.price}/night
                </div>
              </div>
              
              <div className="col-12 col-md-6">
                <div className="d-flex gap-3 justify-content-md-end">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <a
                      href={homestay.airbnbLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-danger px-4 py-2"
                      style={{ 
                        backgroundColor: '#ff385c', 
                        borderColor: '#ff385c',
                        borderRadius: '50px',
                        fontSize: '1.1rem',
                        boxShadow: '0 2px 8px rgba(255, 56, 92, 0.25)',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      Book on Airbnb
                    </a>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <a
                      href={`tel:${homestay.phone}`}
                      className="btn btn-primary d-flex align-items-center gap-2 px-4 py-2"
                      style={{ 
                        borderRadius: '50px',
                        fontSize: '1.1rem',
                        boxShadow: '0 2px 8px rgba(13, 110, 253, 0.25)',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <i className="bi bi-telephone"></i>
                      Call Host
                    </a>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          .cursor-pointer {
            cursor: pointer;
          }
          .cursor-pointer:hover {
            opacity: 0.9 !important;
          }
          .carousel-item {
            transition: transform 0.6s ease-in-out, opacity 0.6s ease-in-out !important;
          }
          .carousel-item.active {
            display: flex !important;
            opacity: 1;
          }
          .carousel-item-next,
          .carousel-item-prev {
            position: absolute;
            top: 0;
            opacity: 0;
          }
          .carousel-fade .active.carousel-item-start,
          .carousel-fade .active.carousel-item-end {
            opacity: 0;
            z-index: 0;
          }
          .carousel-fade .carousel-item-next.carousel-item-start,
          .carousel-fade .carousel-item-prev.carousel-item-end {
            opacity: 1;
            z-index: 1;
          }
        `}
      </style>
    </div>
  );
};

export default HomestayDetail; 