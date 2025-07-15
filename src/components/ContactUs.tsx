import { useState, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import { ref as dbRef, get as dbGet, set as dbSet } from 'firebase/database';
import { Button, Card, Form } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { database, auth } from '../config/firebase';
import { toast } from 'react-hot-toast';

// Cloudinary configuration
const CLOUDINARY_CLOUD_NAME = 'dlkejgkqk';
const CLOUDINARY_UPLOAD_PRESET = 'maokihouse';

interface ContactContent {
  id: string;
  content: string;
  title: string;
  subtitle: string;
  imageURL?: string;
  updatedAt: number;
  updatedBy?: string;
}

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
        const contentRef = dbRef(database, 'contact/default');
        const snapshot = await dbGet(contentRef);
        
        if (snapshot.exists()) {
          setContent(snapshot.val());
          setEditedContent(snapshot.val().content);
          setEditedTitle(snapshot.val().title);
          setEditedSubtitle(snapshot.val().subtitle);
        } else {
          // Initialize with default content if none exists
          const defaultContent: ContactContent = {
            id: 'default',
            content: `Feel free to reach out to us for any inquiries about our homestay or tours. We're here to make your stay in Saigon memorable!`,
            title: 'Get in Touch',
            subtitle: "We'd love to hear from you",
            updatedAt: Date.now(),
          };
          await dbSet(dbRef(database, 'contact/default'), defaultContent);
          setContent(defaultContent);
          setEditedContent(defaultContent.content);
          setEditedTitle(defaultContent.title);
          setEditedSubtitle(defaultContent.subtitle);
        }
      } catch (error) {
        console.error('Error fetching contact content:', error);
        toast.error('Failed to load contact information');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  const uploadImageToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    formData.append('folder', 'maoki-house/contact');

    try {
      toast.loading('Uploading image...', { id: 'imageUpload' });
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData
        }
      );

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      toast.success('Image uploaded successfully', { id: 'imageUpload' });
      return data.secure_url;
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      toast.error('Failed to upload image', { id: 'imageUpload' });
      throw new Error('Failed to upload image. Please check your internet connection and try again.');
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      let imageURL = content?.imageURL;
      
      if (selectedImage) {
        try {
          imageURL = await uploadImageToCloudinary(selectedImage);
        } catch (error) {
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

      await dbSet(dbRef(database, 'contact/default'), updatedContent);
      setContent(updatedContent);
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
      <Card className="border-0 shadow-sm mb-5" style={{ backgroundColor: '#ffe6d8' }}>
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
    <Card className="border-0 shadow-sm mb-5" style={{ backgroundColor: '#ffe6d8' }}>
      <Card.Body className="p-4">
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
            <h1 className="display-4 mb-3" style={{ color: '#666' }}>
              {content.title}
            </h1>
            <div className="mb-4" style={{ color: '#ffa500', fontSize: '1.2rem' }}>
              {content.subtitle}
            </div>
            {content.imageURL && (
              <div className="mb-4">
                <img
                  src={content.imageURL}
                  alt="Contact us"
                  style={{ maxWidth: '100%', height: 'auto' }}
                  className="rounded shadow-sm"
                />
              </div>
            )}
            <div 
              className="mb-4 mx-auto" 
              style={{ 
                maxWidth: '800px',
                fontSize: '1.1rem',
                lineHeight: '1.8',
                color: '#666'
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