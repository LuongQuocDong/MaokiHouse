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
    title: 'Airport Transfer',
    desc: 'Support booking a ride from Tan Son Nhat Airport straight to your accommodation, convenient for early or late flights.',
  },
  {
    icon: FaBroom,
    title: 'On-Request Housekeeping',
    desc: 'Housekeeping service, bed linen and towel changes on a regular or on-request basis throughout longer stays.',
  },
  {
    icon: FaMapMarkedAlt,
    title: 'Itinerary & Tour Advice',
    desc: 'Recommendations for dining and sightseeing around the central area, plus support booking local experience tours.',
  },
  {
    icon: FaHeadset,
    title: '24/7 Support',
    desc: 'Our support team is always available via phone/Zalo/WhatsApp throughout your stay at MaokiHouse.',
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
        <div className="eyebrow">Services</div>
        <h1 className="font-display mb-0" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
          Extra services for a complete stay
        </h1>
        <div className="gold-divider"><i className="bi bi-heart gold-divider-icon"></i></div>
        <p className="mx-auto mt-3" style={{ maxWidth: 640, color: 'var(--color-ink)', opacity: 0.8 }}>
          Beyond a comfortable room, MaokiHouse also offers a few extra services to make your trip easier.
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
          Need more support for your trip?
        </h3>
        <Link to="/contact" className="pill-btn">
          Contact Us <i className="bi bi-arrow-right"></i>
        </Link>
      </div>
    </div>
  );
};

export default Services;
