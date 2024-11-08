import React, { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./productmanagement.scss";
import TagInput from '../TagInput';

interface FormData {
  name: string;
  description: string;
  price: number;
  category: string;
  stockQuantity: number;
  imageURL: string[];
  brand: string;
  weight: string;
  length: number;
  width: number;
  height: number;
  discount: number;
  rating: number;
  keywords: string[];
  color: string;
  material: string;
  availabilityStatus: string;
  vendorId: string;
}

const NewProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Use useParams inside the component
  // console.log(id);
  
  const navigate = useNavigate();
  const [tags, setTags] = useState<string[]>([]);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    price: 0,
    category: "",
    stockQuantity: 0,
    imageURL: [],
    brand: "",
    weight: "",
    length: 0,
    width: 0,
    height: 0,
    discount: 0,
    rating: 0,
    keywords: [],
    color: "",
    material: "",
    availabilityStatus: "available",
    vendorId: id || "",
  });
  
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [newImageURL, setNewImageURL] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
    
  };

  const handleTagChange = (newTags: string[]) => {
    setFormData({ ...formData, keywords: newTags });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/products`, formData);
      console.log("Product updated successfully");
      navigate(`/admin/customer/${id}`);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleClick = () => {
    navigate(`/admin/customer/${id}`);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setNewImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imageURL: [...formData.imageURL, reader.result as string] });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddImageURL = () => {
    if (newImageURL) {
      setFormData({ ...formData, imageURL: [...formData.imageURL, newImageURL] });
      setNewImageURL("");
    }
  };

  const handleRemoveImageURL = (index: number) => {
    const updatedImageURLs = formData.imageURL.filter((_, i) => i !== index);
    setFormData({ ...formData, imageURL: updatedImageURLs });
  };

  return (
    <div className="manage-product-container">
      <div className="close-button" onClick={handleClick}>
        &#10006;
      </div>
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col">
            <label>
              <strong>Name</strong>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <label>
              <strong>Price</strong>
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <label>
              <strong>Quantity</strong>
            </label>
            <input
              type="number"
              name="stockQuantity"
              value={formData.stockQuantity}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label>
              <strong>Description</strong>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label>
              <strong>Category</strong>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              <option value="Category1">Category 1</option>
              <option value="Category2">Category 2</option>
              <option value="Category3">Category 3</option>
            </select>
          </div>
          <div className="col">
            <label>
              <strong>Brand</strong>
            </label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label>
              <strong>Weight</strong>
            </label>
            <input
              type="text"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <label>
              <strong>Length</strong>
            </label>
            <input
              type="number"
              name="length"
              value={formData.length}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label>
              <strong>Width</strong>
            </label>
            <input
              type="number"
              name="width"
              value={formData.width}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <label>
              <strong>Height</strong>
            </label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <label>
              <strong>Discount</strong>
            </label>
            <input
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label>
              <strong>Rating</strong>
            </label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <label>
              <strong>Color</strong>
            </label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label>
              <strong>Material</strong>
            </label>
            <input
              type="text"
              name="material"
              value={formData.material}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <label>
              <strong>Availability Status</strong>
            </label>
            <select
              name="availabilityStatus"
              value={formData.availabilityStatus}
              onChange={handleChange}
            >
              <option value="">Select Availability Status</option>
              <option value="In Stock">In Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label>
              <strong>Image URLs</strong>
            </label>
            <input
              type="file"
              onChange={handleFileChange}
            />
            OR
            <input
              type="text"
              placeholder="Add Image URL"
              value={newImageURL}
              onChange={(e) => setNewImageURL(e.target.value)}
            />
            <button style={{height:"35px"}} className="btn btn-primary" type="button" onClick={handleAddImageURL}>Add Image</button>
            <div style={{display:"flex",flexWrap:"wrap",width:"700px"}} className="image-url-list">
              {formData.imageURL.map((url, index) => (
                <div key={index}  className="image-url-item">
                  <img style={{width:"200px",height:"200px", padding:"30px"}} src={url} alt={`Image ${index + 1}`} />
                  <button className="btn btn-danger" type="button" onClick={() => handleRemoveImageURL(index)}>Remove</button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label>
              <strong>Keywords</strong>
            </label>
            <TagInput tags={tags} onChange={handleTagChange} />
          </div>
        </div>
        <button type="submit">Upload Product</button>
      </form>
    </div>
  );
};

export default NewProduct;
