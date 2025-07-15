import { useState, useEffect } from 'react';
import { ref, push, set, get, remove, update } from 'firebase/database';
import { signInAnonymously } from 'firebase/auth';
import toast from 'react-hot-toast';
import { Form, Button, Card, Container, Row, Col, Spinner } from 'react-bootstrap';
import { database, auth } from '../../config/firebase';
import type { Homestay } from '../../types';

interface HomestayFormData {
  title: string;
  description: string;
  price: string;
  airbnbLink: string;
  phone: string;
  image: File | null;
}

interface HomestayData extends Omit<Homestay, 'id'> {
  timestamp: number;
}

const initialFormData: HomestayFormData = {
  title: '',
  description: '',
  price: '',
  airbnbLink: '',
  phone: '',
  image: null,
};

// Cloudinary configuration
const CLOUDINARY_CLOUD_NAME = 'dlkejgkqk';
const CLOUDINARY_UPLOAD_PRESET = 'maokihouse';

const Dashboard = () => {
  const [homestays, setHomestays] = useState<Homestay[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<HomestayFormData>(initialFormData);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Sign in anonymously if no user is logged in
        if (!auth.currentUser) {
          await signInAnonymously(auth);
        }
      } catch (error) {
        console.error('Auth error:', error);
      }
    };

    initializeAuth();
    fetchHomestays();
  }, []);

  const fetchHomestays = async () => {
    try {
      const homestaysRef = ref(database, 'homestays');
      const snapshot = await get(homestaysRef);
      
      if (snapshot.exists()) {
        const data = snapshot.val();
        const homestayList = Object.entries(data)
          .map(([id, value]) => ({
            id,
            ...(value as HomestayData)
          }))
          .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0)); // Sort by newest first
        setHomestays(homestayList);
      } else {
        setHomestays([]);
      }
    } catch (error) {
      console.error('Error fetching homestays:', error);
      toast.error('Failed to load homestays. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, image: file }));
  };

  const uploadImageToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const data = await response.json();
    return data.secure_url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Ensure we have a user
      if (!auth.currentUser) {
        await signInAnonymously(auth);
      }

      // Check again after sign in attempt
      if (!auth.currentUser) {
        throw new Error('Failed to authenticate. Please try again.');
      }

      let imageURL = '';
      if (formData.image) {
        try {
          toast.loading('Uploading image...', { id: 'imageUpload' });
          imageURL = await uploadImageToCloudinary(formData.image);
          toast.success('Image uploaded successfully', { id: 'imageUpload' });
        } catch (error) {
          console.error('Image upload error:', error);
          toast.error('Failed to upload image. Please try again.', { id: 'imageUpload' });
          setSubmitting(false);
          return;
        }
      }

      toast.loading('Saving homestay...', { id: 'saveHomestay' });
      const homestayData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        price: parseFloat(formData.price),
        airbnbLink: formData.airbnbLink.trim(),
        phone: formData.phone.trim(),
        timestamp: Date.now(),
        imageURL: imageURL || (editingId ? homestays.find(h => h.id === editingId)?.imageURL : ''),
        updatedAt: Date.now(),
        updatedBy: auth.currentUser.uid
      };

      if (editingId) {
        const updateRef = ref(database, `homestays/${editingId}`);
        await update(updateRef, homestayData);
        toast.success('Homestay updated successfully', { id: 'saveHomestay' });
      } else {
        const newHomestayRef = push(ref(database, 'homestays'));
        await set(newHomestayRef, homestayData);
        toast.success('Homestay created successfully', { id: 'saveHomestay' });
      }

      setFormData(initialFormData);
      setEditingId(null);
      fetchHomestays();
    } catch (error) {
      console.error('Error saving homestay:', error);
      toast.error('Failed to save homestay. Please try again.', { id: 'saveHomestay' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (homestay: Homestay) => {
    setFormData({
      title: homestay.title,
      description: homestay.description,
      price: homestay.price.toString(),
      airbnbLink: homestay.airbnbLink,
      phone: homestay.phone,
      image: null,
    });
    setEditingId(homestay.id);
  };

  const handleDelete = async (homestay: Homestay) => {
    if (!window.confirm('Are you sure you want to delete this homestay?')) return;

    try {
      const homestayRef = ref(database, `homestays/${homestay.id}`);
      await remove(homestayRef);
      toast.success('Homestay deleted successfully');
      fetchHomestays();
    } catch (error) {
      console.error('Error deleting homestay:', error);
      toast.error('Failed to delete homestay');
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-50">
        <Spinner animation="border" style={{ color: '#824a39' }} />
      </div>
    );
  }

  return (
    <Container>
      <h1 className="mb-4" style={{ color: '#824a39' }}>
        {editingId ? 'Edit Homestay' : 'Add New Homestay'}
      </h1>

      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Price per night ($)</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                required
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Airbnb Link</Form.Label>
                  <Form.Control
                    type="url"
                    name="airbnbLink"
                    value={formData.airbnbLink}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required={!editingId}
              />
              <Form.Text className="text-muted">
                {editingId ? 'Upload a new image to replace the existing one (optional)' : 'Please select an image'}
              </Form.Text>
            </Form.Group>

            <div className="d-flex gap-2">
              <Button
                type="submit"
                disabled={submitting}
                className="flex-grow-1"
                style={{ backgroundColor: '#824a39', borderColor: '#824a39', color: '#fdf2e9' }}
              >
                {submitting ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    {editingId ? 'Updating...' : 'Adding...'}
                  </>
                ) : (
                  editingId ? 'Update Homestay' : 'Add Homestay'
                )}
              </Button>

              {editingId && (
                <Button
                  variant="outline-secondary"
                  onClick={() => {
                    setFormData(initialFormData);
                    setEditingId(null);
                  }}
                  className="flex-grow-1"
                >
                  Cancel Edit
                </Button>
              )}
            </div>
          </Form>
        </Card.Body>
      </Card>

      <h2 className="mb-3" style={{ color: '#824a39' }}>Manage Homestays</h2>
      <Row className="g-4">
        {homestays.map((homestay) => (
          <Col key={homestay.id} xs={12}>
            <Card className="shadow-sm">
              <Card.Body className="d-flex align-items-center gap-3">
                <img
                  src={homestay.imageURL}
                  alt={homestay.title}
                  className="rounded"
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />
                <div className="flex-grow-1">
                  <h3 className="h5 mb-1" style={{ color: '#824a39' }}>{homestay.title}</h3>
                  <p className="text-muted mb-0">${homestay.price}/night</p>
                </div>
                <div className="d-flex gap-2">
                  <Button
                    onClick={() => handleEdit(homestay)}
                    style={{ backgroundColor: 'transparent', color: '#824a39' }}
                    className="hover-primary"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(homestay)}
                    variant="outline-danger"
                  >
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Dashboard; 