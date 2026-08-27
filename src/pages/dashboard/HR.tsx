import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Form, Button, Table, Spinner } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebase';
import { employeeService } from '../../services/employeeService';
import type { Employee } from '../../types';

const emptyForm = { name: '', role: '', email: '', phone: '', status: 'active' as 'active' | 'inactive' };

const HR = () => {
  const [user] = useAuthState(auth);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const load = async () => {
    if (!user) return;
    try {
      const idToken = await user.getIdToken();
      setEmployees(await employeeService.list(idToken));
    } catch (error) {
      console.error(error);
      toast.error('Không tải được danh sách nhân sự');
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
      if (editingId) {
        await employeeService.update(idToken, editingId, form);
        toast.success('Đã cập nhật');
      } else {
        await employeeService.create(idToken, form);
        toast.success('Đã thêm nhân sự');
      }
      setForm(emptyForm);
      setEditingId(null);
      load();
    } catch (error) {
      console.error(error);
      toast.error('Lưu thất bại');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (emp: Employee) => {
    setForm({ name: emp.name, role: emp.role, email: emp.email, phone: emp.phone, status: emp.status });
    setEditingId(emp.id);
  };

  const handleDelete = async (emp: Employee) => {
    if (!user) return;
    if (!window.confirm(`Xóa nhân sự "${emp.name}"?`)) return;
    try {
      const idToken = await user.getIdToken();
      await employeeService.remove(idToken, emp.id);
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
      <div className="mb-4">
        <div className="eyebrow">Nhân sự</div>
        <h1 className="font-display" style={{ fontSize: '1.9rem' }}>Đội ngũ vận hành</h1>
      </div>

      <div className="elevated-card mb-4">
        <div className="card-body p-4">
          <Form onSubmit={handleSubmit} className="row g-2 align-items-end">
            <div className="col-md-3">
              <Form.Label>Họ tên</Form.Label>
              <Form.Control value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div className="col-md-2">
              <Form.Label>Vai trò</Form.Label>
              <Form.Control value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} required />
            </div>
            <div className="col-md-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="col-md-2">
              <Form.Label>Điện thoại</Form.Label>
              <Form.Control value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div className="col-md-1">
              <Form.Label>Trạng thái</Form.Label>
              <Form.Select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as 'active' | 'inactive' })}>
                <option value="active">Hoạt động</option>
                <option value="inactive">Ngừng</option>
              </Form.Select>
            </div>
            <div className="col-md-1">
              <Button type="submit" disabled={submitting} className="pill-btn w-100" style={{ border: 'none' }}>
                {editingId ? 'Lưu' : 'Thêm'}
              </Button>
            </div>
          </Form>
        </div>
      </div>

      <div className="elevated-card">
        <div className="card-body p-3" style={{ overflowX: 'auto' }}>
          <Table hover responsive className="mb-0">
            <thead>
              <tr><th>Họ tên</th><th>Vai trò</th><th>Email</th><th>Điện thoại</th><th>Trạng thái</th><th></th></tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.name}</td>
                  <td>{emp.role}</td>
                  <td>{emp.email}</td>
                  <td>{emp.phone}</td>
                  <td className="text-capitalize">{emp.status === 'active' ? 'Hoạt động' : 'Ngừng'}</td>
                  <td className="d-flex gap-2">
                    <Button size="sm" variant="outline-primary" onClick={() => handleEdit(emp)}>Sửa</Button>
                    <Button size="sm" variant="outline-danger" onClick={() => handleDelete(emp)}>Xóa</Button>
                  </td>
                </tr>
              ))}
              {employees.length === 0 && <tr><td colSpan={6} className="text-muted text-center py-3">Chưa có nhân sự nào.</td></tr>}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default HR;
