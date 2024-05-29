import './accounts.scss';

const AccountsPage = () => {
  return (
    <div className="accounts-page">
      <h1 className="heading">Accounts</h1>
      <div className="columns">
        <div className="left-column">
          <div className="left-section">
            <h2 className="sub-heading">Profile Picture</h2>
            <div className="profile-picture">
              <img src="path_to_profile_picture.jpg" alt="Profile" />
            </div>
            <h2 className="sub-heading">Name</h2>
            <input type="text" placeholder="Name" className="input-field" />
            <h2 className="sub-heading">Location</h2>
            <input type="text" placeholder="Location" className="input-field" />
            <button className="upload-button">Upload</button>
          </div>
        </div>
        <div className="right-column">
          <div className="right-section">
            <h2 className="sub-heading">Profile</h2>
            <label className="input-label">First Name</label>
            <input type="text" placeholder="First Name" className="input-field" />
            <label className="input-label">Last Name</label>
            <input type="text" placeholder="Last Name" className="input-field" />
            <label className="input-label">Phone No.</label>
            <input type="text" placeholder="Phone No." className="input-field" />
            <label className="input-label">Email</label>
            <input type="email" placeholder="Email" className="input-field" />
            <label className="input-label">Country</label>
            <input type="text" placeholder="Country" className="input-field" />
            <label className="input-label">City</label>
            <input type="text" placeholder="City" className="input-field" />
            <div className="button-group">
              <button className="cancel-button">Cancel</button>
              <button className="save-button">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountsPage;
