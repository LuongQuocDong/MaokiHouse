import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ImageCarousel from './ImageCarousel';

const images = [
  {
    url: 'https://res.cloudinary.com/dlkejgkqk/image/upload/v1752588058/carousel1_detuga.jpg',
    alt: 'Host dashboard overview',
    caption: 'Quản lý mọi kênh OTA trong một nơi'
  },
  {
    url: 'https://res.cloudinary.com/dlkejgkqk/image/upload/v1752588057/carousel2_hbopq7.jpg',
    alt: 'Unified calendar',
    caption: 'Lịch đặt phòng đồng bộ'
  },
  {
    url: 'https://res.cloudinary.com/dlkejgkqk/image/upload/v1752588057/carousel3_niy7f8.jpg',
    alt: 'Revenue reporting',
    caption: 'Báo cáo doanh thu minh bạch'
  },
  {
    url: 'https://res.cloudinary.com/dlkejgkqk/image/upload/v1752588057/carousel4_uswfub.jpg ',
    alt: 'Unified inbox',
    caption: 'Hộp thư khách hàng hợp nhất'
  },
  {
    url: 'https://res.cloudinary.com/dlkejgkqk/image/upload/v1752588057/carousel5_lsbbqs.jpg',
    alt: 'Peaceful operations',
    caption: 'Vận hành nhẹ nhàng, hiệu quả'
  }
];

const HomeCarousel = () => {
  return (
    <div className="hero-carousel full-bleed position-relative">
      <ImageCarousel images={images} height="100%" interval={5000} captionStyle="none" />

      {/* Cinematic gradient overlay for text legibility */}
      <div className="hero-gradient" />

      <div className="hero-content position-absolute top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center text-center px-3">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          <div className="eyebrow mb-3" style={{ color: 'var(--color-gold-light)' }}>Channel Manager &middot; PMS cho Host</div>
          <h1 className="hero-title font-display mb-3">MaokiHouse</h1>
          <p className="hero-subtitle mx-auto mb-4">
            Nền tảng quản lý cho chủ nhà Airbnb, Booking.com, Agoda &mdash; đồng bộ lịch, tin nhắn và doanh thu trong một nơi duy nhất.
          </p>

          <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-block' }}>
            <Link to="/admin" className="pill-btn hero-cta">
              Đăng nhập
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-scroll-cue"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <i className="bi bi-chevron-down"></i>
        </motion.div>
      </div>

      <style>
        {`
          .hero-carousel {
            height: 100vh;
            min-height: 560px;
            overflow: hidden;
          }

          .hero-carousel .image-carousel-wrapper,
          .hero-carousel .image-carousel-wrapper .carousel,
          .hero-carousel .image-carousel-wrapper .carousel-inner,
          .hero-carousel .image-carousel-wrapper .carousel-item,
          .hero-carousel .image-carousel-wrapper img {
            height: 100% !important;
          }

          .hero-gradient {
            position: absolute;
            inset: 0;
            background: linear-gradient(180deg, rgba(28, 19, 16, 0.35) 0%, rgba(28, 19, 16, 0.25) 45%, rgba(28, 19, 16, 0.75) 100%);
            pointer-events: none;
          }

          .hero-title {
            font-size: clamp(2.75rem, 7vw, 5rem);
            color: var(--color-cream);
            text-shadow: 0 4px 24px rgba(0,0,0,0.35);
            margin-bottom: 0.5rem;
          }

          .hero-subtitle {
            max-width: 620px;
            font-size: clamp(1rem, 1.6vw, 1.25rem);
            color: var(--color-cream);
            opacity: 0.92;
          }

          .hero-cta {
            font-size: 1.05rem;
            padding: 0.9rem 2.25rem;
          }

          .hero-scroll-cue {
            position: absolute;
            bottom: 2rem;
            left: 50%;
            transform: translateX(-50%);
            color: var(--color-cream);
            font-size: 1.5rem;
            opacity: 0.85;
          }

          @media (max-width: 576px) {
            .hero-carousel {
              height: 88vh;
              min-height: 480px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default HomeCarousel;
