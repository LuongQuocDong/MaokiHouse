import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const TIERS = [
  {
    name: 'Starter',
    tagline: 'Dành cho Host quản lý 1-2 bất động sản',
    features: ['Đồng bộ lịch đa kênh', 'Hộp thư hợp nhất (thủ công)', 'Báo cáo doanh thu cơ bản', 'Hỗ trợ email'],
  },
  {
    name: 'Growth',
    tagline: 'Dành cho Host/Property Manager nhiều bất động sản',
    features: ['Tất cả tính năng Starter', 'Quản lý nhân sự & phân quyền', 'Báo cáo doanh thu nâng cao', 'Hỗ trợ ưu tiên'],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    tagline: 'Dành cho đội ngũ Cohost và chuỗi vận hành lớn',
    features: ['Tất cả tính năng Growth', 'Tích hợp API riêng (theo yêu cầu)', 'Hỗ trợ triển khai & đào tạo', 'Quản lý tài khoản chuyên trách'],
  },
];

const Pricing = () => {
  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <div className="eyebrow">Bảng giá</div>
        <h1 className="font-display mb-3" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>Gói dịch vụ</h1>
        <div className="gold-divider"><i className="bi bi-tags gold-divider-icon"></i></div>
        <p className="mx-auto" style={{ maxWidth: 640, color: 'var(--color-ink)', opacity: 0.8 }}>
          Các gói dưới đây mang tính minh họa — vui lòng liên hệ để nhận báo giá phù hợp với quy mô vận hành của bạn.
        </p>
      </div>

      <div className="row g-4 justify-content-center">
        {TIERS.map((tier) => (
          <div className="col-md-4" key={tier.name}>
            <div
              className="elevated-card h-100"
              style={tier.highlighted ? { border: '2px solid var(--color-gold)', transform: 'translateY(-6px)' } : {}}
            >
              <div className="card-body p-4 d-flex flex-column h-100">
                <h3 className="h4 mb-1" style={{ fontFamily: 'var(--font-display)' }}>{tier.name}</h3>
                <p className="text-muted small mb-4">{tier.tagline}</p>
                <ul className="list-unstyled mb-4 flex-grow-1">
                  {tier.features.map((f) => (
                    <li key={f} className="d-flex align-items-start gap-2 mb-2">
                      <i className="bi bi-check-circle-fill mt-1" style={{ color: 'var(--color-gold)' }}></i>
                      <span style={{ color: 'var(--color-ink)', opacity: 0.85 }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className="pill-btn text-center">Liên hệ</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Pricing;
