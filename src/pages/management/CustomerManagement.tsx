import React, { useState, ChangeEvent } from 'react';
import "./customermanagement.scss";
import { FaTrash } from 'react-icons/fa'; // Import Font Awesome trash icon

const App = () => {
  const [userProfile, setUserProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    about: '',
    profileImage: ''
  });

  const [products, setProducts] = useState([
    { id: 1, name: 'Flowers', rating: 4.5, price: 500, image: 'https://img.freepik.com/free-photo/natures-beauty-captured-colorful-flower-close-up-generative-ai_188544-8593.jpg' },
    { id: 2, name: 'Wall Hanging', rating: 3.5, price: 2000, image: 'https://vaaree.com/cdn/shop/products/wall-art-and-paintings-life-tree-wall-art-set-of-four-1.jpg?v=1715953682&width=600' },
  ]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserProfile({ ...userProfile, [name]: value });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUserProfile({ ...userProfile, profileImage: URL.createObjectURL(e.target.files[0]) });
    }
  };

  const handleSaveChanges = () => {
    // Logic to save changes
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const handleReturn = () => {
    window.history.back();
  };

  return (
    <div className="container">
      <div className="return-button" onClick={handleReturn}>X</div>

      <div className="content">
        {/* User Profile Section */}
        <section className="profile-section">
          <h2>User Profile</h2>
          <div className="profile-inputs">
            <input type="text" name="firstName" placeholder="First Name" value={userProfile.firstName} onChange={handleInputChange} />
            <input type="text" name="lastName" placeholder="Last Name" value={userProfile.lastName} onChange={handleInputChange} />
            <input type="email" name="email" placeholder="Email" value={userProfile.email} onChange={handleInputChange} />
            <input type="text" name="phone" placeholder="Phone No." value={userProfile.phone} onChange={handleInputChange} />
            <input type="text" name="address" placeholder="Address" value={userProfile.address} onChange={handleInputChange} />
            <textarea name="about" placeholder="About" value={userProfile.about} onChange={handleInputChange} />
          </div>
          <div className="image-section">
            <h3>Add Image</h3>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {userProfile.profileImage && <img src={userProfile.profileImage} alt="Profile Preview" className="profile-image-preview" />}
          </div>
          <div className="save-button">
            <button onClick={handleSaveChanges}>Save Changes</button>
          </div>
        </section>

        {/* Products Section */}
        <section className="products-section">
          <h2>Products</h2>
          <div className="products">
            {products.map(product => (
              <div className="product-card" key={product.id}>
                <img src={product.image} alt={product.name} className="product-image" />
                <h4>{product.name}</h4>
                <p>Rating: {renderStars(product.rating)}</p>
                <p>Price: PKR {product.price}</p>
                <div className="delete-product" onClick={() => handleDeleteProduct(product.id)}>
                  <FaTrash />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

const renderStars = (rating: number) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      stars.push(<span key={i}>&#9733;</span>);
    } else {
      stars.push(<span key={i}>&#9734;</span>);
    }
  }
  return stars;
};

export default App;
