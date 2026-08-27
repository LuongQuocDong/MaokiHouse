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
        <div className="eyebrow">Pricing</div>
        <h1 className="font-display mb-0" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
          Transparent room rates, no hidden fees
        </h1>
        <div className="gold-divider"><i className="bi bi-tag gold-divider-icon"></i></div>
        <p className="mx-auto mt-3" style={{ maxWidth: 640, color: 'var(--color-ink)', opacity: 0.8 }}>
          Prices may vary by season and length of stay. Contact us directly to get the best quote for your trip.
        </p>
      </motion.div>

      {loading ? (
        <div className="d-flex justify-content-center py-5">
          <div className="spinner-border" style={{ color: 'var(--color-primary)' }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : homestays.length === 0 ? (
        <p className="text-center text-muted py-5">No properties with pricing available at the moment.</p>
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
                    {h.price.toLocaleString('en-US')}₫ <span className="fs-6 text-muted fw-normal">/ night</span>
                  </div>
                  <p className="text-muted small flex-grow-1">{h.description}</p>
                  <Link to={`/detail/${h.id}`} className="pill-btn mt-2 align-self-start">
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <div className="text-center my-5 py-4">
        <h3 className="font-display mb-3" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}>
          Need more info on pricing and availability?
        </h3>
        <Link to="/contact" className="pill-btn">
          Contact Us <i className="bi bi-arrow-right"></i>
        </Link>
      </div>
    </div>
  );
};

export default Pricing;
