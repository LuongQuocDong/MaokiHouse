import { Container } from 'react-bootstrap';
import { FaCalendarCheck, FaInbox, FaBuilding, FaChartLine } from 'react-icons/fa';

const FEATURES = [
  {
    icon: FaCalendarCheck,
    title: 'Đồng bộ lịch đa kênh',
    desc: 'Lịch đặt phòng từ Airbnb, Booking.com, Agoda và đặt trực tiếp được hợp nhất trong một giao diện duy nhất, tự động tính toán khả dụng để tránh trùng lịch giữa các kênh.',
  },
  {
    icon: FaInbox,
    title: 'Hộp thư khách hàng hợp nhất',
    desc: 'Nhận và trả lời tin nhắn khách từ nhiều nền tảng OTA và mạng xã hội ở cùng một nơi, không bỏ lỡ tin nhắn nào.',
  },
  {
    icon: FaBuilding,
    title: 'Vận hành PMS đầy đủ',
    desc: 'Check-in / check-out, quản lý thông tin khách, bán dịch vụ đi kèm, xử lý thanh toán — toàn bộ quy trình vận hành trong một hệ thống.',
  },
  {
    icon: FaChartLine,
    title: 'Báo cáo doanh thu & chi phí',
    desc: 'Theo dõi doanh thu, chi phí và lợi nhuận theo từng bất động sản, từng tháng, với biểu đồ trực quan.',
  },
];

const Features = () => {
  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <div className="eyebrow">Sản phẩm</div>
        <h1 className="font-display mb-3" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>Tính năng</h1>
        <div className="gold-divider"><i className="bi bi-stars gold-divider-icon"></i></div>
        <p className="mx-auto" style={{ maxWidth: 640, color: 'var(--color-ink)', opacity: 0.8 }}>
          Mọi công cụ một Host hoặc Property Manager cần để vận hành nhiều bất động sản trên nhiều kênh OTA.
        </p>
      </div>

      <div className="row g-4">
        {FEATURES.map((f) => (
          <div className="col-md-6" key={f.title}>
            <div className="elevated-card h-100">
              <div className="card-body p-4">
                <f.icon size={30} style={{ color: 'var(--color-primary)' }} className="mb-3" />
                <h3 className="h4 mb-2" style={{ fontFamily: 'var(--font-display)' }}>{f.title}</h3>
                <p className="mb-0" style={{ color: 'var(--color-ink)', opacity: 0.8 }}>{f.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Features;
