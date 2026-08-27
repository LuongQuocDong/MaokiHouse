import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useHomestayDetail } from '../hooks/useHomestayDetail';
import ImageCarousel from '../components/ImageCarousel';

const HomestayDetail = () => {
  const { id } = useParams();
  const { homestay, loading, error } = useHomestayDetail(id);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (loading) return <div>Loading...</div>;
  if (error || !homestay) return <div>Error loading homestay details</div>;

  const images = [homestay.mainImageURL, ...(homestay.imageURLs || [])].filter(Boolean);

  return (
    <div className="container-fluid max-width-4xl mx-auto px-0">
      <div className="position-relative mb-4">
        <ImageCarousel
          images={images.map((url, idx) => ({ url, alt: `${homestay.title} - Image ${idx + 1}` }))}
          height="500px"
          interval={5000}
          fade={true}
          activeIndex={selectedImageIndex}
          onIndexChange={setSelectedImageIndex}
        />

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
        `}
      </style>
    </div>
  );
};

export default HomestayDetail;
