import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { auth } from '../../config/firebase';
import { propertyService } from '../../services/propertyService';
import { bookingService } from '../../services/bookingService';
import { revenueService } from '../../services/revenueService';
import type { Property, Booking, RevenueEntry } from '../../types';

const monthLabel = (date: Date) => date.toLocaleDateString('vi-VN', { month: 'short', year: '2-digit' });

const Overview = () => {
  const [user] = useAuthState(auth);
  const [properties, setProperties] = useState<Property[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [revenue, setRevenue] = useState<RevenueEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const idToken = await user.getIdToken();
        const [props, bks, rev] = await Promise.all([
          propertyService.list(idToken),
          bookingService.list(idToken),
          revenueService.list(idToken),
        ]);
        setProperties(props);
        setBookings(bks);
        setRevenue(rev);
      } catch (error) {
        console.error('Error loading overview data:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '40vh' }}>
        <Spinner animation="border" style={{ color: 'var(--color-primary)' }} />
      </div>
    );
  }

  const today = new Date();
  const upcomingBookings = bookings.filter((b) => new Date(b.checkIn) >= today && b.status !== 'cancelled');
  const thisMonth = today.getMonth();
  const thisYear = today.getFullYear();
  const thisMonthRevenue = revenue
    .filter((r) => {
      const d = new Date(r.date);
      return d.getMonth() === thisMonth && d.getFullYear() === thisYear && r.type !== 'expense';
    })
    .reduce((sum, r) => sum + r.amount, 0);

  // Last 6 months revenue chart data
  const months: { key: string; label: string; total: number }[] = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(thisYear, thisMonth - i, 1);
    months.push({ key: `${d.getFullYear()}-${d.getMonth()}`, label: monthLabel(d), total: 0 });
  }
  revenue.forEach((r) => {
    const d = new Date(r.date);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    const bucket = months.find((m) => m.key === key);
    if (bucket) bucket.total += r.type === 'expense' ? -r.amount : r.amount;
  });

  const kpis = [
    { label: 'Bất động sản', value: properties.length },
    { label: 'Đặt phòng sắp tới', value: upcomingBookings.length },
    { label: 'Doanh thu tháng này', value: thisMonthRevenue.toLocaleString('vi-VN') + ' đ' },
  ];

  return (
    <div>
      <div className="mb-4">
        <div className="eyebrow">Tổng quan</div>
        <h1 className="font-display" style={{ fontSize: '1.9rem' }}>Chào mừng trở lại</h1>
      </div>

      <div className="row g-3 mb-4">
        {kpis.map((kpi) => (
          <div className="col-md-4" key={kpi.label}>
            <div className="elevated-card h-100">
              <div className="card-body p-4">
                <div className="text-muted small mb-2">{kpi.label}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--color-primary-dark)' }}>
                  {kpi.value}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="elevated-card">
        <div className="card-body p-4">
          <h3 className="h5 mb-3" style={{ fontFamily: 'var(--font-display)' }}>Doanh thu 6 tháng gần đây</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <LineChart data={months}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(43,24,16,0.1)" />
                <XAxis dataKey="label" stroke="var(--color-ink)" />
                <YAxis stroke="var(--color-ink)" />
                <Tooltip />
                <Line type="monotone" dataKey="total" stroke="var(--color-primary)" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
