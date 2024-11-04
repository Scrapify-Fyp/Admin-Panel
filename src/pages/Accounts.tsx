import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminSidebar from '../components/AdminSidebar';
import './accounts.scss';
import { useAuth } from './auth';


interface Admin {
  id: string;
  username: string;
  email: string;
  phone: string;
  address: string;
  imageUrl: string;
}
const admin = useAuth() as Admin || null;
const AccountsPage: React.FC = () => {
  const [formData, setFormData] = useState<Admin>({
    id: '',
    username: '',
    email: '',
    phone: '',
    address: '',
    imageUrl: '',
  });
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
    
  };
  useEffect(() => {
    const fetchAdminInfo = async () => {
     
      if (!admin) return;

      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/admins/${admin.id}`);
        const adminData: Admin = response.data;
        // console.log(adminData);
        setFormData(adminData);
      } catch (error) {
        console.error('Error fetching admin info:', error);
      }
    };

    fetchAdminInfo();
  }, []);
  const handleSave = async () => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/admins/${admin.id}`, formData);
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };



  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>
        <div className="accounts-page">
          <h1 className="heading">Accounts</h1>
          <div className="columns">
            <div className="left-column">
              <div className="left-section">
                <h2 className="sub-heading">Profile Picture</h2>
                <div className="profile-picture">
                  <img
                    style={{ width: '100px', height: '100px' }}
                    src={
                      formData.imageUrl ||
                      'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp'
                    }
                    alt="Profile Picture"
                    className="profile-picture-img"
                  />
                </div>
                <input
                  type="file"
                  onChange={(e) => setProfilePicture(e.target.files ? e.target.files[0] : null)}
                />
                <br />
                <b> OR </b>
                <h2 className="sub-heading">Image URL</h2>
                <input
                  type="text"
                  placeholder="Image URL"
                  className="input-field"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="right-column">
              <div className="right-section">
                <h2 className="sub-heading">Profile</h2>
                <label className="input-label">User name</label>
                <input
                  type="text"
                  placeholder="Name"
                  className="input-field"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
                <label className="input-label">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  className="input-field"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <label className="input-label">Phone No.</label>
                <input
                  type="text"
                  placeholder="Phone No."
                  className="input-field"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <label className="input-label">Address</label>
                <input
                  type="text"
                  placeholder="Country"
                  className="input-field"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
                <div className="button-group">
                  <button className="cancel-button">Cancel</button>
                  <button className="save-button" onClick={handleSave}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AccountsPage;
