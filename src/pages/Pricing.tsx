import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { homestayService } from '../services/homestayService';
import type { Homestay } from '../types';

const Pricing = () => {
  const [homestays, setHomestays] = useState<Homestay[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    homestayService
      .list()
      .then((data) => setHomestays(data.sort((a, b) => a.price - b.price)))
      .catch((err) => console.error('Error fetching homestays for pricing:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="text-center my-5"
      >
        <div className="eyebrow">Bảng giá</div>
        <h1 className="font-display mb-0" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
          Giá phòng minh bạch, không phụ phí ẩn
        </h1>
        <div className="gold-divider"><i className="bi bi-tag gold-divider-icon"></i></div>
        <p className="mx-auto mt-3" style={{ maxWidth: 640, color: 'var(--color-ink)', opacity: 0.8 }}>
          Giá có thể thay đổi theo mùa và số đêm lưu trú. Liên hệ trực tiếp để nhận báo giá tốt nhất cho chuyến đi của bạn.
        </p>
      </motion.div>

      {loading ? (
        <div className="d-flex justify-content-center py-5">
          <div className="spinner-border" style={{ color: 'var(--color-primary)' }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : homestays.length === 0 ? (
        <p className="text-center text-muted py-5">Hiện chưa có căn hộ nào được cập nhật giá.</p>
      ) : (
        <div className="row g-4 mb-5">
          {homestays.map((h, i) => (
            <motion.div
              key={h.id}
              className="col-12 col-md-6 col-lg-4"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.12 }}
            >
              <div className="elevated-card h-100 d-flex flex-column">
                <img
                  src={h.mainImageURL || h.imageURL}
                  alt={h.title}
                  style={{ width: '100%', height: 190, objectFit: 'cover', borderRadius: '12px 12px 0 0' }}
                />
                <div className="card-body p-4 d-flex flex-column flex-grow-1">
                  <h3 className="h5 mb-2">{h.title}</h3>
                  <div className="mb-3" style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--color-primary-dark)' }}>
                    {h.price.toLocaleString('vi-VN')}đ <span className="fs-6 text-muted fw-normal">/ đêm</span>
                  </div>
                  <p className="text-muted small flex-grow-1">{h.description}</p>
                  <Link to={`/detail/${h.id}`} className="pill-btn mt-2 align-self-start">
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <div className="text-center my-5 py-4">
        <h3 className="font-display mb-3" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}>
          Cần tư vấn thêm về giá và lịch trống?
        </h3>
        <Link to="/contact" className="pill-btn">
          Liên hệ với chúng tôi <i className="bi bi-arrow-right"></i>
        </Link>
      </div>
    </div>
  );
};

export default Pricing;
