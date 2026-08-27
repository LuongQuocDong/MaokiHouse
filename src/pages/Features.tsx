import { motion } from 'framer-motion';
import {
  FaWifi,
  FaSnowflake,
  FaShower,
  FaUtensils,
  FaTshirt,
  FaShieldAlt,
  FaMapMarkerAlt,
  FaParking,
} from 'react-icons/fa';

const AMENITIES = [
  { icon: FaWifi, title: 'Wifi tốc độ cao', desc: 'Kết nối ổn định, phù hợp làm việc từ xa hoặc giải trí xuyên suốt kỳ nghỉ.' },
  { icon: FaSnowflake, title: 'Máy lạnh', desc: 'Điều hòa riêng cho từng phòng, giữ không gian mát mẻ quanh năm.' },
  { icon: FaShower, title: 'Phòng tắm riêng', desc: 'Phòng tắm nóng lạnh sạch sẽ, đầy đủ tiện nghi cơ bản.' },
  { icon: FaUtensils, title: 'Bếp đầy đủ tiện nghi', desc: 'Không gian bếp trang bị tủ lạnh, bếp từ, dụng cụ nấu ăn cơ bản.' },
  { icon: FaTshirt, title: 'Máy giặt trong tòa nhà', desc: 'Tiện lợi cho những chuyến ở dài ngày, không cần tìm tiệm giặt ủi.' },
  { icon: FaShieldAlt, title: 'An ninh 24/7', desc: 'Hệ thống bảo vệ, camera giám sát, khóa cửa an toàn cho khách lưu trú.' },
  { icon: FaMapMarkerAlt, title: 'Vị trí trung tâm', desc: 'Gần chợ Bến Thành, nhiều nhà hàng, quán cà phê và spa xung quanh.' },
  { icon: FaParking, title: 'Hỗ trợ gửi xe', desc: 'Có khu vực/gợi ý gửi xe máy, ô tô gần khu vực lưu trú.' },
];

const Features = () => {
  return (
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="text-center my-5"
      >
        <div className="eyebrow">Tiện nghi</div>
        <h1 className="font-display mb-0" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
          Mọi tiện nghi bạn cần cho một kỳ nghỉ thoải mái
        </h1>
        <div className="gold-divider"><i className="bi bi-stars gold-divider-icon"></i></div>
        <p className="mx-auto mt-3" style={{ maxWidth: 640, color: 'var(--color-ink)', opacity: 0.8 }}>
          MaokiHouse chú trọng từng chi tiết nhỏ để bạn cảm thấy như đang ở nhà, ngay giữa lòng Sài Gòn.
        </p>
      </motion.div>

      <div className="row g-4 mb-5">
        {AMENITIES.map((f, i) => (
          <motion.div
            key={f.title}
            className="col-12 col-sm-6 col-lg-3"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: (i % 4) * 0.1 }}
          >
            <div className="elevated-card h-100">
              <div className="card-body p-4 text-center">
                <f.icon size={26} style={{ color: 'var(--color-primary)' }} className="mb-3" />
                <h3 className="h6 mb-2">{f.title}</h3>
                <p className="mb-0 text-muted small">{f.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Features;
