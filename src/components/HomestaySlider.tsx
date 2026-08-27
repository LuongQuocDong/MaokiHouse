import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Homestay } from '../types';
import ImageCarousel from './ImageCarousel';

interface HomestaySliderProps {
  homestay: Homestay;
}

const HomestaySlider = ({ homestay }: HomestaySliderProps) => {
  // Get all images, starting with mainImageURL then the rest of imageURLs
  const images = [homestay.mainImageURL, ...(homestay.imageURLs || [])].filter(Boolean);

  // If there are no images, use the legacy imageURL
  if (images.length === 0 && homestay.imageURL) {
    images.push(homestay.imageURL);
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{ display: 'inline-block', width: '100%' }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Link
        to={`/detail/${homestay.id}`}
        className="text-decoration-none"
      >
        <div className="image-container">
          <ImageCarousel
            images={images.map((url, idx) => ({ url, alt: `${homestay.title} - Image ${idx + 1}` }))}
            height="200px"
            interval={null}
            indicators={false}
          />

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
      </Link>
    </motion.div>
  );
};

export default HomestaySlider;
