import './settings.scss';

const SettingsPage = () => {
  return (
    <div className="settings-page">
      <h1>Settings</h1>

      <div className="settings-section">
        <h2>Notification</h2>
        <h3>Manage Notification</h3>
        
        <div className="notification-columns">
          <div className="notification-column">
            <h4>Email</h4>
            <label>
              <input type="checkbox" />
              Product Updates
            </label>
            <label>
              <input type="checkbox" />
              Security Updates
            </label>
          </div>

          <div className="notification-column">
            <h4>Phone</h4>
            <label>
              <input type="checkbox" />
              Product Updates
            </label>
            <label>
              <input type="checkbox" />
              Security Updates
            </label>
          </div>
        </div>
        
        <button className="save-button">Save Changes</button>
      </div>

      <div className="settings-section">
        <h2>Password</h2>
        
        <label>
          Password
          <input type="password" />
        </label>
        <label>
          Confirm Password
          <input type="password" />
        </label>
        
        <button className="update-button">Update</button>
      </div>
    </div>
  );
}

export default SettingsPage;
