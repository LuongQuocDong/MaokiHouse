import { useState, useEffect } from 'react';
import { Container, Form, Button, Spinner } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';
import { contentService } from '../services/contentService';
import type { AboutUsContent } from '../types';
import toast from 'react-hot-toast';
import ImageCarousel from '../components/ImageCarousel';
import type { ImageCarouselImage } from '../components/ImageCarousel';

const AboutUs = () => {
  const [user] = useAuthState(auth);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Hardcoded Cloudinary images
  const carouselImages: ImageCarouselImage[] = [
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

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      try {
        const data = await contentService.getAboutUs();
        if (data) {
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
          setContent(defaultContent);
          if (user) {
            const idToken = await user.getIdToken();
            await contentService.put(idToken, 'about-us', defaultContent);
          }
        }
      } catch (error) {
        console.error('Error fetching about us content:', error);
        toast.error('Failed to load content');
      } finally {
        setIsLoading(false);
      }
    };
    fetchContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = async () => {
    if (!user) return;
    const toastId = toast.loading('Saving changes...');
    try {
      const idToken = await user.getIdToken();
      const saved = await contentService.put(idToken, 'about-us', {
        ...content,
        updatedAt: Date.now(),
        updatedBy: user.email
      });
      setContent(saved);
      setIsEditing(false);
      toast.success('Content updated successfully', { id: toastId });
    } catch (error) {
      console.error('Error saving about us content:', error);
      toast.error('Failed to save changes', { id: toastId });
    }
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

      <div className="mb-5">
        <ImageCarousel
          images={carouselImages}
          height="500px"
          interval={5000}
          fade={true}
          captionStyle="card"
        />
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