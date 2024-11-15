import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCars } from '../../Actions/carAction';
import car2 from "../../images/car1.png";
import car1 from "../../images/car2.png";
import car3 from "../../images/car3.png";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cars, loading } = useSelector((state) => state.car);
  

  const handleNavigate = (id) => {
    navigate(`/car/${id}`); // Navigate to car details page
  };

  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);

  const handleAddCar = () => {
    navigate('/create-car');
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* Carousel Section with Overlay */}
      <section style={{ marginBottom: '30px', textAlign: 'center' }}>
        <div
          id="carouselExample"
          className="carousel slide"
          data-bs-ride="carousel"
          style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src={car1}
                className="d-block w-100"
                alt="Car 1"
                style={{ height: '400px', objectFit: 'cover' }}
              />
            </div>
            <div className="carousel-item">
              <img
                src={car2}
                className="d-block w-100"
                alt="Car 2"
                style={{ height: '400px', objectFit: 'cover' }}
              />
            </div>
            <div className="carousel-item">
              <img
                src={car3}
                className="d-block w-100"
                alt="Car 3"
                style={{ height: '400px', objectFit: 'cover' }}
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
          
          {/* Overlay content on top of the carousel */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'white',
              textAlign: 'center',
              zIndex: 10,
            }}
          >
            <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '20px' }}>
              Want to add your car?
            </h1>
            <button
              onClick={handleAddCar}
              style={{
                padding: '10px 20px',
                fontSize: '18px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginTop: '10px',
              }}
            >
              Add a Car
            </button>
          </div>
        </div>
      </section>

      {/* Cars Grid Section */}
      <section>
        <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Available Cars</h2>
        {loading ? (
          <p style={{ textAlign: 'center' }}>Loading...</p>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '20px',
            }}
          >
            {cars &&
        cars.map((car) => (
          <div
            key={car.id}
            onClick={() => handleNavigate(car.id)} // Navigate when clicked
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              cursor: 'pointer', // Indicate it's clickable
            }}
          >
            <img
              src={car.image || '/images/default-car.jpg'}
              alt={car.title || 'Default Car'}
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
              }}
            />
            <div style={{ padding: '10px' }}>
              <h3 style={{ fontSize: '18px', marginBottom: '5px' }}>
                {car.title || 'Untitled Car'}
              </h3>
              <p style={{ fontSize: '14px', color: '#555' }}>
                {car.shortDescription
                  ? car.shortDescription.split(' ').slice(0, 20).join(' ') + '...'
                  : 'No description available.'}
              </p>
            </div>
          </div>
        ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
