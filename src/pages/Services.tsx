import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaPlaneArrival,
  FaBroom,
  FaMapMarkedAlt,
  FaHeadset,
} from 'react-icons/fa';

const SERVICES = [
  {
    icon: FaPlaneArrival,
    title: 'Đưa đón sân bay',
    desc: 'Hỗ trợ đặt xe đưa đón từ sân bay Tân Sơn Nhất về tận nơi lưu trú, thuận tiện cho chuyến bay sớm hoặc khuya.',
  },
  {
    icon: FaBroom,
    title: 'Dọn phòng theo yêu cầu',
    desc: 'Dịch vụ dọn phòng, thay ga giường, khăn tắm định kỳ hoặc theo yêu cầu trong suốt thời gian lưu trú dài ngày.',
  },
  {
    icon: FaMapMarkedAlt,
    title: 'Tư vấn lịch trình & tour',
    desc: 'Gợi ý địa điểm ăn uống, tham quan quanh khu vực trung tâm, hỗ trợ đặt tour trải nghiệm địa phương.',
  },
  {
    icon: FaHeadset,
    title: 'Hỗ trợ 24/7',
    desc: 'Đội ngũ hỗ trợ luôn sẵn sàng qua điện thoại/Zalo/WhatsApp trong suốt thời gian bạn lưu trú tại MaokiHouse.',
  },
];

const Services = () => {
  return (
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="text-center my-5"
      >
        <div className="eyebrow">Dịch vụ</div>
        <h1 className="font-display mb-0" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
          Dịch vụ đi kèm cho kỳ nghỉ trọn vẹn
        </h1>
        <div className="gold-divider"><i className="bi bi-heart gold-divider-icon"></i></div>
        <p className="mx-auto mt-3" style={{ maxWidth: 640, color: 'var(--color-ink)', opacity: 0.8 }}>
          Ngoài phòng ở thoải mái, MaokiHouse còn hỗ trợ thêm những dịch vụ nhỏ để chuyến đi của bạn dễ dàng hơn.
        </p>
      </motion.div>

      <div className="row g-4 mb-5">
        {SERVICES.map((s, i) => (
          <motion.div
            key={s.title}
            className="col-12 col-sm-6"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: (i % 2) * 0.15 }}
          >
            <div className="elevated-card h-100">
              <div className="card-body p-4">
                <s.icon size={28} style={{ color: 'var(--color-gold)' }} className="mb-3" />
                <h3 className="h5 mb-2">{s.title}</h3>
                <p className="mb-0 text-muted small">{s.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center my-5 py-4">
        <h3 className="font-display mb-3" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}>
          Cần hỗ trợ thêm cho chuyến đi của bạn?
        </h3>
        <Link to="/contact" className="pill-btn">
          Liên hệ với chúng tôi <i className="bi bi-arrow-right"></i>
        </Link>
      </div>
    </div>
  );
};

export default Services;
