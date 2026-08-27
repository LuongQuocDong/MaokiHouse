import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaRocket, FaUserFriends, FaExchangeAlt, FaHeadset } from 'react-icons/fa';

const SERVICES = [
  {
    icon: FaRocket,
    title: 'Hỗ trợ onboarding & thiết lập',
    desc: 'Đội ngũ MaokiHouse đồng hành cùng bạn từ ngày đầu tiên, đảm bảo hệ thống được thiết lập đúng ngay từ đầu thay vì để bạn tự mò mẫm.',
    includes: [
      'Khảo sát nhu cầu vận hành và số lượng bất động sản hiện có',
      'Hỗ trợ thiết lập từng bất động sản trên hệ thống',
      'Kết nối và kiểm tra đồng bộ với Airbnb, Booking.com, Agoda',
      'Cấu hình quy trình check-in/check-out và dịch vụ đi kèm',
      'Hướng dẫn sử dụng dashboard cho bạn và đội ngũ',
    ],
  },
  {
    icon: FaUserFriends,
    title: 'Hỗ trợ Cohost chuyên biệt',
    desc: 'Dành riêng cho đội ngũ Cohost quản lý nhiều bất động sản của nhiều chủ nhà khác nhau — nơi việc phân quyền và báo cáo minh bạch là yếu tố sống còn.',
    includes: [
      'Thiết lập phân quyền theo từng chủ sở hữu bất động sản',
      'Cấu hình báo cáo doanh thu riêng cho từng chủ nhà',
      'Hỗ trợ quy trình bàn giao và onboarding chủ nhà mới',
      'Tư vấn cách tổ chức đội ngũ vận hành trên hệ thống',
    ],
  },
  {
    icon: FaExchangeAlt,
    title: 'Di chuyển dữ liệu từ công cụ khác',
    desc: 'Nếu bạn đang quản lý bằng Excel, Google Sheets hoặc một phần mềm khác, chúng tôi hỗ trợ chuyển dữ liệu sang MaokiHouse mà không làm gián đoạn vận hành hiện tại.',
    includes: [
      'Đánh giá định dạng dữ liệu hiện có (bảng tính, phần mềm cũ)',
      'Import danh sách bất động sản, lịch đặt phòng đang có',
      'Import thông tin và lịch sử khách hàng',
      'Kiểm tra và đối soát dữ liệu sau khi chuyển',
    ],
  },
  {
    icon: FaHeadset,
    title: 'Hỗ trợ vận hành liên tục',
    desc: 'Sau khi đi vào sử dụng, đội ngũ MaokiHouse tiếp tục hỗ trợ để đảm bảo hệ thống vận hành trơn tru khi bạn mở rộng quy mô.',
    includes: [
      'Hỗ trợ xử lý sự cố đồng bộ kênh OTA',
      'Tư vấn khi thêm bất động sản hoặc thành viên mới vào hệ thống',
      'Cập nhật thông tin khi có tính năng mới ra mắt',
      'Kênh liên hệ trực tiếp qua email/chat khi cần hỗ trợ',
    ],
  },
];

const Services = () => {
  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <div className="eyebrow">Dịch vụ</div>
        <h1 className="font-display mb-3" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>Đồng hành cùng Host</h1>
        <div className="gold-divider"><i className="bi bi-heart-fill gold-divider-icon"></i></div>
        <p className="mx-auto" style={{ maxWidth: 680, color: 'var(--color-ink)', opacity: 0.8 }}>
          MaokiHouse không chỉ là một phần mềm — chúng tôi đồng hành cùng bạn trong suốt quá trình triển khai và
          vận hành, để bạn bắt đầu sử dụng nhanh và đúng cách nhất.
        </p>
      </div>

      <div className="row g-4">
        {SERVICES.map((s, index) => (
          <div className="col-md-6" key={s.title}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="elevated-card h-100"
            >
              <div className="card-body p-4">
                <s.icon size={30} style={{ color: 'var(--color-primary)' }} className="mb-3" />
                <h3 className="h5 mb-2">{s.title}</h3>
                <p className="mb-3 small" style={{ color: 'var(--color-ink)', opacity: 0.8 }}>{s.desc}</p>
                <div className="eyebrow mb-2" style={{ fontSize: '0.7rem' }}>Bao gồm</div>
                <ul className="list-unstyled mb-0">
                  {s.includes.map((item) => (
                    <li key={item} className="d-flex align-items-start gap-2 mb-2">
                      <i className="bi bi-check-circle-fill mt-1" style={{ color: 'var(--color-gold)' }}></i>
                      <span className="small" style={{ color: 'var(--color-ink)', opacity: 0.85 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      <div className="text-center py-5 mt-3">
        <h3 className="font-display mb-3" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}>
          Cần hỗ trợ triển khai cho trường hợp cụ thể của bạn?
        </h3>
        <p className="mx-auto mb-4" style={{ maxWidth: 560, color: 'var(--color-ink)', opacity: 0.8 }}>
          Hãy cho chúng tôi biết bạn đang quản lý bao nhiêu bất động sản và đang gặp khó khăn gì — đội ngũ MaokiHouse
          sẽ tư vấn phương án phù hợp nhất.
        </p>
        <Link to="/contact" className="pill-btn">
          Liên hệ tư vấn <i className="bi bi-arrow-right"></i>
        </Link>
      </div>
    </Container>
  );
};

export default Services;
