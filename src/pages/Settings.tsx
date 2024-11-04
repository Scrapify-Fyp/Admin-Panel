import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import './settings.scss';
import { useAuth } from './auth';  

const SettingsPage = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const admin = useAuth();  
  const navigate = useNavigate();  

  const handleUpdatePassword = async () => {
    if (!admin) {
      alert('Admin is not authenticated');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('New password and confirm password do not match');
      return;
    }

    try {
      const response = await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/admins/update-password`, {
        adminId: admin.id, 
        oldPassword,
        newPassword
      });
      if (response.status === 200) {
        navigate('/admin/dashboard');  
        alert('Password updated successfully');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      alert('Failed to update password');
    }
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>
        <div className="settings-page">
          <h1>Settings</h1>
          <div className="settings-section">
            <h2>Password</h2>
            <label>
              Old Password
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </label>
            <label>
              New Password
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </label>
            <label>
              Confirm Password
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </label>
            <button className="update-button" onClick={handleUpdatePassword}>
              Update
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
