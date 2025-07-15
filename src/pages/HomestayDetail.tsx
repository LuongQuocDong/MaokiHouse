import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ref, get } from 'firebase/database';
import { database } from '../config/firebase';
import type { Homestay } from '../types';
import { Carousel } from 'react-bootstrap';

const HomestayDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [homestay, setHomestay] = useState<Homestay | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const fetchHomestay = async () => {
      try {
        if (!id) return;
        const homestayRef = ref(database, `homestays/${id}`);
        const snapshot = await get(homestayRef);
        
        if (snapshot.exists()) {
          setHomestay({ id: snapshot.key as string, ...snapshot.val() } as Homestay);
        }
      } catch (error) {
        console.error('Error fetching homestay:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomestay();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!homestay) {
    return (
      <div className="text-center py-5">
        <h2 className="display-6 text-primary">Homestay not found</h2>
      </div>
    );
  }

  // Use imageURLs if available, otherwise fallback to single imageURL
  const images = homestay.imageURLs?.length ? homestay.imageURLs : [homestay.imageURL || homestay.mainImageURL];

  return (
    <div className="container-fluid max-width-4xl mx-auto px-0">
      <div className="position-relative mb-4">
        <Carousel
          activeIndex={selectedImageIndex}
          onSelect={(index) => setSelectedImageIndex(index)}
          interval={null}
        >
          {images.map((imageUrl, index) => (
            <Carousel.Item key={index}>
              <img
                src={imageUrl}
                alt={`${homestay.title} - Image ${index + 1}`}
                className="w-100 rounded"
                style={{ height: '400px', objectFit: 'cover' }}
              />
            </Carousel.Item>
          ))}
        </Carousel>

        {images.length > 1 && (
          <div className="mt-3 d-flex gap-2 overflow-auto pb-2">
            {images.map((imageUrl, index) => (
              <img
                key={index}
                src={imageUrl}
                alt={`${homestay.title} - Thumbnail ${index + 1}`}
                className={`rounded cursor-pointer ${index === selectedImageIndex ? 'border border-primary' : ''}`}
                style={{
                  width: '80px',
                  height: '80px',
                  objectFit: 'cover',
                  cursor: 'pointer',
                  opacity: index === selectedImageIndex ? 1 : 0.7,
                  transition: 'opacity 0.3s ease'
                }}
                onClick={() => setSelectedImageIndex(index)}
              />
            ))}
          </div>
        )}
      </div>
      
      <div className="card shadow">
        <div className="card-body">
          <h1 className="display-5 text-primary mb-4">{homestay.title}</h1>
          <p className="text-muted mb-4" style={{ whiteSpace: 'pre-line' }}>{homestay.description}</p>
          
          <div className="border-top pt-4">
            <div className="row align-items-center">
              <div className="col-12 col-md-6 mb-3 mb-md-0">
                <div className="h3 text-primary mb-0">
                  ${homestay.price}/night
                </div>
              </div>
              
              <div className="col-12 col-md-6">
                <div className="d-flex gap-3 justify-content-md-end">
                  <a
                    href={homestay.airbnbLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-danger"
                    style={{ backgroundColor: '#ff385c', borderColor: '#ff385c' }}
                  >
                    Book on Airbnb
                  </a>
                  
                  <a
                    href={`tel:${homestay.phone}`}
                    className="btn btn-primary d-flex align-items-center gap-2"
                  >
                    <i className="bi bi-telephone"></i>
                    Call Host
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          .cursor-pointer {
            cursor: pointer;
          }
          .cursor-pointer:hover {
            opacity: 0.9 !important;
          }
        `}
      </style>
    </div>
  );
};

export default HomestayDetail; 