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

      <div className="elevated-card">
        <div className="card-body p-4 p-md-5">
          <div className="eyebrow mb-2">Homestay</div>
          <h1 className="font-display mb-4" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)' }}>{homestay.title}</h1>
          <p className="mb-4" style={{ whiteSpace: 'pre-line', color: 'var(--color-ink)', opacity: 0.8, lineHeight: 1.8 }}>{homestay.description}</p>

          <div style={{ borderTop: '1px solid var(--color-blush)' }} className="pt-4">
            <div className="row align-items-center">
              <div className="col-12 col-md-6 mb-3 mb-md-0">
                <div className="mb-0" style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', color: 'var(--color-primary)' }}>
                  ${homestay.price}<span style={{ fontSize: '1rem', color: 'var(--color-ink)', opacity: 0.6 }}>/night</span>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="d-flex gap-3 justify-content-md-end flex-wrap">
                  <motion.a
                    href={homestay.airbnbLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pill-btn"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Book on Airbnb
                  </motion.a>

                  <motion.a
                    href={`tel:${homestay.phone}`}
                    className="pill-btn"
                    style={{ background: 'var(--color-primary)', color: 'var(--color-cream)' }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <i className="bi bi-telephone"></i>
                    Call Host
                  </motion.a>
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
