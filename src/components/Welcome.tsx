import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ref, get, set } from 'firebase/database';
import { Button, Card, Form } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { database, auth } from '../config/firebase';
import type { WelcomeContent } from '../types';

const Welcome = () => {
  const [user] = useAuthState(auth);
  const [content, setContent] = useState<WelcomeContent | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const contentRef = ref(database, 'welcome/default');
        const snapshot = await get(contentRef);
        
        if (snapshot.exists()) {
          setContent(snapshot.val());
          setEditedContent(snapshot.val().content);
        } else {
          // Initialize with default content if none exists
          const defaultContent: WelcomeContent = {
            id: 'default',
            content: `As your local companion, we take you on free walking street tours where we can tell you hundreds littles things about the city of Saigon, listening to all the things you have to say about your country. We learn from the stories that we have been told and our tour guides pass on knowledge from there henceforth. That is what we have aimed to gain and done for the last 15 years.`,
            title: 'Travel with local youth',
            subtitle: 'We love wandering around, talking, sharing things about our lovely Saigon.',
            updatedAt: Date.now(),
          };
          await set(ref(database, 'welcome/default'), defaultContent);
          setContent(defaultContent);
          setEditedContent(defaultContent.content);
        }
      } catch (error) {
        console.error('Error fetching welcome content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  const handleSave = async () => {
    if (!user) return;
    
    try {
      const updatedContent: WelcomeContent = {
        id: 'default',
        content: editedContent,
        title: content?.title || 'Welcome to Maoki House – Your Local Home in Saigon!',
        subtitle: content?.subtitle || 'We love wandering around, talking, sharing things about our lovely Saigon.',
        updatedAt: Date.now(),
        updatedBy: user.uid
      };
      await set(ref(database, 'welcome/default'), updatedContent);
      setContent(updatedContent);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving welcome content:', error);
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

  const renderContent = (text: string) => {
    return text.replace(
      'free walking street tours',
      '<span style="color: #dc3545">free walking street tours</span>'
    );
  };

  return (
    <Card className="border-0 shadow-sm mb-5" style={{ backgroundColor: '#ffe6d8' }}>
      <Card.Body className="p-4">
        {isEditing && user ? (
          <>
            <Form.Control
              as="textarea"
              value={editedContent}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEditedContent(e.target.value)}
              rows={8}
              className="mb-3"
            />
            <div className="d-flex gap-2">
              <Button onClick={handleSave} variant="primary">
                Save
              </Button>
              <Button onClick={() => setIsEditing(false)} variant="outline-secondary">
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <h1 className="display-4 mb-3" style={{ color: '#666' }}>
              <span style={{ color: '#666' }}>Welcome to </span>
              <span style={{ color: '#dc3545' }}>Maoki House</span>
              <div style={{ fontSize: '0.8em' }}>Your Local Home in Saigon!</div>
            </h1>
            <div className="mb-4" style={{ color: '#ffa500', fontSize: '1.2rem' }}>
              {content.subtitle}
            </div>
            <div 
              className="mb-4 mx-auto" 
              style={{ 
                maxWidth: '800px',
                fontSize: '1.1rem',
                lineHeight: '1.8',
                color: '#666'
              }}
              dangerouslySetInnerHTML={{ __html: renderContent(content.content) }}
            />
            <div className="d-flex justify-content-center mt-5">
              <Link 
                to="/about"
                className="btn btn-outline-danger px-4 py-2"
                style={{
                  borderRadius: '25px',
                  fontSize: '1.1rem'
                }}
              >
                READ MORE
              </Link>
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

export default Welcome; 