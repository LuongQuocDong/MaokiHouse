import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Form, Button, Card, Container, Row, Col, Spinner } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebase';
import { homestayService } from '../../services/homestayService';
import { uploadService } from '../../services/uploadService';
import type { Homestay } from '../../types';

interface HomestayFormData {
  title: string;
  description: string;
  price: string;
  airbnbLink: string;
  phone: string;
  images: File[];
}

const initialFormData: HomestayFormData = {
  title: '',
  description: '',
  price: '',
  airbnbLink: '',
  phone: '',
  images: [],
};

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [homestays, setHomestays] = useState<Homestay[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<HomestayFormData>(initialFormData);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchHomestays();
  }, []);

  const fetchHomestays = async () => {
    try {
      const homestayList = await homestayService.list();
      setHomestays(homestayList);
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
    const files = e.target.files ? Array.from(e.target.files) : [];
    setFormData(prev => ({ ...prev, images: files }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error('You must be signed in as an admin to do this.');
      return;
    }

    setSubmitting(true);

    try {
      const idToken = await user.getIdToken();

      let imageURLs: string[] = [];
      if (formData.images.length > 0) {
        try {
          toast.loading('Uploading images...', { id: 'imageUpload' });
          imageURLs = await uploadService.uploadImages(idToken, formData.images, 'maoki-house/homestays');
          toast.success('Images uploaded successfully', { id: 'imageUpload' });
        } catch (error) {
          console.error('Image upload error:', error);
          toast.error('Failed to upload images. Please try again.', { id: 'imageUpload' });
          setSubmitting(false);
          return;
        }
      }

      toast.loading('Saving homestay...', { id: 'saveHomestay' });

      const existing = editingId ? homestays.find(h => h.id === editingId) : undefined;
      const homestayData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        price: parseFloat(formData.price),
        airbnbLink: formData.airbnbLink.trim(),
        phone: formData.phone.trim(),
        imageURLs: imageURLs.length > 0 ? imageURLs : (existing?.imageURLs ?? []),
        mainImageURL: imageURLs.length > 0 ? imageURLs[0] : (existing?.mainImageURL ?? ''),
      };

      if (editingId) {
        await homestayService.update(idToken, editingId, homestayData);
        toast.success('Homestay updated successfully', { id: 'saveHomestay' });
      } else {
        await homestayService.create(idToken, homestayData);
        toast.success('Homestay created successfully', { id: 'saveHomestay' });
      }

      setFormData(initialFormData);
      setEditingId(null);
      fetchHomestays();
    } catch (error) {
      console.error('Error saving homestay:', error);
      toast.error('Failed to save homestay. Please try again.');
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
      images: [], // Clear images for new form
    });
    setEditingId(homestay.id);
  };

  const handleDelete = async (homestay: Homestay) => {
    if (!user) return;
    if (!window.confirm('Are you sure you want to delete this homestay?')) return;

    try {
      const idToken = await user.getIdToken();
      await homestayService.remove(idToken, homestay.id);
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
    <Container className="py-5">
      <h1 className="mb-4">Manage Homestays</h1>

      <Card className="mb-5">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
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

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={5}
                required
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Price per Night ($)</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                  />
                </Form.Group>
              </Col>
            </Row>

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
              <Form.Label>Images</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required={!editingId}
                multiple
              />
              <Form.Text className="text-muted">
                {editingId ? 'Upload new images to replace the existing ones (optional). The first image will be used as the main image.' : 'Please select one or more images. The first image will be used as the main image.'}
              </Form.Text>
            </Form.Group>

            <div className="d-flex gap-2">
              <Button type="submit" disabled={submitting}>
                {submitting ? 'Saving...' : (editingId ? 'Update Homestay' : 'Add Homestay')}
              </Button>
              {editingId && (
                <Button
                  variant="secondary"
                  onClick={() => {
                    setEditingId(null);
                    setFormData(initialFormData);
                  }}
                >
                  Cancel Edit
                </Button>
              )}
            </div>
          </Form>
        </Card.Body>
      </Card>

      <h2 className="mb-4">Existing Homestays</h2>
      <Row className="g-4">
        {homestays.map((homestay) => (
          <Col key={homestay.id} xs={12}>
            <Card className="shadow-sm">
              <Card.Body className="d-flex align-items-center gap-3">
                <div className="d-flex gap-2" style={{ width: '300px', overflowX: 'auto' }}>
                  {homestay.imageURLs?.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`${homestay.title} - Image ${index + 1}`}
                      className="rounded"
                      style={{ width: '100px', height: '100px', objectFit: 'cover', flexShrink: 0 }}
                    />
                  ))}
                </div>
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
