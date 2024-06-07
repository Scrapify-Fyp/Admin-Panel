import React, { useState } from 'react';


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
    { id: 1, name: 'Product 1', rating: 4.5, price: 100, image: 'product1.jpg' },
    { id: 2, name: 'Product 2', rating: 3.5, price: 200, image: 'product2.jpg' },
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserProfile({ ...userProfile, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUserProfile({ ...userProfile, profileImage: URL.createObjectURL(e.target.files[0]) });
    }
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <div className="container">
      <section className="profile-section">
        <h2>User Profile</h2>
        <input type="text" name="firstName" placeholder="First Name" value={userProfile.firstName} onChange={handleInputChange} />
        <input type="text" name="lastName" placeholder="Last Name" value={userProfile.lastName} onChange={handleInputChange} />
        <input type="email" name="email" placeholder="Email" value={userProfile.email} onChange={handleInputChange} />
        <input type="text" name="phone" placeholder="Phone No." value={userProfile.phone} onChange={handleInputChange} />
        <input type="text" name="address" placeholder="Address" value={userProfile.address} onChange={handleInputChange} />
        <textarea name="about" placeholder="About" value={userProfile.about} onChange={handleInputChange} />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {userProfile.profileImage && <img src={userProfile.profileImage} alt="Profile Preview" className="profile-image-preview" />}
        <button>Save Image</button>
      </section>
      <section className="products-section">
        <h2>Products</h2>
        <div className="products">
          {products.map(product => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>Rating: {product.rating}</p>
              <p>Price: ${product.price}</p>
              <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default App;
