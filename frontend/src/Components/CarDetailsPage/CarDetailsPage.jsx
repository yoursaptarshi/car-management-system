import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getCarById, deleteCar } from '../../Actions/carAction';
import './CarDetailsPage.css';

const CarDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { car, loading, error } = useSelector((state) => state.car);

  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    if (id) {
      dispatch(getCarById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (car && car.images?.length > 0) {
      setSelectedImage(car.images[0].url);
    }
  }, [car]);

  const handleImageClick = (url) => {
    setSelectedImage(url);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      await dispatch(deleteCar(id));
      alert('Car deleted successfully!');
      navigate('/'); // Redirect to home or another page after deletion
    }
  };

  if (loading) return <h2>Loading...</h2>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  // Ensure car is defined before rendering details
  if (!car) return <h2>Car not found or still loading...</h2>;

  return (
    <div className="car-details-page">
      <div className="image-gallery">
        {car.images && car.images.length > 0 ? (
          <>
            <div className="main-image">
              <img src={selectedImage} alt="Selected Car" />
            </div>
            <div className="thumbnails">
              {car.images.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={`Thumbnail ${index}`}
                  onClick={() => handleImageClick(image.url)}
                  className={selectedImage === image.url ? 'active' : ''}
                />
              ))}
            </div>
          </>
        ) : (
          <p>No images available</p>
        )}
      </div>

      <div className="car-details">
        <h1>{car.title || 'Untitled Car'}</h1>
        <p><strong>Description:</strong> {car.description || 'No description available'}</p>
        <p><strong>Tags:</strong> {car.tags || 'No tags available'}</p>
        <p><strong>Car Type:</strong> {car.car_type || 'Not specified'}</p>
        <p><strong>Company:</strong> {car.company || 'Not specified'}</p>
        <p><strong>Dealer:</strong> {car.dealer || 'Not specified'}</p>

        <button onClick={handleDelete} className="delete-button">
          Delete Car
        </button>
      </div>
    </div>
  );
};

export default CarDetailsPage;
