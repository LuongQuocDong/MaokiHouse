import { useState, useEffect } from 'react';
import { Container, Form, Button, Carousel, Spinner } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, database } from '../config/firebase';
import { ref, get, set } from 'firebase/database';
import type { AboutUsContent } from '../types';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface CarouselImage {
  url: string;
  alt: string;
  caption: string;
}

const AboutUs = () => {
  const [user] = useAuthState(auth);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Hardcoded Cloudinary images
  const carouselImages: CarouselImage[] = [
    {
      url: 'https://res.cloudinary.com/dlkejgkqk/image/upload/v1710681298/about1_w6kort.jpg',
      alt: 'Local Experience',
      caption: 'Experience Saigon Like a Local'
    },
    {
      url: 'https://res.cloudinary.com/dlkejgkqk/image/upload/v1710681298/about2_av5b0h.jpg',
      alt: 'City Tours',
      caption: 'Discover Hidden Gems'
    },
    {
      url: 'https://res.cloudinary.com/dlkejgkqk/image/upload/v1710681299/about3_vkv07l.jpg',
      alt: 'Cultural Exchange',
      caption: 'Cultural Exchange'
    }
  ];

  const [content, setContent] = useState<AboutUsContent>({
    id: 'about-us',
    mainTitle: '',
    mainDescription: '',
    introText: '',
    ourStory: {
      title: '',
      content: ''
    },
    localExperience: {
      title: '',
      content: ''
    },
    whyChooseUs: {
      title: '',
      benefits: []
    }
  });

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [mouseX, setMouseX] = useState(0);

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      try {
        const contentRef = ref(database, 'content/about-us');
        const snapshot = await get(contentRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          setContent({
            id: data.id || 'about-us',
            mainTitle: data.mainTitle || '',
            mainDescription: data.mainDescription || '',
            introText: data.introText || '',
            ourStory: {
              title: data?.ourStory?.title || '',
              content: data?.ourStory?.content || ''
            },
            localExperience: {
              title: data?.localExperience?.title || '',
              content: data?.localExperience?.content || ''
            },
            whyChooseUs: {
              title: data?.whyChooseUs?.title || '',
              benefits: Array.isArray(data?.whyChooseUs?.benefits) ? data?.whyChooseUs?.benefits : []
            }
          });
        } else {
          // If no content exists, save the default content
          const defaultContent: AboutUsContent = {
            id: 'about-us',
            mainTitle: 'Travel with local youth',
            mainDescription: 'We love wandering around, talking, sharing things about our lovely Saigon.',
            introText: 'As your local companion, we take you on free walking street tours where we can tell you hundreds littles things about the city of Saigon, listening to all the things you have to say about your country. We learn from the stories that we have been told and our tour guides pass on knowledge from there henceforth. That is what we have aimed to gain and done for the last 15 years.',
            ourStory: {
              title: 'Our Story',
              content: 'Having once worked as a volunteer tour guide in Ho Chi Minh City, we\'ve spent years exploring its hidden corners, charming stories, and unique culture. We know what travelers seek – the small things that make a trip special.'
            },
            localExperience: {
              title: 'Local Experience',
              content: 'Whether it\'s a tucked-away café, a quiet alley filled with local art, or stories of old Saigon, we\'re here to share it with you. Our homestay is more than just accommodation – it\'s your gateway to authentic Saigon experiences.'
            },
            whyChooseUs: {
              title: 'Why Choose Maoki House?',
              benefits: [
                'Local insights and personalized recommendations',
                'Central location in the heart of Saigon',
                'Comfortable and authentic homestay experience',
                'Friendly hosts with extensive local knowledge',
                'Access to hidden gems and local favorites'
              ]
            }
          };
          await set(contentRef, defaultContent);
          setContent(defaultContent);
        }
      } catch (error) {
        console.error('Error fetching about us content:', error);
        toast.error('Failed to load content');
      } finally {
        setIsLoading(false);
      }
    };
    fetchContent();
  }, []);

  const handleSave = async () => {
    const toastId = toast.loading('Saving changes...');
    try {
      const contentRef = ref(database, 'content/about-us');
      await set(contentRef, {
        ...content,
        updatedAt: Date.now(),
        updatedBy: user?.email
      });
      setIsEditing(false);
      toast.success('Content updated successfully', { id: toastId });
    } catch (error) {
      console.error('Error saving about us content:', error);
      toast.error('Failed to save changes', { id: toastId });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouseX(e.clientX - rect.left);
  };

  if (isLoading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (isEditing && user) {
    return (
      <Container className="py-5">
        <div className="d-flex justify-content-end mb-4">
          <Button variant="secondary" className="me-2" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </div>

        <Form>
          <Form.Group className="mb-4">
            <Form.Label>Main Title</Form.Label>
            <Form.Control
              type="text"
              value={content.mainTitle}
              onChange={(e) => setContent({ ...content, mainTitle: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Main Description</Form.Label>
            <Form.Control
              type="text"
              value={content.mainDescription}
              onChange={(e) => setContent({ ...content, mainDescription: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Introduction Text</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={content.introText}
              onChange={(e) => setContent({ ...content, introText: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Our Story Title</Form.Label>
            <Form.Control
              type="text"
              value={content.ourStory.title}
              onChange={(e) => setContent({
                ...content,
                ourStory: { ...content.ourStory, title: e.target.value }
              })}
            />
            <Form.Label className="mt-2">Our Story Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={content.ourStory.content}
              onChange={(e) => setContent({
                ...content,
                ourStory: { ...content.ourStory, content: e.target.value }
              })}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Local Experience Title</Form.Label>
            <Form.Control
              type="text"
              value={content.localExperience.title}
              onChange={(e) => setContent({
                ...content,
                localExperience: { ...content.localExperience, title: e.target.value }
              })}
            />
            <Form.Label className="mt-2">Local Experience Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={content.localExperience.content}
              onChange={(e) => setContent({
                ...content,
                localExperience: { ...content.localExperience, content: e.target.value }
              })}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Why Choose Us Title</Form.Label>
            <Form.Control
              type="text"
              value={content.whyChooseUs.title}
              onChange={(e) => setContent({
                ...content,
                whyChooseUs: { ...content.whyChooseUs, title: e.target.value }
              })}
            />
            <Form.Label className="mt-2">Benefits (one per line)</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={content.whyChooseUs.benefits.join('\n')}
              onChange={(e) => setContent({
                ...content,
                whyChooseUs: {
                  ...content.whyChooseUs,
                  benefits: e.target.value.split('\n').filter(benefit => benefit.trim() !== '')
                }
              })}
            />
          </Form.Group>
        </Form>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      {user && (
        <div className="d-flex justify-content-end mb-4">
          <Button variant="primary" onClick={() => setIsEditing(true)}>
            Edit Content
          </Button>
        </div>
      )}

      <div 
        className="position-relative mb-5"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
        onMouseMove={handleMouseMove}
        style={{
          minHeight: '500px',
          width: '100%',
          borderRadius: '8px',
          overflow: 'hidden'
        }}
      >
        <Carousel
          activeIndex={selectedImageIndex}
          onSelect={(index) => setSelectedImageIndex(index)}
          interval={5000}
          controls={false}
          indicators={true}
          fade={true}
          style={{
            height: '500px',
            width: '100%'
          }}
        >
          {carouselImages.map((image: CarouselImage, index: number) => (
            <Carousel.Item 
              key={index}
              style={{
                height: '500px',
                width: '100%'
              }}
            >
              <img
                src={image.url}
                alt={image.alt}
                style={{ 
                  width: '100%',
                  height: '500px',
                  objectFit: 'cover',
                  borderRadius: '8px'
                }}
              />
              <Carousel.Caption
                style={{
                  backgroundColor: 'rgba(130, 74, 57, 0.7)',
                  borderRadius: '8px',
                  padding: '15px',
                  backdropFilter: 'blur(4px)'
                }}
              >
                <h3>{image.caption}</h3>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>

        {/* Custom Carousel Controls */}
        {showControls && (
          <>
            <motion.button
              className="carousel-control-btn prev"
              onClick={() => setSelectedImageIndex(selectedImageIndex === 0 ? carouselImages.length - 1 : selectedImageIndex - 1)}
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
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: 'none',
                borderRadius: '50%',
                width: '48px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#824a39',
                cursor: 'pointer',
                backdropFilter: 'blur(4px)',
                zIndex: 2
              }}
            >
              <FaChevronLeft size={24} />
            </motion.button>

            <motion.button
              className="carousel-control-btn next"
              onClick={() => setSelectedImageIndex(selectedImageIndex === carouselImages.length - 1 ? 0 : selectedImageIndex + 1)}
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
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: 'none',
                borderRadius: '50%',
                width: '48px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#824a39',
                cursor: 'pointer',
                backdropFilter: 'blur(4px)',
                zIndex: 2
              }}
            >
              <FaChevronRight size={24} />
            </motion.button>
          </>
        )}

        <style>
          {`
            .carousel {
              height: 500px;
              width: 100%;
              border-radius: 8px;
              overflow: hidden;
            }
            .carousel-inner {
              height: 100%;
            }
            .carousel-item {
              height: 100%;
              transition: all 1s cubic-bezier(0.4, 0, 0.2, 1) !important;
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
            .carousel-indicators {
              margin-bottom: 2rem;
              gap: 8px;
              z-index: 3;
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
            .carousel-caption {
              background: rgba(130, 74, 57, 0.7);
              border-radius: 8px;
              padding: 15px;
              bottom: 20px;
              backdrop-filter: blur(4px);
            }
          `}
        </style>
      </div>

      <h1 className="display-4 text-primary mb-4">{content.mainTitle}</h1>
      <div className="text-muted mb-4">
        {content.mainDescription}
      </div>
      
      <div className="mb-5">
        <p>{content.introText}</p>
      </div>

      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body">
              <h3 className="h4 text-primary mb-3">{content.ourStory.title}</h3>
              <p>{content.ourStory.content}</p>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body">
              <h3 className="h4 text-primary mb-3">{content.localExperience.title}</h3>
              <p>{content.localExperience.content}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm mt-4">
        <div className="card-body">
          <h3 className="h4 text-primary mb-3">{content.whyChooseUs.title}</h3>
          <ul className="list-unstyled">
            {content.whyChooseUs.benefits.map((benefit, index) => (
              <li key={index} className={index < content.whyChooseUs.benefits.length - 1 ? 'mb-3' : ''}>
                ✓ {benefit}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Container>
  );
};

export default AboutUs; 