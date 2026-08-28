import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Form, Button, Table, Spinner } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import { auth } from '../../config/firebase';
import { revenueService } from '../../services/revenueService';
import type { RevenueEntry, RevenueEntryType } from '../../types';
import ThemedSelect from '../../components/dashboard/ThemedSelect';
import ThemedDatePicker from '../../components/dashboard/ThemedDatePicker';
import { useConfirm } from '../../components/dashboard/ConfirmDialog';

const TYPE_LABELS: Record<RevenueEntryType, string> = {
  booking_payout: 'Thanh toán đặt phòng',
  expense: 'Chi phí',
  adjustment: 'Điều chỉnh',
};

const TYPE_OPTIONS: { value: RevenueEntryType; label: string }[] = [
  { value: 'booking_payout', label: 'Thanh toán đặt phòng' },
  { value: 'expense', label: 'Chi phí' },
  { value: 'adjustment', label: 'Điều chỉnh' },
];

const emptyForm = { type: 'booking_payout' as RevenueEntryType, amount: '', description: '', date: new Date().toISOString().slice(0, 10) };

const Revenue = () => {
  const confirm = useConfirm();
  const [user] = useAuthState(auth);
  const [entries, setEntries] = useState<RevenueEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  const load = async () => {
    if (!user) return;
    try {
      const idToken = await user.getIdToken();
      setEntries(await revenueService.list(idToken));
    } catch (error) {
      console.error(error);
      toast.error('Không tải được doanh thu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSubmitting(true);
    try {
      const idToken = await user.getIdToken();
      await revenueService.create(idToken, {
        type: form.type,
        amount: parseFloat(form.amount) || 0,
        description: form.description.trim(),
        date: form.date,
      });
      toast.success('Đã thêm mục doanh thu');
      setForm(emptyForm);
      load();
    } catch (error) {
      console.error(error);
      toast.error('Lưu thất bại');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (entry: RevenueEntry) => {
    if (!user) return;
    if (!(await confirm('Xóa mục này?', { danger: true, confirmLabel: 'Xóa' }))) return;
    try {
      const idToken = await user.getIdToken();
      await revenueService.remove(idToken, entry.id);
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

  const totals: Record<string, { income: number; expense: number }> = {};
  entries.forEach((e) => {
    const key = e.date.slice(0, 7);
    if (!totals[key]) totals[key] = { income: 0, expense: 0 };
    if (e.type === 'expense') totals[key].expense += e.amount;
    else totals[key].income += e.amount;
  });
  const chartData = Object.entries(totals)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-6)
    .map(([month, v]) => ({ month, ...v }));

  return (
    <div>
      <div className="mb-4">
        <div className="eyebrow">Tài chính</div>
        <h1 className="font-display" style={{ fontSize: '1.9rem' }}>Doanh thu &amp; chi phí</h1>
      </div>

      <div className="elevated-card mb-4">
        <div className="card-body p-4">
          <h3 className="h6 mb-3" style={{ fontFamily: 'var(--font-display)' }}>Doanh thu so với chi phí</h3>
          <div style={{ width: '100%', height: 280 }}>
            <ResponsiveContainer>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(43,24,16,0.1)" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" fill="var(--color-gold)" name="Thu" />
                <Bar dataKey="expense" fill="var(--color-primary)" name="Chi" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="elevated-card mb-4">
        <div className="card-body p-4">
          <Form onSubmit={handleSubmit} className="row g-2 align-items-end">
            <div className="col-md-3">
              <Form.Label>Loại</Form.Label>
              <ThemedSelect
                value={form.type}
                onChange={(v) => setForm({ ...form, type: v as RevenueEntryType })}
                options={TYPE_OPTIONS}
              />
            </div>
            <div className="col-md-2">
              <Form.Label>Số tiền</Form.Label>
              <Form.Control type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} required />
            </div>
            <div className="col-md-2">
              <Form.Label>Ngày</Form.Label>
              <ThemedDatePicker value={form.date} onChange={(v) => setForm({ ...form, date: v })} required />
            </div>
            <div className="col-md-3">
              <Form.Label>Mô tả</Form.Label>
              <Form.Control value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <div className="col-md-2">
              <Button type="submit" disabled={submitting} className="pill-btn w-100" style={{ border: 'none' }}>
                Thêm
              </Button>
            </div>
          </Form>
        </div>
      </div>

      <div className="elevated-card">
        <div className="card-body p-3" style={{ overflowX: 'auto' }}>
          <Table hover responsive className="mb-0">
            <thead>
              <tr><th>Ngày</th><th>Loại</th><th>Mô tả</th><th>Số tiền</th><th></th></tr>
            </thead>
            <tbody>
              {entries.map((e) => (
                <tr key={e.id}>
                  <td>{e.date}</td>
                  <td>{TYPE_LABELS[e.type]}</td>
                  <td>{e.description}</td>
                  <td style={{ color: e.type === 'expense' ? 'var(--color-primary)' : 'inherit' }}>
                    {e.type === 'expense' ? '-' : ''}{e.amount.toLocaleString('vi-VN')} đ
                  </td>
                  <td><Button size="sm" variant="outline-danger" onClick={() => handleDelete(e)}>Xóa</Button></td>
                </tr>
              ))}
              {entries.length === 0 && <tr><td colSpan={5} className="text-muted text-center py-3">Chưa có dữ liệu.</td></tr>}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Revenue;
