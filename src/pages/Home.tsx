import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import HomeCarousel from '../components/Carousel';
import {
  FaHome,
  FaHotel,
  FaGlobeAmericas,
  FaBuilding,
  FaUsers,
  FaCalendarCheck,
  FaInbox,
  FaChartLine,
} from 'react-icons/fa';

const AUDIENCES = [
  { icon: FaHome, title: 'Airbnb Host', desc: 'Quản lý lịch, khách và doanh thu Airbnb của bạn dễ dàng hơn.' },
  { icon: FaHotel, title: 'Booking.com Host', desc: 'Đồng bộ đặt phòng từ Booking.com với các kênh khác.' },
  { icon: FaGlobeAmericas, title: 'Agoda Host', desc: 'Theo dõi và vận hành các đặt phòng từ Agoda tập trung.' },
  { icon: FaBuilding, title: 'Property Manager', desc: 'Quản lý nhiều bất động sản trên một bảng điều khiển.' },
  { icon: FaUsers, title: 'Cohost Team', desc: 'Phối hợp đội ngũ vận hành, phân quyền công việc rõ ràng.' },
];

const FEATURES = [
  { icon: FaCalendarCheck, title: 'Đồng bộ lịch đa kênh', desc: 'Lịch đặt phòng từ Airbnb, Booking.com, Agoda hợp nhất trong một giao diện, tránh trùng lịch.' },
  { icon: FaInbox, title: 'Hộp thư hợp nhất', desc: 'Nhận và trả lời tin nhắn khách từ nhiều nền tảng ở cùng một nơi.' },
  { icon: FaBuilding, title: 'Vận hành PMS đầy đủ', desc: 'Check-in/out, quản lý khách, bán dịch vụ, thanh toán — tất cả trong một hệ thống.' },
  { icon: FaChartLine, title: 'Báo cáo doanh thu', desc: 'Theo dõi doanh thu, chi phí và hiệu suất từng bất động sản theo thời gian thực.' },
];

const Home = () => {
  return (
    <div>
      <HomeCarousel />

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center my-5"
        >
          <div className="eyebrow">Dành cho ai</div>
          <h2 className="font-display mb-0" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}>
            MaokiHouse phù hợp với bạn nếu bạn là
          </h2>
          <div className="gold-divider"><i className="bi bi-people gold-divider-icon"></i></div>
        </motion.div>

        <div className="row g-4 mb-5">
          {AUDIENCES.map((a, i) => (
            <motion.div
              key={a.title}
              className="col-12 col-sm-6 col-lg-4"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
            >
              <div className="elevated-card h-100">
                <div className="card-body p-4 text-center">
                  <a.icon size={28} style={{ color: 'var(--color-primary)' }} className="mb-3" />
                  <h3 className="h5 mb-2">{a.title}</h3>
                  <p className="mb-0 text-muted small">{a.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <section className="py-5 full-bleed" style={{ backgroundColor: 'var(--color-blush)' }}>
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
              className="text-center mb-5"
            >
              <div className="eyebrow">Tính năng nổi bật</div>
              <h2 className="font-display mb-0" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}>Mọi thứ Host cần, một nơi duy nhất</h2>
              <div className="gold-divider"><i className="bi bi-gem gold-divider-icon"></i></div>
            </motion.div>
            <div className="row g-4">
              {FEATURES.map((f, index) => (
                <div key={f.title} className="col-md-6 col-lg-3">
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="elevated-card h-100"
                    style={{ backgroundColor: 'var(--color-white)' }}
                  >
                    <div className="card-body p-4">
                      <f.icon size={26} style={{ color: 'var(--color-gold)' }} className="mb-3" />
                      <h5 className="mb-2">{f.title}</h5>
                      <p className="card-text small mb-0" style={{ color: 'var(--color-ink)', opacity: 0.85 }}>{f.desc}</p>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="text-center my-5 py-4">
          <h3 className="font-display mb-3" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}>
            Sẵn sàng quản lý homestay của bạn hiệu quả hơn?
          </h3>
          <Link to="/admin" className="pill-btn">
            Đăng nhập vào Dashboard <i className="bi bi-arrow-right"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
