import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebase';
import { homestayService } from '../../services/homestayService';
import { uploadService } from '../../services/uploadService';
import type { Homestay } from '../../types';
import { useConfirm } from '../../components/dashboard/ConfirmDialog';

interface FormState {
  title: string;
  description: string;
  price: string;
  airbnbLink: string;
  phone: string;
  images: File[];
}

const initialForm: FormState = { title: '', description: '', price: '', airbnbLink: '', phone: '', images: [] };

const Properties = () => {
  const confirm = useConfirm();
  const [user] = useAuthState(auth);
  const [homestays, setHomestays] = useState<Homestay[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<FormState>(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchHomestays = async () => {
    try {
      setHomestays(await homestayService.list());
    } catch (error) {
      console.error(error);
      toast.error('Không tải được danh sách phòng');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHomestays();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSubmitting(true);
    try {
      const idToken = await user.getIdToken();
      const existing = editingId ? homestays.find((h) => h.id === editingId) : undefined;

      let imageURLs: string[] = existing?.imageURLs ?? [];
      if (form.images.length > 0) {
        toast.loading('Đang tải ảnh...', { id: 'upload' });
        imageURLs = await uploadService.uploadImages(idToken, form.images, 'maokihouse/homestays');
        toast.success('Tải ảnh thành công', { id: 'upload' });
      }

      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        price: parseFloat(form.price) || 0,
        airbnbLink: form.airbnbLink.trim(),
        phone: form.phone.trim(),
        imageURLs,
        mainImageURL: imageURLs[0] || existing?.mainImageURL || '',
      };

      if (editingId) {
        await homestayService.update(idToken, editingId, payload);
        toast.success('Đã cập nhật phòng');
      } else {
        await homestayService.create(idToken, payload);
        toast.success('Đã thêm phòng mới');
      }

      setForm(initialForm);
      setEditingId(null);
      fetchHomestays();
    } catch (error) {
      console.error(error);
      toast.error('Lưu phòng thất bại');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (homestay: Homestay) => {
    setForm({
      title: homestay.title,
      description: homestay.description,
      price: String(homestay.price),
      airbnbLink: homestay.airbnbLink || '',
      phone: homestay.phone || '',
      images: [],
    });
    setEditingId(homestay.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (homestay: Homestay) => {
    if (!user) return;
    if (!(await confirm(`Xóa phòng "${homestay.title}"?`, { danger: true, confirmLabel: 'Xóa' }))) return;
    try {
      const idToken = await user.getIdToken();
      await homestayService.remove(idToken, homestay.id);
      toast.success('Đã xóa');
      fetchHomestays();
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
        <h1 className="font-display" style={{ fontSize: '1.9rem' }}>Phòng</h1>
        <p className="text-muted small mb-0">
          Thêm/sửa phòng ở đây sẽ hiển thị trực tiếp trên trang chủ để khách xem và đặt phòng.
        </p>
      </div>

      <div className="elevated-card mb-4">
        <div className="card-body p-4">
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Tên phòng</Form.Label>
                  <Form.Control
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Giá / đêm ($)</Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Mô tả</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Link Airbnb</Form.Label>
                  <Form.Control
                    type="url"
                    value={form.airbnbLink}
                    onChange={(e) => setForm({ ...form, airbnbLink: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Số điện thoại</Form.Label>
                  <Form.Control
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

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
                required={!editingId}
              />
              <Form.Text className="text-muted">
                {editingId
                  ? 'Chọn ảnh mới để thay thế ảnh cũ (không bắt buộc). Ảnh đầu tiên sẽ là ảnh chính.'
                  : 'Chọn một hoặc nhiều ảnh. Ảnh đầu tiên sẽ là ảnh chính.'}
              </Form.Text>
            </Form.Group>

            <div className="d-flex gap-2">
              <Button type="submit" disabled={submitting} className="pill-btn" style={{ border: 'none' }}>
                {submitting ? 'Đang lưu...' : editingId ? 'Cập nhật phòng' : 'Thêm phòng'}
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
        {homestays.map((homestay) => (
          <div className="col-12" key={homestay.id}>
            <div className="elevated-card">
              <div className="card-body p-3 d-flex align-items-center gap-3 flex-wrap">
                <div className="d-flex gap-2" style={{ width: '220px', overflowX: 'auto' }}>
                  {(homestay.imageURLs?.length ? homestay.imageURLs : [homestay.mainImageURL].filter(Boolean)).map((url, i) => (
                    <img key={i} src={url} alt={homestay.title} style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }} />
                  ))}
                </div>
                <div className="flex-grow-1">
                  <h3 className="h6 mb-1">{homestay.title}</h3>
                  <div className="text-muted small">${homestay.price}/đêm</div>
                </div>
                <div className="d-flex gap-2">
                  <Button size="sm" variant="outline-primary" onClick={() => handleEdit(homestay)}>Sửa</Button>
                  <Button size="sm" variant="outline-danger" onClick={() => handleDelete(homestay)}>Xóa</Button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {homestays.length === 0 && <div className="text-muted">Chưa có phòng nào.</div>}
      </div>
    </div>
  );
};

export default Properties;
