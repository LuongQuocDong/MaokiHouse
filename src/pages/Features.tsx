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
  { icon: FaWifi, title: 'High-Speed Wifi', desc: 'Stable connection, great for remote work or entertainment throughout your stay.' },
  { icon: FaSnowflake, title: 'Air Conditioning', desc: 'Individual air conditioning in every room, keeping the space cool year-round.' },
  { icon: FaShower, title: 'Private Bathroom', desc: 'Clean hot and cold bathroom with all the basic amenities.' },
  { icon: FaUtensils, title: 'Fully Equipped Kitchen', desc: 'Kitchen space equipped with a refrigerator, induction stove, and basic cooking utensils.' },
  { icon: FaTshirt, title: 'In-Building Laundry', desc: 'Convenient for longer stays, no need to search for a laundromat.' },
  { icon: FaShieldAlt, title: '24/7 Security', desc: 'Security system, surveillance cameras, and safe door locks for guests.' },
  { icon: FaMapMarkerAlt, title: 'Central Location', desc: 'Close to Ben Thanh Market, with plenty of restaurants, cafes, and spas nearby.' },
  { icon: FaParking, title: 'Parking Support', desc: 'Parking areas/recommendations for motorbikes and cars near the property.' },
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
        <div className="eyebrow">Amenities</div>
        <h1 className="font-display mb-0" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
          Everything you need for a comfortable stay
        </h1>
        <div className="gold-divider"><i className="bi bi-stars gold-divider-icon"></i></div>
        <p className="mx-auto mt-3" style={{ maxWidth: 640, color: 'var(--color-ink)', opacity: 0.8 }}>
          MaokiHouse pays attention to every little detail so you feel right at home, in the heart of Saigon.
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
