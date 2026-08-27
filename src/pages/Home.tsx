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
  FaMoneyBillWave,
  FaUserCog,
  FaRobot,
  FaPlug,
  FaCommentDots,
  FaShieldAlt,
} from 'react-icons/fa';

const AUDIENCES = [
  { icon: FaHome, title: 'Airbnb Host', desc: 'Quản lý lịch, khách và doanh thu Airbnb của bạn dễ dàng hơn.' },
  { icon: FaHotel, title: 'Booking.com Host', desc: 'Đồng bộ đặt phòng từ Booking.com với các kênh khác.' },
  { icon: FaGlobeAmericas, title: 'Agoda Host', desc: 'Theo dõi và vận hành các đặt phòng từ Agoda tập trung.' },
  { icon: FaBuilding, title: 'Property Manager', desc: 'Quản lý nhiều bất động sản trên một bảng điều khiển.' },
  { icon: FaUsers, title: 'Cohost Team', desc: 'Phối hợp đội ngũ vận hành, phân quyền công việc rõ ràng.' },
];

const STEPS = [
  {
    number: '01',
    icon: FaPlug,
    title: 'Kết nối các kênh OTA của bạn',
    desc: 'Liên kết tài khoản Airbnb, Booking.com, Agoda và kênh đặt trực tiếp vào MaokiHouse. Toàn bộ lịch đặt phòng, giá phòng và tình trạng khả dụng được đồng bộ tự động, không cần cập nhật tay từng nền tảng.',
  },
  {
    number: '02',
    icon: FaCommentDots,
    title: 'Quản lý booking, lịch, tin nhắn trên một dashboard',
    desc: 'Mọi đặt phòng mới, tin nhắn khách, yêu cầu check-in/out đều đổ về một bảng điều khiển duy nhất — bạn không còn phải mở nhiều app cùng lúc hay lo bỏ sót tin nhắn từ kênh nào đó.',
  },
  {
    number: '03',
    icon: FaChartLine,
    title: 'Theo dõi doanh thu & vận hành tự động',
    desc: 'Hệ thống tự tính khả dụng để tránh trùng lịch, ghi nhận doanh thu và chi phí theo từng bất động sản, và cho bạn báo cáo rõ ràng thay vì phải tự tổng hợp bằng file Excel mỗi cuối tháng.',
  },
  {
    number: '04',
    icon: FaUserCog,
    title: 'Tập trung phát triển kinh doanh',
    desc: 'Khi vận hành hằng ngày đã được tự động hoá, bạn và đội ngũ có thời gian để mở rộng số lượng bất động sản, nâng cao trải nghiệm khách và phát triển thương hiệu cho thuê của mình.',
  },
];

const FEATURES = [
  {
    icon: FaCalendarCheck,
    title: 'Đồng bộ lịch đa kênh',
    desc: 'Lịch đặt phòng từ Airbnb, Booking.com, Agoda và kênh đặt trực tiếp được hợp nhất trong một giao diện duy nhất. Mọi thay đổi trên một kênh sẽ tự động cập nhật sang các kênh còn lại, giúp bạn tránh tình trạng trùng lịch gây mất uy tín.',
  },
  {
    icon: FaInbox,
    title: 'Hộp thư hợp nhất',
    desc: 'Nhận và trả lời tin nhắn khách từ nhiều nền tảng OTA ở cùng một nơi, theo đúng ngữ cảnh từng đặt phòng. Không còn tình trạng bỏ lỡ tin nhắn khách vì phải kiểm tra nhiều ứng dụng khác nhau mỗi ngày.',
  },
  {
    icon: FaBuilding,
    title: 'Vận hành PMS đầy đủ',
    desc: 'Check-in / check-out, quản lý thông tin và lịch sử khách, bán thêm dịch vụ đi kèm (đưa đón, dọn phòng, ăn sáng...), xử lý thanh toán — toàn bộ quy trình vận hành gói gọn trong một hệ thống duy nhất.',
  },
  {
    icon: FaMoneyBillWave,
    title: 'Tự động tính khả dụng',
    desc: 'MaokiHouse tự động tính toán tình trạng phòng trống dựa trên tất cả các kênh đang kết nối, giảm thiểu rủi ro nhận hai đặt phòng cho cùng một ngày trên hai nền tảng khác nhau.',
  },
  {
    icon: FaChartLine,
    title: 'Báo cáo doanh thu & chi phí',
    desc: 'Theo dõi doanh thu, chi phí vận hành và lợi nhuận theo từng bất động sản, từng tháng, với số liệu trực quan — thay vì phải tự cộng trừ thủ công từ nhiều bảng sao kê OTA khác nhau.',
  },
  {
    icon: FaUserCog,
    title: 'Quản lý nhân sự & phân quyền',
    desc: 'Thêm nhân viên, cộng tác viên hoặc đối tác cohost vào hệ thống, phân quyền truy cập theo từng bất động sản hoặc từng vai trò, giúp việc vận hành theo nhóm trở nên rõ ràng và minh bạch.',
  },
  {
    icon: FaShieldAlt,
    title: 'Bảo mật & kiểm soát dữ liệu',
    desc: 'Dữ liệu khách hàng, booking và doanh thu của bạn được lưu trữ tập trung, có kiểm soát truy cập theo tài khoản, giúp bạn yên tâm khi mở rộng đội ngũ vận hành.',
  },
  {
    icon: FaRobot,
    title: 'Hỗ trợ AI (đang phát triển)',
    desc: 'Chúng tôi đang xây dựng trợ lý AI hỗ trợ trả lời tin nhắn khách tự động, gợi ý điều chỉnh giá theo mùa vụ và cảnh báo bất thường trong vận hành — sẽ sớm ra mắt trong lộ trình sản phẩm.',
  },
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

        {/* How it works / product story */}
        <section className="py-5">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-5"
          >
            <div className="eyebrow">Cách MaokiHouse hoạt động</div>
            <h2 className="font-display mb-3" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}>
              Từ nhiều nền tảng rời rạc, đến một quy trình vận hành duy nhất
            </h2>
            <div className="gold-divider"><i className="bi bi-signpost-split gold-divider-icon"></i></div>
            <p className="mx-auto" style={{ maxWidth: 700, color: 'var(--color-ink)', opacity: 0.8 }}>
              Nếu bạn đang phải mở lần lượt app Airbnb, Booking.com, Agoda mỗi sáng chỉ để kiểm tra xem đêm qua có
              khách đặt phòng mới hay không, MaokiHouse được sinh ra để giải quyết đúng vấn đề đó — theo bốn bước.
            </p>
          </motion.div>

          <div className="row g-4">
            {STEPS.map((s, index) => (
              <div key={s.number} className="col-md-6 col-lg-3">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.12 }}
                  className="elevated-card h-100"
                >
                  <div className="card-body p-4">
                    <div className="d-flex align-items-center gap-2 mb-3">
                      <span
                        className="font-display"
                        style={{ fontSize: '1.6rem', color: 'var(--color-gold)', fontWeight: 700 }}
                      >
                        {s.number}
                      </span>
                      <s.icon size={22} style={{ color: 'var(--color-primary)' }} />
                    </div>
                    <h5 className="mb-2">{s.title}</h5>
                    <p className="small mb-0" style={{ color: 'var(--color-ink)', opacity: 0.8 }}>{s.desc}</p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </section>

        {/* Trust / credibility section */}
        <section className="py-5 full-bleed" style={{ backgroundColor: 'var(--color-charcoal)' }}>
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
              className="text-center mb-5"
            >
              <div className="eyebrow" style={{ color: 'var(--color-gold-light)' }}>Vì sao chọn MaokiHouse</div>
              <h2 className="font-display mb-0" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', color: 'var(--color-cream)' }}>
                Được xây dựng từ kinh nghiệm vận hành thực tế
              </h2>
              <div className="gold-divider"><i className="bi bi-gem gold-divider-icon"></i></div>
            </motion.div>
            <div className="row g-4">
              {[
                {
                  title: 'Sinh ra từ chính nỗi đau của Host',
                  desc: 'Đội ngũ MaokiHouse từng trực tiếp vận hành homestay và căn hộ cho thuê, hiểu rõ cảm giác trùng lịch, bỏ lỡ tin nhắn khách và phải tự tổng hợp doanh thu bằng tay mỗi tháng.',
                },
                {
                  title: 'Thiết kế cho quy mô thật',
                  desc: 'Từ Host quản lý một căn hộ cho đến đội ngũ Cohost vận hành hàng chục bất động sản — hệ thống được thiết kế để mở rộng theo đúng tốc độ phát triển của bạn.',
                },
                {
                  title: 'Đồng hành, không chỉ là phần mềm',
                  desc: 'Chúng tôi hỗ trợ trực tiếp trong quá trình thiết lập ban đầu, kết nối kênh OTA và di chuyển dữ liệu — để bạn bắt đầu sử dụng nhanh và đúng cách nhất.',
                },
              ].map((item, i) => (
                <div key={item.title} className="col-md-4">
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: i * 0.12 }}
                    className="h-100"
                  >
                    <h5 className="mb-2" style={{ color: 'var(--color-gold-light)' }}>{item.title}</h5>
                    <p className="small mb-0" style={{ color: 'var(--color-cream)', opacity: 0.85 }}>{item.desc}</p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
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
                    transition={{ duration: 0.5, delay: index * 0.08 }}
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

        {/* Final CTA */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center my-5 py-5"
        >
          <div className="eyebrow mb-3">Bắt đầu ngay hôm nay</div>
          <h3 className="font-display mb-3" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}>
            Sẵn sàng quản lý hoạt động cho thuê của bạn hiệu quả hơn?
          </h3>
          <p className="mx-auto mb-4" style={{ maxWidth: 620, color: 'var(--color-ink)', opacity: 0.8 }}>
            Ngừng gõ tay từng lịch trên từng nền tảng và tự tổng hợp doanh thu cuối tháng. Để MaokiHouse xử lý
            phần vận hành lặp lại, còn bạn tập trung vào việc phát triển bất động sản của mình.
          </p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <Link to="/admin" className="pill-btn">
              Đăng nhập vào Dashboard <i className="bi bi-arrow-right"></i>
            </Link>
            <Link
              to="/features"
              className="pill-btn"
              style={{ background: 'transparent', border: '2px solid var(--color-primary)', color: 'var(--color-primary)', boxShadow: 'none' }}
            >
              Xem tính năng
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Home;
