import { Container } from 'react-bootstrap';
import { FaRocket, FaUserFriends, FaExchangeAlt } from 'react-icons/fa';

const SERVICES = [
  {
    icon: FaRocket,
    title: 'Hỗ trợ onboarding & thiết lập',
    desc: 'Đội ngũ MaokiHouse hỗ trợ bạn thiết lập bất động sản, kết nối kênh OTA và cấu hình vận hành ban đầu.',
  },
  {
    icon: FaUserFriends,
    title: 'Hỗ trợ Cohost chuyên biệt',
    desc: 'Dành cho đội ngũ Cohost quản lý nhiều bất động sản của nhiều chủ nhà — phân quyền, báo cáo theo từng chủ sở hữu.',
  },
  {
    icon: FaExchangeAlt,
    title: 'Di chuyển dữ liệu từ công cụ khác',
    desc: 'Hỗ trợ import dữ liệu bất động sản, lịch đặt phòng và thông tin khách từ bảng tính hoặc phần mềm bạn đang dùng.',
  },
];

const Services = () => {
  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <div className="eyebrow">Dịch vụ</div>
        <h1 className="font-display mb-3" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>Đồng hành cùng Host</h1>
        <div className="gold-divider"><i className="bi bi-heart-fill gold-divider-icon"></i></div>
      </div>

      <div className="row g-4">
        {SERVICES.map((s) => (
          <div className="col-md-4" key={s.title}>
            <div className="elevated-card h-100">
              <div className="card-body p-4 text-center">
                <s.icon size={30} style={{ color: 'var(--color-primary)' }} className="mb-3" />
                <h3 className="h5 mb-2">{s.title}</h3>
                <p className="mb-0 small" style={{ color: 'var(--color-ink)', opacity: 0.8 }}>{s.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Services;
