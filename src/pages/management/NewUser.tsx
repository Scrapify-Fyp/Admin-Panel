import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './newuser.scss';

interface FormValues {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  bio: string;
  address: string;
  phone: string;
  imageUrl: string | null;
}

const NewUser: React.FC = () => {
  const [formData, setFormData] = useState<FormValues>({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    bio: '',
    address: '',
    phone: '',
    imageUrl: null
  });

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    console.log(formData);
    
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, files } = e.target;

    // Check if the input value is a valid URL
    if (isValidUrl(value)) {
      setFormData({ ...formData, imageUrl: value });
    } else if (files && files[0]) {
      const imageUrl = URL.createObjectURL(files[0]);
      setFormData({ ...formData, imageUrl });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log('Form Data:', formData); // Log formData before sending
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/users`, formData);
      console.log('User added successfully:', response.data);
      navigate('/admin/customer');
    } catch (error) {
      console.error('Error adding user:', error);
      // Handle error appropriately, e.g., show error message to user
    }
  };
  

  const handleClick = () => {
    navigate('/admin/customer');
  };

  // Function to check if a string is a valid URL
  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <div className="new-user-container">
      <div className="close-button" onClick={handleClick}>
        &#10006;
      </div>
      <h2>New User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstname">First Name:</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={formData.firstname}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastname">Last Name:</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={formData.lastname}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            rows={3}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone No.:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image:</label>
          <input
            type="text"
            id="image"
            name="image"
            placeholder="Enter image URL or choose a file"
            onChange={handleImageChange}
            value={formData.imageUrl || ''}
          />
          <input
            type="file"
            id="image-upload"
            name="image-upload"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <button type="submit">Add New User</button>
      </form>
    </div>
  );
};

export default NewUser;
