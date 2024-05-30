import React, { useState } from "react";
import './productmanagement.scss';

const ManageProduct: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    quantity: 0,
    description: "",
    category: "",
    brand: "",
    imageUrl: "",
    file: "",
    weight: "",
    length: "",
    height: "",
    discount: 0,
    rating: 0,
    keywords: "",
    color: "",
    material: "",
    availabilityStatus: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  const handleClick = () => {
    // Handle close button click (e.g., go back to previous page)
    window.history.back();
  };

  return (
    <div className="manage-product-container">
      <div className="close-button" onClick={handleClick}>&#10006;</div>
      <h1>Manage Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col">
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
          </div>
          <div className="col">
            <label>Price</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} />
          </div>
          <div className="col">
            <label>Quantity</label>
            <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label><strong>Description</strong></label>
            <textarea name="description" value={formData.description} onChange={handleChange} />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label><strong>Category</strong></label>
            <input type="text" name="category" value={formData.category} onChange={handleChange} />
          </div>
          <div className="col">
            <label><strong>Brand</strong></label>
            <input type="text" name="brand" value={formData.brand} onChange={handleChange} />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label><strong>Image URL</strong></label>
            <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
          </div>
          <div className="col">
            <label><strong>Choose File</strong></label>
            <input type="file" name="file" onChange={handleChange} />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label><strong>Weight</strong></label>
            <input type="text" name="weight" value={formData.weight} onChange={handleChange} />
          </div>
          <div className="col">
            <label><strong>Length</strong></label>
            <input type="text" name="length" value={formData.length} onChange={handleChange} />
          </div>
          <div className="col">
            <label><strong>Height</strong></label>
            <input type="text" name="height" value={formData.height} onChange={handleChange} />
          </div>
          <div className="col">
            <label><strong>Discount</strong></label>
            <input type="number" name="discount" value={formData.discount} onChange={handleChange} />
          </div>
          <div className="col">
            <label><strong>Rating</strong></label>
            <input type="number" name="rating" value={formData.rating} onChange={handleChange} />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label><strong>Keywords</strong></label>
            <input type="text" name="keywords" value={formData.keywords} onChange={handleChange} />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label><strong>Color</strong></label>
            <input type="text" name="color" value={formData.color} onChange={handleChange} />
          </div>
          <div className="col">
            <label><strong>Material</strong></label>
            <input type="text" name="material" value={formData.material} onChange={handleChange} />
          </div>
          <div className="col">
            <label><strong>Availability Status</strong></label>
            <input type="text" name="availabilityStatus" value={formData.availabilityStatus} onChange={handleChange} />
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ManageProduct;
