import { Container } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaCalendarCheck,
  FaInbox,
  FaBuilding,
  FaChartLine,
  FaUserCog,
  FaMoneyBillWave,
  FaRobot,
  FaPlug,
  FaClipboardCheck,
  FaConciergeBell,
  FaUsers,
  FaFileInvoiceDollar,
  FaBell,
  FaUserShield,
} from 'react-icons/fa';

interface FeatureItem {
  icon: typeof FaCalendarCheck;
  title: string;
  desc: string;
}

interface FeatureGroup {
  eyebrow: string;
  title: string;
  intro: string;
  icon: string;
  items: FeatureItem[];
}

const GROUPS: FeatureGroup[] = [
  {
    eyebrow: 'Nhóm 1',
    title: 'Quản lý đa kênh',
    icon: 'bi-diagram-3',
    intro:
      'Nếu bạn đang niêm yết cùng một bất động sản trên nhiều nền tảng, việc giữ cho lịch, giá và tình trạng phòng luôn khớp nhau là rủi ro lớn nhất. Nhóm tính năng này giúp mọi kênh nói cùng một "ngôn ngữ" — chỉ cập nhật một lần, áp dụng ở mọi nơi.',
    items: [
      {
        icon: FaPlug,
        title: 'Kết nối Airbnb, Booking.com, Agoda',
        desc: 'Liên kết trực tiếp các kênh OTA phổ biến vào MaokiHouse, đưa toàn bộ booking, lịch và tin nhắn về một hệ thống quản lý duy nhất.',
      },
      {
        icon: FaCalendarCheck,
        title: 'Đồng bộ lịch hai chiều',
        desc: 'Khi một phòng được đặt trên bất kỳ kênh nào, lịch trên tất cả các kênh còn lại đều tự động cập nhật để tránh bị đặt trùng.',
      },
      {
        icon: FaInbox,
        title: 'Hộp thư khách hàng hợp nhất',
        desc: 'Đọc và trả lời tin nhắn từ mọi nền tảng OTA ngay trong MaokiHouse, gắn liền với đúng booking và đúng khách để không bị mất ngữ cảnh.',
      },
      {
        icon: FaMoneyBillWave,
        title: 'Tự động tính khả dụng',
        desc: 'Hệ thống tự tính tình trạng phòng trống theo thời gian thực dựa trên dữ liệu từ tất cả các kênh đang kết nối, giảm thiểu rủi ro trùng lịch do cập nhật thủ công chậm trễ.',
      },
    ],
  },
  {
    eyebrow: 'Nhóm 2',
    title: 'Vận hành',
    icon: 'bi-house-gear',
    intro:
      'Ngoài việc nhận booking, vận hành hằng ngày mới là phần chiếm nhiều thời gian nhất của một Host: đón khách, xử lý yêu cầu, bán thêm dịch vụ. MaokiHouse gói toàn bộ quy trình đó vào một bảng điều khiển duy nhất.',
    items: [
      {
        icon: FaClipboardCheck,
        title: 'Check-in / Check-out',
        desc: 'Theo dõi trạng thái nhận và trả phòng của từng booking, ghi chú thời gian đến/đi thực tế, giảm sai sót khi có nhiều khách ra vào trong cùng một ngày.',
      },
      {
        icon: FaBuilding,
        title: 'Hồ sơ & lịch sử khách hàng',
        desc: 'Lưu lại thông tin liên hệ, yêu cầu đặc biệt và lịch sử lưu trú của từng khách, giúp cá nhân hoá trải nghiệm cho khách quay lại.',
      },
      {
        icon: FaConciergeBell,
        title: 'Bán dịch vụ đi kèm',
        desc: 'Thêm và quản lý các dịch vụ như đưa đón sân bay, dọn phòng thêm, ăn sáng — tính vào hoá đơn của khách ngay trong hệ thống.',
      },
      {
        icon: FaBell,
        title: 'Nhắc việc & cảnh báo vận hành',
        desc: 'Nhận thông báo khi có booking mới, khi sắp đến giờ check-in/out, hoặc khi lịch giữa các kênh có dấu hiệu xung đột.',
      },
    ],
  },
  {
    eyebrow: 'Nhóm 3',
    title: 'Tài chính & báo cáo',
    icon: 'bi-graph-up-arrow',
    intro:
      'Biết chính xác mình đang lãi hay lỗ ở từng bất động sản là điều nhiều Host chỉ làm được vào cuối tháng, bằng cách cộng tay từng bảng sao kê. MaokiHouse tổng hợp số liệu đó theo thời gian thực.',
    items: [
      {
        icon: FaChartLine,
        title: 'Báo cáo doanh thu theo bất động sản',
        desc: 'Xem doanh thu, chi phí và lợi nhuận của từng căn hộ hoặc từng phòng, theo ngày, tuần hoặc tháng, không cần chờ đến kỳ đối soát.',
      },
      {
        icon: FaFileInvoiceDollar,
        title: 'Theo dõi thanh toán & payout',
        desc: 'Ghi nhận khoản thanh toán từ từng kênh OTA, đối chiếu với booking tương ứng để phát hiện sai lệch sớm.',
      },
      {
        icon: FaMoneyBillWave,
        title: 'Quản lý chi phí vận hành',
        desc: 'Ghi lại các khoản chi cho dọn phòng, bảo trì, tiện ích để có bức tranh lợi nhuận thực tế, không chỉ doanh thu gộp.',
      },
    ],
  },
  {
    eyebrow: 'Nhóm 4',
    title: 'Đội ngũ',
    icon: 'bi-people',
    intro:
      'Khi số lượng bất động sản tăng lên, một mình Host không thể xử lý hết mọi việc. MaokiHouse hỗ trợ mở rộng đội ngũ mà vẫn giữ được kiểm soát và minh bạch.',
    items: [
      {
        icon: FaUsers,
        title: 'Quản lý nhân sự',
        desc: 'Thêm nhân viên lễ tân, dọn phòng, hoặc đối tác Cohost vào hệ thống với vai trò và quyền hạn rõ ràng.',
      },
      {
        icon: FaUserShield,
        title: 'Phân quyền theo bất động sản',
        desc: 'Chỉ định ai được xem hoặc thao tác trên bất động sản nào — phù hợp với đội ngũ Cohost quản lý tài sản của nhiều chủ nhà khác nhau.',
      },
      {
        icon: FaUserCog,
        title: 'Theo dõi hiệu suất theo nhóm',
        desc: 'Nắm được khối lượng công việc và tình trạng xử lý booking của từng thành viên trong đội ngũ vận hành.',
      },
      {
        icon: FaRobot,
        title: 'Lộ trình hỗ trợ AI',
        desc: 'Chúng tôi đang phát triển trợ lý AI giúp trả lời tin nhắn khách tự động và gợi ý điều chỉnh giá theo mùa vụ, dự kiến ra mắt trong các bản cập nhật tiếp theo.',
      },
    ],
  },
];

const Features = () => {
  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <div className="eyebrow">Sản phẩm</div>
        <h1 className="font-display mb-3" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>Tính năng</h1>
        <div className="gold-divider"><i className="bi bi-stars gold-divider-icon"></i></div>
        <p className="mx-auto" style={{ maxWidth: 680, color: 'var(--color-ink)', opacity: 0.8 }}>
          Mọi công cụ một Host, Property Manager hoặc đội ngũ Cohost cần để vận hành nhiều bất động sản trên nhiều
          kênh OTA — từ đồng bộ lịch, vận hành hằng ngày, tài chính minh bạch, đến quản lý đội ngũ.
        </p>
      </div>

      {GROUPS.map((group, gi) => (
        <motion.section
          key={group.title}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          className="mb-5 pb-2"
        >
          <div className="mb-4" style={{ maxWidth: 780 }}>
            <div className="d-flex align-items-center gap-2 mb-2">
              <i className={`bi ${group.icon}`} style={{ fontSize: '1.4rem', color: 'var(--color-gold)' }}></i>
              <span className="eyebrow mb-0">{group.eyebrow}</span>
            </div>
            <h2 className="h3 mb-2" style={{ fontFamily: 'var(--font-display)' }}>{group.title}</h2>
            <p className="mb-0" style={{ color: 'var(--color-ink)', opacity: 0.8 }}>{group.intro}</p>
          </div>

          <div className="row g-4">
            {group.items.map((f, index) => (
              <div className="col-md-6" key={f.title}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="elevated-card h-100"
                >
                  <div className="card-body p-4">
                    <f.icon size={26} style={{ color: 'var(--color-primary)' }} className="mb-3" />
                    <h3 className="h5 mb-2" style={{ fontFamily: 'var(--font-display)' }}>{f.title}</h3>
                    <p className="mb-0 small" style={{ color: 'var(--color-ink)', opacity: 0.8 }}>{f.desc}</p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
          {gi < GROUPS.length - 1 && <div className="gold-divider mt-5"><i className="bi bi-dot gold-divider-icon"></i></div>}
        </motion.section>
      ))}

      <div className="text-center py-4">
        <h3 className="font-display mb-3" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}>
          Muốn xem tất cả tính năng này hoạt động cùng nhau?
        </h3>
        <Link to="/contact" className="pill-btn">
          Đặt lịch demo <i className="bi bi-arrow-right"></i>
        </Link>
      </div>
    </Container>
  );
};

export default Features;
