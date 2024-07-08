import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './newuser.scss';

interface FormValues {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

const NewUser: React.FC = () => {
  const [formData, setFormData] = useState<FormValues>({
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData); // For demo purposes; you can perform further actions here
    // You can add further logic to handle form submission (e.g., API calls)
  };

  const handleClick = () => {
    navigate('/admin/customer');
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
        <button type="submit">Add New User</button>
      </form>
    </div>
  );
};

export default NewUser;
