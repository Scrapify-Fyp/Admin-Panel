import { useState, useEffect, ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./customermanagement.scss";
import { FaPlus,FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Define the Product interface
interface Product {
  _id: string;
  name: string;
  rating: number;
  price: number;
  imageURL: string;
}

const App = () => {
  const { id } = useParams<{ id: string }>();
// console.log(id);

  const [userProfile, setUserProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    bio: '',
    imageUrl: ''
  });

  // Use the Product interface to type the products state
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch user profile
    axios.get(`http://localhost:3002/users/${id}`)
      .then(response => setUserProfile(response.data))
      .catch(error => console.error("Error fetching user profile:", error));

    // Fetch user products
    axios.get(`http://localhost:3002/users/${id}/products`)
      .then(response => setProducts(response.data.products))
      .catch(error => console.error("Error fetching products:", error));
  }, [id]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserProfile({ ...userProfile, [name]: value });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUserProfile({ ...userProfile, imageUrl: URL.createObjectURL(e.target.files[0]) });
    }
  };

  const handleSaveChanges = () => {
    axios.patch(`http://localhost:3002/users/${id}`, userProfile)
      .then(response => {
        setUserProfile(response.data);
        alert("User profile updated successfully");
        handleReturn();
      })
      .catch(error => console.error("Error updating user profile:", error));
  };

  const handleDeleteProduct = (productId: string) => {
    axios.delete(`http://localhost:3002/products/${productId}`)
      .then(() => {
        setProducts(products.filter(product => product._id !== productId));
        alert("Product deleted successfully");
      })
      .catch(error => console.error("Error deleting product:", error));
  };

  const handleReturn = () => {
    window.history.back();
  };

  return (
    <div className="container">
      <Link to={"/admin/customer"}><div className="return-button">X</div></Link>

      <div className="content">
        {/* User Profile Section */}
        <section className="profile-section">
          <h2>User Profile</h2>
          <div className="profile-inputs">
            <div className="image-section">
              {userProfile.imageUrl && <img src={userProfile.imageUrl} alt="Profile Preview" className="profile-image-preview" />}
              <input style={{width:"300px"}} type="file" accept="image/*" onChange={handleImageChange} />
              <br />
              <br />
            </div>
            <input type="text" name="firstName" placeholder="First Name" value={userProfile.firstName} onChange={handleInputChange} />
            <input type="text" name="lastName" placeholder="Last Name" value={userProfile.lastName} onChange={handleInputChange} />
            <input type="email" name="email" placeholder="Email" value={userProfile.email} onChange={handleInputChange} />
            <input type="text" name="phone" placeholder="Phone No." value={userProfile.phone} onChange={handleInputChange} />
            <input type="text" name="address" placeholder="Address" value={userProfile.address} onChange={handleInputChange} />
            <textarea name="bio" placeholder="About" value={userProfile.bio} onChange={handleInputChange} />
          </div>
         
          <div className="save-button">
            <button onClick={handleSaveChanges}>Save Changes</button>
          </div>
        </section>

        {/* Products Section */}
        <section className="products-section">
          <h2>Products</h2>
          <Link to= {`/admin/product/new/${id}`} className="create-product-btn">
        <FaPlus />
      </Link>
          <div className="products">
            {products.map(product => (
              <div className="product-card" key={product._id}>
                <img src={product.imageURL} alt={product.name} className="product-image" />
                <h4>{product.name}</h4>
                <p>Rating: {renderStars(product.rating)}</p>
                <p>Price: PKR {product.price}</p>
                <div className="delete-product" onClick={() => handleDeleteProduct(product._id)}>
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
