import { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './ImageCarousel.css';

export interface ImageCarouselImage {
  url: string;
  alt?: string;
  caption?: string;
}

export type CaptionStyle = 'none' | 'shadow-text' | 'card';

interface ImageCarouselProps {
  images: (string | ImageCarouselImage)[];
  height?: string;
  interval?: number | null;
  fade?: boolean;
  indicators?: boolean;
  captionStyle?: CaptionStyle;
  activeIndex?: number;
  onIndexChange?: (index: number) => void;
  className?: string;
  borderRadius?: string;
}

const normalize = (image: string | ImageCarouselImage): ImageCarouselImage =>
  typeof image === 'string' ? { url: image } : image;

/**
 * Reusable image carousel used across the site (home hero, about-us, homestay
 * cards, homestay detail). Wraps react-bootstrap's Carousel with the shared
 * hover-to-reveal prev/next controls used throughout the app.
 */
const ImageCarousel = ({
  images,
  height = '500px',
  interval = 5000,
  fade = false,
  indicators = true,
  captionStyle = 'none',
  activeIndex,
  onIndexChange,
  className = '',
  borderRadius = '8px',
}: ImageCarouselProps) => {
  const normalizedImages = images.map(normalize).filter((img) => !!img.url);
  const [internalIndex, setInternalIndex] = useState(0);
  const [showControls, setShowControls] = useState(false);

  const index = activeIndex ?? internalIndex;

  const setIndex = (newIndex: number) => {
    setInternalIndex(newIndex);
    onIndexChange?.(newIndex);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex(index === 0 ? normalizedImages.length - 1 : index - 1);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex(index === normalizedImages.length - 1 ? 0 : index + 1);
  };

  if (normalizedImages.length === 0) return null;

  return (
    <div
      className={`image-carousel-wrapper ${className}`}
      style={{ position: 'relative', height, borderRadius, overflow: 'hidden' }}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <Carousel
        activeIndex={index}
        onSelect={setIndex}
        interval={interval}
        controls={false}
        indicators={indicators}
        fade={fade}
        style={{ height, width: '100%' }}
      >
        {normalizedImages.map((image, idx) => (
          <Carousel.Item key={idx} style={{ height }}>
            <img
              src={image.url}
              alt={image.alt || `Image ${idx + 1}`}
              style={{ width: '100%', height, objectFit: 'cover', borderRadius }}
            />
            {captionStyle !== 'none' && image.caption && (
              <Carousel.Caption
                className={captionStyle === 'shadow-text' ? 'image-carousel-caption-shadow' : 'image-carousel-caption-card'}
              >
                <h3 className={captionStyle === 'shadow-text' ? 'image-carousel-caption-text' : undefined}>
                  {image.caption}
                </h3>
              </Carousel.Caption>
            )}
          </Carousel.Item>
        ))}
      </Carousel>

      {showControls && normalizedImages.length > 1 && (
        <>
          <button className="image-carousel-control prev" onClick={handlePrev} aria-label="Previous image">
            <FaChevronLeft size={20} />
          </button>
          <button className="image-carousel-control next" onClick={handleNext} aria-label="Next image">
            <FaChevronRight size={20} />
          </button>
        </>
      )}
    </div>
  );
};

export default ImageCarousel;
