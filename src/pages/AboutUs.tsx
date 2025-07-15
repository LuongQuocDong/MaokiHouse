import { Container } from 'react-bootstrap';

const AboutUs = () => {
  return (
    <Container className="py-5">
      <h1 className="display-4 text-primary mb-4">Travel with local youth</h1>
      <div className="text-muted mb-4">
        We love wandering around, talking, sharing things about our lovely Saigon.
      </div>
      
      <div className="mb-5">
        <p>
          As your local companion, we take you on free walking street tours where we can tell you hundreds littles things about the city of Saigon, listening to all the things you have to say about your country. We learn from the stories that we have been told and our tour guides pass on knowledge from there henceforth. That is what we have aimed to gain and done for the last 15 years.
        </p>
      </div>

      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body">
              <h3 className="h4 text-primary mb-3">Our Story</h3>
              <p>
                Having once worked as a volunteer tour guide in Ho Chi Minh City, we've spent years exploring its hidden corners, charming stories, and unique culture. We know what travelers seek – the small things that make a trip special.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body">
              <h3 className="h4 text-primary mb-3">Local Experience</h3>
              <p>
                Whether it's a tucked-away café, a quiet alley filled with local art, or stories of old Saigon, we're here to share it with you. Our homestay is more than just accommodation – it's your gateway to authentic Saigon experiences.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm mt-4">
        <div className="card-body">
          <h3 className="h4 text-primary mb-3">Why Choose Maoki House?</h3>
          <ul className="list-unstyled">
            <li className="mb-3">✓ Local insights and personalized recommendations</li>
            <li className="mb-3">✓ Central location in the heart of Saigon</li>
            <li className="mb-3">✓ Comfortable and authentic homestay experience</li>
            <li className="mb-3">✓ Friendly hosts with extensive local knowledge</li>
            <li>✓ Access to hidden gems and local favorites</li>
          </ul>
        </div>
      </div>
    </Container>
  );
};

export default AboutUs; 