import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';

const TIERS = [
  {
    name: 'Starter',
    tagline: 'Dành cho Host quản lý 1-2 bất động sản',
    who: 'Phù hợp nếu bạn mới bắt đầu cho thuê trên Airbnb/Booking.com và muốn ngừng quản lý lịch bằng tay.',
    features: [
      'Đồng bộ lịch đa kênh (Airbnb, Booking.com, Agoda)',
      'Tự động tính khả dụng, tránh trùng lịch',
      'Hộp thư khách hàng hợp nhất (thủ công)',
      'Check-in / check-out cơ bản',
      'Hồ sơ và lịch sử khách hàng',
      'Báo cáo doanh thu cơ bản theo tháng',
      'Tối đa 2 bất động sản',
      'Hỗ trợ qua email',
    ],
  },
  {
    name: 'Growth',
    tagline: 'Dành cho Host/Property Manager nhiều bất động sản',
    who: 'Phù hợp khi bạn quản lý từ 3 bất động sản trở lên và cần thêm người phụ vận hành cùng.',
    features: [
      'Tất cả tính năng của gói Starter',
      'Không giới hạn số lượng bất động sản (theo thoả thuận)',
      'Bán dịch vụ đi kèm (đưa đón, dọn phòng, ăn sáng...)',
      'Quản lý nhân sự & phân quyền theo bất động sản',
      'Báo cáo doanh thu & chi phí nâng cao, theo từng căn hộ',
      'Theo dõi thanh toán / payout theo từng kênh',
      'Nhắc việc và cảnh báo vận hành tự động',
      'Hỗ trợ ưu tiên qua email và chat',
    ],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    tagline: 'Dành cho đội ngũ Cohost và chuỗi vận hành lớn',
    who: 'Phù hợp với đội ngũ Cohost quản lý bất động sản của nhiều chủ nhà, hoặc chuỗi căn hộ dịch vụ quy mô lớn.',
    features: [
      'Tất cả tính năng của gói Growth',
      'Phân quyền nhiều cấp theo chủ sở hữu / đội ngũ',
      'Báo cáo tổng hợp đa bất động sản, đa chủ sở hữu',
      'Tích hợp API riêng theo yêu cầu',
      'Hỗ trợ triển khai, đào tạo đội ngũ tận nơi/online',
      'Hỗ trợ di chuyển dữ liệu từ hệ thống đang dùng',
      'Quản lý tài khoản chuyên trách',
      'Thoả thuận mức độ dịch vụ (SLA) riêng',
    ],
  },
];

const FAQS = [
  {
    q: 'Có dùng thử miễn phí không?',
    a: 'MaokiHouse hiện đang trong giai đoạn phát triển sớm. Chúng tôi ưu tiên trao đổi trực tiếp với từng Host để hiểu quy mô vận hành và sắp xếp một buổi demo hoặc dùng thử phù hợp — hãy liên hệ để được tư vấn cụ thể cho trường hợp của bạn.',
  },
  {
    q: 'Bảng giá ở trên là chính thức chưa?',
    a: 'Ba gói ở trên mang tính minh hoạ để bạn hình dung sự khác biệt giữa các cấp độ sử dụng. Vì mỗi Host có số lượng bất động sản và nhu cầu vận hành khác nhau, chúng tôi sẽ trao đổi để đưa ra báo giá phù hợp thay vì áp một mức giá cố định cho tất cả.',
  },
  {
    q: 'Có thể đổi gói giữa chừng không?',
    a: 'Có. Khi số lượng bất động sản hoặc nhu cầu vận hành của bạn thay đổi, bạn có thể liên hệ đội ngũ MaokiHouse để điều chỉnh gói dịch vụ cho phù hợp hơn.',
  },
  {
    q: 'Thanh toán theo tháng hay theo năm?',
    a: 'Hình thức và chu kỳ thanh toán sẽ được thống nhất trực tiếp khi ký kết, tuỳ theo gói dịch vụ và quy mô sử dụng của bạn. Hãy liên hệ để chúng tôi tư vấn phương án phù hợp nhất.',
  },
  {
    q: 'MaokiHouse có hỗ trợ chuyển dữ liệu từ công cụ đang dùng không?',
    a: 'Có. Đội ngũ MaokiHouse hỗ trợ import dữ liệu bất động sản, lịch đặt phòng và thông tin khách hàng từ bảng tính hoặc phần mềm bạn đang sử dụng, xem thêm ở trang Dịch vụ.',
  },
];

const Pricing = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <div className="eyebrow">Bảng giá</div>
        <h1 className="font-display mb-3" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>Gói dịch vụ</h1>
        <div className="gold-divider"><i className="bi bi-tags gold-divider-icon"></i></div>
        <p className="mx-auto" style={{ maxWidth: 680, color: 'var(--color-ink)', opacity: 0.8 }}>
          Các gói dưới đây mang tính minh họa để bạn hình dung sự khác biệt giữa các cấp độ sử dụng — vui lòng liên
          hệ để nhận báo giá phù hợp với quy mô vận hành thực tế của bạn.
        </p>
      </div>

      <div className="row g-4 justify-content-center">
        {TIERS.map((tier, i) => (
          <div className="col-md-4" key={tier.name}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="elevated-card h-100"
              style={tier.highlighted ? { border: '2px solid var(--color-gold)', transform: 'translateY(-6px)' } : {}}
            >
              <div className="card-body p-4 d-flex flex-column h-100">
                {tier.highlighted && (
                  <span
                    className="mb-2"
                    style={{
                      alignSelf: 'flex-start',
                      background: 'var(--color-gold)',
                      color: 'var(--color-ink)',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                      padding: '0.25rem 0.65rem',
                      borderRadius: 999,
                      textTransform: 'uppercase',
                    }}
                  >
                    Phổ biến nhất
                  </span>
                )}
                <h3 className="h4 mb-1" style={{ fontFamily: 'var(--font-display)' }}>{tier.name}</h3>
                <p className="text-muted small mb-2">{tier.tagline}</p>
                <p className="small mb-4" style={{ color: 'var(--color-ink)', opacity: 0.75, fontStyle: 'italic' }}>{tier.who}</p>
                <ul className="list-unstyled mb-4 flex-grow-1">
                  {tier.features.map((f) => (
                    <li key={f} className="d-flex align-items-start gap-2 mb-2">
                      <i className="bi bi-check-circle-fill mt-1" style={{ color: 'var(--color-gold)' }}></i>
                      <span style={{ color: 'var(--color-ink)', opacity: 0.85 }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className="pill-btn text-center">Liên hệ nhận báo giá</Link>
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <section className="mt-5 pt-5">
        <div className="text-center mb-5">
          <div className="eyebrow">Câu hỏi thường gặp</div>
          <h2 className="font-display mb-0" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}>Về bảng giá & thanh toán</h2>
          <div className="gold-divider"><i className="bi bi-question-circle gold-divider-icon"></i></div>
        </div>

        <div className="mx-auto" style={{ maxWidth: 760 }}>
          {FAQS.map((item, index) => {
            const isOpen = openFaq === index;
            return (
              <div key={item.q} className="elevated-card mb-3">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-100 d-flex justify-content-between align-items-center p-4"
                  style={{ background: 'transparent', border: 'none', textAlign: 'left', cursor: 'pointer' }}
                >
                  <span className="h6 mb-0" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}>{item.q}</span>
                  <i className={`bi ${isOpen ? 'bi-dash-circle' : 'bi-plus-circle'}`} style={{ color: 'var(--color-gold)', fontSize: '1.2rem' }}></i>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p className="px-4 pb-4 mb-0 small" style={{ color: 'var(--color-ink)', opacity: 0.8 }}>{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>
    </Container>
  );
};

export default Pricing;
