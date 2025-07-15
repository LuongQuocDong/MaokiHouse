import { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, database } from '../config/firebase';
import { ref, get, set } from 'firebase/database';
import type { AboutUsContent } from '../types';
import toast from 'react-hot-toast';

const AboutUs = () => {
  const [user] = useAuthState(auth);
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState<AboutUsContent>({
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
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const contentRef = ref(database, 'content/about-us');
        const snapshot = await get(contentRef);
        if (snapshot.exists()) {
          setContent(snapshot.val() as AboutUsContent);
        } else {
          // If no content exists, save the default content
          await set(contentRef, content);
        }
      } catch (error) {
        console.error('Error fetching about us content:', error);
        toast.error('Failed to load content');
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