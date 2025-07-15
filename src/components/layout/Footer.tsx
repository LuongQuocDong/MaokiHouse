const Footer = () => {
  return (
    <footer 
      className="py-4 mt-5"
      style={{ 
        backgroundColor: '#824a39',
        color: '#fdf2e9'
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <img
              src="https://res.cloudinary.com/dlkejgkqk/image/upload/v1752607273/logo_gkzxvs.png"
              alt="Maoki House"
              style={{ width: '150px' }}
            />
            <p className="mt-3">Your local home in Saigon</p>
          </div>
          <div className="col-md-6 text-md-end">
            <p>© {new Date().getFullYear()} Maoki House. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 