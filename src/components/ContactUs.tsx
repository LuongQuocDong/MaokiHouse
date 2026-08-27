import { useState, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';
import { contentService } from '../services/contentService';
import { uploadService } from '../services/uploadService';
import { toast } from 'react-hot-toast';
import type { ContactContent } from '../types';

const ContactUs = () => {
  const [user] = useAuthState(auth);
  const [content, setContent] = useState<ContactContent | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  const [editedTitle, setEditedTitle] = useState('');
  const [editedSubtitle, setEditedSubtitle] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await contentService.getContact();

        if (data) {
          setContent(data);
          setEditedContent(data.content);
          setEditedTitle(data.title);
          setEditedSubtitle(data.subtitle);
        } else {
          // Initialize with default content if none exists
          const defaultContent: ContactContent = {
            id: 'default',
            content: `Feel free to reach out to us for any inquiries about our homestay or tours. We're here to make your stay in Saigon memorable!`,
            title: 'Get in Touch',
            subtitle: "We'd love to hear from you",
            updatedAt: Date.now(),
          };
          setContent(defaultContent);
          setEditedContent(defaultContent.content);
          setEditedTitle(defaultContent.title);
          setEditedSubtitle(defaultContent.subtitle);
          if (user) {
            const idToken = await user.getIdToken();
            await contentService.put(idToken, 'contact', defaultContent);
          }
        }
      } catch (error) {
        console.error('Error fetching contact content:', error);
        toast.error('Failed to load contact information');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const idToken = await user.getIdToken();
      let imageURL = content?.imageURL;

      if (selectedImage) {
        try {
          toast.loading('Uploading image...', { id: 'imageUpload' });
          imageURL = await uploadService.uploadImage(idToken, selectedImage, 'maoki-house/contact');
          toast.success('Image uploaded successfully', { id: 'imageUpload' });
        } catch (error) {
          console.error('Error uploading image:', error);
          toast.error('Failed to upload image', { id: 'imageUpload' });
          setLoading(false);
          return;
        }
      }

      const updatedContent: ContactContent = {
        id: 'default',
        content: editedContent,
        title: editedTitle,
        subtitle: editedSubtitle,
        imageURL,
        updatedAt: Date.now(),
        updatedBy: user.uid
      };

      const saved = await contentService.put(idToken, 'contact', updatedContent);
      setContent(saved);
      setIsEditing(false);
      setSelectedImage(null);
      toast.success('Contact information updated successfully');
    } catch (error) {
      console.error('Error saving contact content:', error);
      toast.error('Failed to save changes');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card className="border-0 shadow-sm mb-5" style={{ backgroundColor: 'var(--color-blush)' }}>
        <Card.Body className="p-4 text-center">
          Loading...
        </Card.Body>
      </Card>
    );
  }

  if (!content) {
    return null;
  }

  return (
    <Card className="border-0 mb-5 welcome-card" style={{ backgroundColor: 'var(--color-cream)' }}>
      <Card.Body className="p-4 p-md-5">
        {isEditing && user ? (
          <>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="mb-3"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Subtitle</Form.Label>
              <Form.Control
                type="text"
                value={editedSubtitle}
                onChange={(e) => setEditedSubtitle(e.target.value)}
                className="mb-3"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                rows={5}
                className="mb-3"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mb-3"
              />
              {content.imageURL && (
                <div className="mb-2">
                  <img
                    src={content.imageURL}
                    alt="Current contact image"
                    style={{ maxWidth: '200px', height: 'auto' }}
                    className="rounded"
                  />
                </div>
              )}
            </Form.Group>

            <div className="d-flex gap-2">
              <Button onClick={handleSave} variant="primary">
                Save
              </Button>
              <Button onClick={() => {
                setIsEditing(false);
                setSelectedImage(null);
              }} variant="outline-secondary">
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <div className="eyebrow mb-3">Get In Touch</div>
            <h1 className="font-display mb-3" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              {content.title}
            </h1>
            <div className="gold-divider"><i className="bi bi-envelope-heart gold-divider-icon"></i></div>
            <div className="mb-4" style={{ color: 'var(--color-gold)', fontSize: '1.15rem', fontStyle: 'italic' }}>
              {content.subtitle}
            </div>
            {content.imageURL && (
              <div className="mb-4">
                <img
                  src={content.imageURL}
                  alt="Contact us"
                  style={{ maxWidth: '100%', height: 'auto', borderRadius: '16px' }}
                  className="shadow-sm"
                />
              </div>
            )}
            <div
              className="mb-4 mx-auto"
              style={{
                maxWidth: '760px',
                fontSize: '1.1rem',
                lineHeight: '1.9',
                color: 'var(--color-ink)',
                opacity: 0.85
              }}
            >
              {content.content}
            </div>
            {user && (
              <div className="mt-4">
                <Button
                  onClick={() => setIsEditing(true)}
                  variant="outline-primary"
                  className="rounded-pill px-4"
                >
                  Edit Content
                </Button>
              </div>
            )}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default ContactUs;
