import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { Table, Button, Form, Modal, Spinner } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebase';
import { bookingService } from '../../services/bookingService';
import { propertyService } from '../../services/propertyService';
import type { Booking, BookingSource, BookingStatus, Property } from '../../types';

const STATUS_LABELS: Record<BookingStatus, string> = {
  confirmed: 'Đã xác nhận',
  pending: 'Chờ xác nhận',
  cancelled: 'Đã hủy',
};

const SOURCE_LABELS: Record<BookingSource, string> = {
  airbnb: 'Airbnb',
  booking: 'Booking.com',
  agoda: 'Agoda',
  direct: 'Trực tiếp',
};

const emptyForm = {
  propertyId: '',
  guestName: '',
  source: 'direct' as BookingSource,
  checkIn: '',
  checkOut: '',
  status: 'pending' as BookingStatus,
  payoutAmount: '',
};

const Bookings = () => {
  const [user] = useAuthState(auth);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [filterProperty, setFilterProperty] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterSource, setFilterSource] = useState('');

  const load = async () => {
    if (!user) return;
    try {
      const idToken = await user.getIdToken();
      const [bks, props] = await Promise.all([bookingService.list(idToken), propertyService.list(idToken)]);
      setBookings(bks);
      setProperties(props);
    } catch (error) {
      console.error(error);
      toast.error('Không tải được danh sách đặt phòng');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const propertyName = (id: string) => properties.find((p) => p.id === id)?.title || '—';

  const filtered = useMemo(
    () =>
      bookings.filter(
        (b) =>
          (!filterProperty || b.propertyId === filterProperty) &&
          (!filterStatus || b.status === filterStatus) &&
          (!filterSource || b.source === filterSource)
      ),
    [bookings, filterProperty, filterStatus, filterSource]
  );

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (b: Booking) => {
    setEditingId(b.id);
    setForm({
      propertyId: b.propertyId,
      guestName: b.guestName,
      source: b.source,
      checkIn: b.checkIn,
      checkOut: b.checkOut,
      status: b.status,
      payoutAmount: String(b.payoutAmount),
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!user) return;
    try {
      const idToken = await user.getIdToken();
      const payload = {
        propertyId: form.propertyId,
        guestName: form.guestName.trim(),
        source: form.source,
        checkIn: form.checkIn,
        checkOut: form.checkOut,
        status: form.status,
        payoutAmount: parseFloat(form.payoutAmount) || 0,
      };
      if (editingId) {
        await bookingService.update(idToken, editingId, payload);
        toast.success('Đã cập nhật đặt phòng');
      } else {
        await bookingService.create(idToken, payload);
        toast.success('Đã thêm đặt phòng');
      }
      setShowModal(false);
      load();
    } catch (error) {
      console.error(error);
      toast.error('Lưu đặt phòng thất bại');
    }
  };

  const handleDelete = async (b: Booking) => {
    if (!user) return;
    if (!window.confirm(`Xóa đặt phòng của ${b.guestName}?`)) return;
    try {
      const idToken = await user.getIdToken();
      await bookingService.remove(idToken, b.id);
      toast.success('Đã xóa');
      load();
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
      <div className="d-flex justify-content-between align-items-end mb-4 flex-wrap gap-2">
        <div>
          <div className="eyebrow">Quản lý</div>
          <h1 className="font-display" style={{ fontSize: '1.9rem' }}>Đặt phòng</h1>
        </div>
        <Button className="pill-btn" style={{ border: 'none' }} onClick={openCreate}>+ Thêm đặt phòng</Button>
      </div>

      <div className="d-flex gap-2 mb-3 flex-wrap">
        <Form.Select style={{ maxWidth: 220 }} value={filterProperty} onChange={(e) => setFilterProperty(e.target.value)}>
          <option value="">Tất cả bất động sản</option>
          {properties.map((p) => <option key={p.id} value={p.id}>{p.title}</option>)}
        </Form.Select>
        <Form.Select style={{ maxWidth: 180 }} value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="">Tất cả trạng thái</option>
          <option value="confirmed">Đã xác nhận</option>
          <option value="pending">Chờ xác nhận</option>
          <option value="cancelled">Đã hủy</option>
        </Form.Select>
        <Form.Select style={{ maxWidth: 180 }} value={filterSource} onChange={(e) => setFilterSource(e.target.value)}>
          <option value="">Tất cả kênh</option>
          <option value="airbnb">Airbnb</option>
          <option value="booking">Booking.com</option>
          <option value="agoda">Agoda</option>
          <option value="direct">Trực tiếp</option>
        </Form.Select>
      </div>

      <div className="elevated-card">
        <div className="card-body p-3" style={{ overflowX: 'auto' }}>
          <Table hover responsive className="mb-0">
            <thead>
              <tr>
                <th>Khách</th>
                <th>Phòng</th>
                <th>Kênh</th>
                <th>Nhận phòng</th>
                <th>Trả phòng</th>
                <th>Trạng thái</th>
                <th>Thanh toán</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((b) => (
                <tr key={b.id}>
                  <td>{b.guestName}</td>
                  <td>{propertyName(b.propertyId)}</td>
                  <td>{SOURCE_LABELS[b.source]}</td>
                  <td>{b.checkIn}</td>
                  <td>{b.checkOut}</td>
                  <td>{STATUS_LABELS[b.status]}</td>
                  <td>{b.payoutAmount.toLocaleString('vi-VN')} đ</td>
                  <td className="d-flex gap-2">
                    <Button size="sm" variant="outline-primary" onClick={() => openEdit(b)}>Sửa</Button>
                    <Button size="sm" variant="outline-danger" onClick={() => handleDelete(b)}>Xóa</Button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={8} className="text-muted text-center py-3">Không có đặt phòng nào.</td></tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editingId ? 'Sửa đặt phòng' : 'Thêm đặt phòng'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Phòng</Form.Label>
            <Form.Select value={form.propertyId} onChange={(e) => setForm({ ...form, propertyId: e.target.value })}>
              <option value="">Chọn bất động sản</option>
              {properties.map((p) => <option key={p.id} value={p.id}>{p.title}</option>)}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tên khách</Form.Label>
            <Form.Control value={form.guestName} onChange={(e) => setForm({ ...form, guestName: e.target.value })} />
          </Form.Group>
          <div className="row">
            <div className="col-6 mb-3">
              <Form.Label>Nhận phòng</Form.Label>
              <Form.Control type="date" value={form.checkIn} onChange={(e) => setForm({ ...form, checkIn: e.target.value })} />
            </div>
            <div className="col-6 mb-3">
              <Form.Label>Trả phòng</Form.Label>
              <Form.Control type="date" value={form.checkOut} onChange={(e) => setForm({ ...form, checkOut: e.target.value })} />
            </div>
          </div>
          <div className="row">
            <div className="col-6 mb-3">
              <Form.Label>Kênh</Form.Label>
              <Form.Select value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value as BookingSource })}>
                <option value="airbnb">Airbnb</option>
                <option value="booking">Booking.com</option>
                <option value="agoda">Agoda</option>
                <option value="direct">Trực tiếp</option>
              </Form.Select>
            </div>
            <div className="col-6 mb-3">
              <Form.Label>Trạng thái</Form.Label>
              <Form.Select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as BookingStatus })}>
                <option value="confirmed">Đã xác nhận</option>
                <option value="pending">Chờ xác nhận</option>
                <option value="cancelled">Đã hủy</option>
              </Form.Select>
            </div>
          </div>
          <Form.Group className="mb-3">
            <Form.Label>Số tiền thanh toán</Form.Label>
            <Form.Control type="number" min="0" value={form.payoutAmount} onChange={(e) => setForm({ ...form, payoutAmount: e.target.value })} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShowModal(false)}>Hủy</Button>
          <Button onClick={handleSave} className="pill-btn" style={{ border: 'none' }}>Lưu</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Bookings;
