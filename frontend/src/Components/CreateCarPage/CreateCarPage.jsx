import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createCar, clearErrors } from '../../Actions/carAction';

const CreateCarPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.car);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    car_type: '',
    company: '',
    dealer: '',
  });
  const [images, setImages] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 10) {
      setErrorMessage('You can upload a maximum of 10 images.');
      return;
    }
    setErrorMessage(null); // Clear any previous error messages
    setImages(files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();

    const processedTags = formData.tags
    .split(',')
    .map((tag) => tag.trim())
    .filter((tag) => tag !== '');
    form.tags = processedTags;
    for (const key in formData) {
      form.append(key, formData[key]);
    }

    
    images.forEach((image) => form.append('images', image));

    dispatch(createCar(form))
      .then(() => {
        alert('Car created successfully!');
        navigate('/');
      })
      .catch((err) => {
        alert('Error creating car');
      });
  };

  // Clear errors on component unmount
  React.useEffect(() => {
    return () => {
      dispatch(clearErrors());
    };
  }, [dispatch]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Create a New Car</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div style={{ marginBottom: '15px' }}>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', marginTop: '5px', height: '100px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Tags</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Car Type</label>
          <input
            type="text"
            name="car_type"
            value={formData.car_type}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Company</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Dealer</label>
          <input
            type="text"
            name="dealer"
            value={formData.dealer}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Car Images</label>
          <input
            type="file"
            name="images"
            accept="image/*"
            onChange={handleImageChange}
            multiple
            required
            style={{ marginTop: '5px' }}
          />
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '10px 20px',
            fontSize: '18px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          {loading ? 'Creating Car...' : 'Create Car'}
        </button>
      </form>
    </div>
  );
};

export default CreateCarPage;
