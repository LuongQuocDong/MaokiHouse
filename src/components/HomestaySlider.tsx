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
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="elevated-card h-100"
      style={{ width: '100%' }}
    >
      <Link
        to={`/detail/${homestay.id}`}
        className="text-decoration-none d-block"
      >
        <div className="homestay-card-image-wrap">
          <ImageCarousel
            images={images.map((url, idx) => ({ url, alt: `${homestay.title} - Image ${idx + 1}` }))}
            height="220px"
            interval={null}
            indicators={false}
            borderRadius="0"
          />
          <div className="homestay-price-badge">${homestay.price}/night</div>
        </div>
        <div className="card-body p-4">
          <h2 className="h5 card-title mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}>
            {homestay.title}
          </h2>
          <p className="card-text mb-3" style={{
            color: 'var(--color-ink)',
            opacity: 0.7,
            display: '-webkit-box',
            WebkitLineClamp: '2',
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {homestay.description}
          </p>
          <span className="homestay-view-link">
            View Details <i className="bi bi-arrow-right ms-1"></i>
          </span>
        </div>
      </Link>

      <style>
        {`
          .homestay-card-image-wrap {
            position: relative;
            overflow: hidden;
          }

          .homestay-card-image-wrap .image-carousel-wrapper img {
            transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .homestay-card-image-wrap:hover .image-carousel-wrapper img {
            transform: scale(1.08);
          }

          .homestay-price-badge {
            position: absolute;
            top: 14px;
            right: 14px;
            z-index: 15;
            background: linear-gradient(135deg, var(--color-gold), var(--color-primary-light));
            color: var(--color-ink);
            font-weight: 700;
            font-size: 0.9rem;
            padding: 0.4rem 0.9rem;
            border-radius: 999px;
            box-shadow: var(--shadow-soft);
          }

          .homestay-view-link {
            color: var(--color-primary);
            font-weight: 600;
            font-size: 0.92rem;
            letter-spacing: 0.02em;
          }
        `}
      </style>
    </motion.div>
  );
};

export default HomestaySlider;
