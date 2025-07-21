import { useState, useEffect } from 'react';
import { ref, get, query, orderByChild } from 'firebase/database';
import { database } from '../config/firebase';
import type { Homestay } from '../types';
import HomeCarousel from '../components/Carousel';
import Welcome from '../components/Welcome';
import HomestaySlider from '../components/HomestaySlider';
import { motion } from 'framer-motion';

const Home = () => {
  const [homestays, setHomestays] = useState<Homestay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reviews = [
    {
      name: "Morgan Louise",
      location: "Manila, Philippines",
      rating: 5,
      date: "13 July 2025",
      content: "We really love the place! Very clean and cozy. It's also near Ben Tanh and there are a lot of restaurants and spa nearby. Thank you! We will come back and book this place again.",
      avatar: "https://res.cloudinary.com/dlkejgkqk/image/upload/v1752607289/morgan_zoyu0h.jpg"
    },
    {
      name: "My",
      location: "Munich, Germany",
      rating: 5,
      date: "9 July 2025",
      content: "Our stay was very relaxing and the place was very clean, modern, and as described. Wonderful host who responded promptly and gave us some valuable information. Highly recommend this place. +1 for in-building laundry.",
      avatar: "https://res.cloudinary.com/dlkejgkqk/image/upload/v1752607289/my_ntifbt.jpg"
    },
    {
      name: "Paige",
      location: "Ho Chi Minh City, Vietnam",
      rating: 5,
      date: "6 July 2025",
      content: "Loved this place! Had such a great stay. The space is amazing and just as described. Would love to stay again!",
      avatar: "https://res.cloudinary.com/dlkejgkqk/image/upload/v1752607290/paige_u9jyks.jpg"
    }
  ];

  useEffect(() => {
    const fetchHomestays = async () => {
      try {
        const homestaysRef = ref(database, 'homestays');
        const homestaysQuery = query(homestaysRef, orderByChild('timestamp'));
        const snapshot = await get(homestaysQuery);
        
        if (snapshot.exists()) {
          const homestayData: Homestay[] = [];
          snapshot.forEach((childSnapshot) => {
            homestayData.push({
              id: childSnapshot.key as string,
              ...childSnapshot.val()
            } as Homestay);
          });
          homestayData.sort((a, b) => b.timestamp - a.timestamp);
          setHomestays(homestayData);
        } else {
          setHomestays([]);
        }
        setError(null);
      } catch (error) {
        console.error('Error fetching homestays:', error);
        setError('Failed to load homestays. Please refresh the page.');
      } finally {
        setLoading(false);
      }
    };

    fetchHomestays();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  if (homestays.length === 0) {
    return (
      <div className="text-center py-5">
        <h1 className="display-4 text-primary mb-4">Our Homestays</h1>
        <p className="text-muted">No homestays available at the moment.</p>
      </div>
    );
  }

  return (
    <div>
      <HomeCarousel />
      <Welcome />
      <div className="container">
        <h1 className="display-4 text-primary mb-4">Our Homestays</h1>
        <div className="row g-4 mb-5">
          {homestays.map((homestay) => (
            <div key={homestay.id} className="col-12 col-md-6 col-lg-4">
              <HomestaySlider homestay={homestay} />
            </div>
          ))}
        </div>

        <section className="py-5" style={{ backgroundColor: '#ffe6d8' }}>
          <div className="container">
            <h2 className="display-5 text-primary text-center mb-5">Guest Reviews</h2>
            <div className="row g-4">
              {reviews.map((review, index) => (
                <div key={index} className="col-md-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <div className="card h-100 border-0 shadow-sm" style={{ backgroundColor: '#ffe6d8' }}>
                      <div className="card-body">
                        <div className="d-flex align-items-center mb-3">
                          <img
                            src={review.avatar}
                            alt={review.name}
                            className="rounded-circle me-3"
                            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                          />
                          <div>
                            <h5 className="mb-0">{review.name}</h5>
                            <div className="text-muted small">{review.location}</div>
                          </div>
                        </div>
                        <div className="mb-2">
                          {'★'.repeat(review.rating)}
                          <span className="text-muted small ms-2">{review.date}</span>
                        </div>
                        <p className="card-text">{review.content}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <style>
          {`
            .image-container {
              position: relative;
              overflow: hidden;
              border-radius: 8px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }

            .image-overlay {
              position: absolute;
              left: 0;
              right: 0;
              top: 0;
              bottom: 0;
              background: rgba(0, 0, 0, 0.7);
              color: white;
              padding: 20px;
              text-align: center;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              transform: translateY(100%);
              transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .image-container:hover .image-overlay {
              transform: translateY(0);
            }

            .image-overlay .h4 {
              transform: translateY(20px);
              opacity: 0;
              transition: all 0.4s ease 0.1s;
            }

            .image-overlay div:last-child {
              transform: translateY(20px);
              opacity: 0;
              transition: all 0.4s ease 0.2s;
            }

            .image-container:hover .image-overlay .h4,
            .image-container:hover .image-overlay div:last-child {
              transform: translateY(0);
              opacity: 1;
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default Home; 