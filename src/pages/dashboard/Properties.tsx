import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebase';
import { propertyService } from '../../services/propertyService';
import { uploadService } from '../../services/uploadService';
import type { Property } from '../../types';

interface FormState {
  title: string;
  address: string;
  status: 'active' | 'inactive';
  basePrice: string;
  images: File[];
}

const initialForm: FormState = { title: '', address: '', status: 'active', basePrice: '', images: [] };

const Properties = () => {
  const [user] = useAuthState(auth);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<FormState>(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchProperties = async () => {
    if (!user) return;
    try {
      const idToken = await user.getIdToken();
      setProperties(await propertyService.list(idToken));
    } catch (error) {
      console.error(error);
      toast.error('Không tải được danh sách bất động sản');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSubmitting(true);
    try {
      const idToken = await user.getIdToken();
      let imageURLs: string[] | undefined;
      if (form.images.length > 0) {
        toast.loading('Đang tải ảnh...', { id: 'upload' });
        imageURLs = await uploadService.uploadImages(idToken, form.images, 'maokihouse/properties');
        toast.success('Tải ảnh thành công', { id: 'upload' });
      }

      const payload: Partial<Property> = {
        title: form.title.trim(),
        address: form.address.trim(),
        status: form.status,
        basePrice: parseFloat(form.basePrice) || 0,
        ...(imageURLs ? { imageURLs } : {}),
      };

      if (editingId) {
        await propertyService.update(idToken, editingId, payload);
        toast.success('Đã cập nhật bất động sản');
      } else {
        await propertyService.create(idToken, { ...payload, imageURLs: imageURLs || [] });
        toast.success('Đã thêm bất động sản');
      }

      setForm(initialForm);
      setEditingId(null);
      fetchProperties();
    } catch (error) {
      console.error(error);
      toast.error('Lưu bất động sản thất bại');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (property: Property) => {
    setForm({
      title: property.title,
      address: property.address,
      status: property.status,
      basePrice: String(property.basePrice),
      images: [],
    });
    setEditingId(property.id);
  };

  const handleDelete = async (property: Property) => {
    if (!user) return;
    if (!window.confirm(`Xóa bất động sản "${property.title}"?`)) return;
    try {
      const idToken = await user.getIdToken();
      await propertyService.remove(idToken, property.id);
      toast.success('Đã xóa');
      fetchProperties();
    } catch (error) {
      console.error(error);
      toast.error('Xóa thất bại');
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <Spinner animation="border" style={{ color: 'var(--color-primary)' }} />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4">
        <div className="eyebrow">Quản lý</div>
        <h1 className="font-display" style={{ fontSize: '1.9rem' }}>Room</h1>
      </div>

      <div className="elevated-card mb-4">
        <div className="card-body p-4">
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Tên bất động sản</Form.Label>
                  <Form.Control
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Địa chỉ</Form.Label>
                  <Form.Control
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Giá cơ bản / đêm</Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    value={form.basePrice}
                    onChange={(e) => setForm({ ...form, basePrice: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Trạng thái</Form.Label>
                  <Form.Select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value as 'active' | 'inactive' })}
                  >
                    <option value="active">Đang hoạt động</option>
                    <option value="inactive">Ngừng hoạt động</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Hình ảnh</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      const files = (e.target as HTMLInputElement).files;
                      setForm({ ...form, images: files ? Array.from(files) : [] });
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <div className="d-flex gap-2">
              <Button type="submit" disabled={submitting} className="pill-btn" style={{ border: 'none' }}>
                {submitting ? 'Đang lưu...' : editingId ? 'Cập nhật' : 'Thêm bất động sản'}
              </Button>
              {editingId && (
                <Button variant="outline-secondary" onClick={() => { setEditingId(null); setForm(initialForm); }}>
                  Hủy
                </Button>
              )}
            </div>
          </Form>
        </div>
      </div>

      <div className="row g-3">
        {properties.map((property) => (
          <div className="col-12" key={property.id}>
            <div className="elevated-card">
              <div className="card-body p-3 d-flex align-items-center gap-3 flex-wrap">
                <div className="d-flex gap-2" style={{ width: '220px', overflowX: 'auto' }}>
                  {property.imageURLs?.map((url, i) => (
                    <img key={i} src={url} alt={property.title} style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }} />
                  ))}
                </div>
                <div className="flex-grow-1">
                  <h3 className="h6 mb-1">{property.title}</h3>
                  <div className="text-muted small">{property.address}</div>
                  <div className="small mt-1">
                    <span className="badge" style={{ background: property.status === 'active' ? 'var(--color-gold)' : '#999', color: 'var(--color-ink)' }}>
                      {property.status === 'active' ? 'Hoạt động' : 'Ngừng'}
                    </span>
                    <span className="ms-2 text-muted">{property.basePrice.toLocaleString('vi-VN')} đ/đêm</span>
                  </div>
                </div>
                <div className="d-flex gap-2">
                  <Button size="sm" variant="outline-primary" onClick={() => handleEdit(property)}>Sửa</Button>
                  <Button size="sm" variant="outline-danger" onClick={() => handleDelete(property)}>Xóa</Button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {properties.length === 0 && <div className="text-muted">Chưa có bất động sản nào.</div>}
      </div>
    </div>
  );
};

export default Properties;
