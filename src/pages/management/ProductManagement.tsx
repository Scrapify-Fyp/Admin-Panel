import React, { useState, useEffect } from 'react';
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
  weight: number;
  length: number;
  width: number;
  height: number;
  discount: number;
  rating: number;
  keywords: string[];
  color: string;
  material: string;
  availabilityStatus: string;
}

const ManageProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
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
    weight: 0,
    length: 0,
    width: 0,
    height: 0,
    discount: 0,
    rating: 0,
    keywords: [],
    color: "",
    material: "",
    availabilityStatus: "",
  });
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [newImageURL, setNewImageURL] = useState("");
  useEffect(() => {
    axios
      .get(`http://localhost:3002/products/${id}`)
      .then((response) => {
        setFormData(response.data);
        setTags(response.data.keywords);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, [id]);

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
      // Handle file upload separately if a new file is selected
      if (newImageFile) {
        const formDataWithImage = new FormData();
        formDataWithImage.append('image', newImageFile);
        const uploadResponse = await axios.post('http://localhost:3002/upload', formDataWithImage, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        const imagePath = uploadResponse.data.path;
        formData.imageURL.push(imagePath); // Update imageURL with the new image path
      }

      // Update product information
      await axios.patch(`http://localhost:3002/products/${id}`, formData);
      console.log("Product updated successfully");
      navigate("/admin/product");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleClick = () => {
    navigate("/admin/product");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setNewImageFile(file);
    }
  };

  const handleRemoveImageURL = (index: number) => {
    const updatedImageURLs = formData.imageURL.filter((_, i) => i !== index);
    setFormData({ ...formData, imageURL: updatedImageURLs });
  };
  const handleAddImageURL = () => {
    setFormData({ ...formData, imageURL: [...formData.imageURL, newImageURL] });
    setNewImageURL("");
  };
  return (
    <div className="manage-product-container">
      <div className="close-button" onClick={handleClick}>
        &#10006;
      </div>
      <h1>Manage Product</h1>
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
              type="text"
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
              type="text"
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
              type="text"
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
              <strong>Image</strong>
            </label>
            <input
              type="file"
              onChange={handleFileChange}
            />
            OR
            <div className="image-url-list">
              {/* {formData.imageURL.map((url, index) => (
                <div key={index} className="image-url-item">
                  <img style={{width:"200px",height:"200px", padding:"30px"}} src={url} alt={`Image ${index + 1}`} />
                  <button type="button" onClick={() => handleRemoveImageURL(index)}>Remove</button>
                </div>
              ))} */}
               <input
              type="text"
              value={newImageURL}
              onChange={(e) => setNewImageURL(e.target.value)}
              placeholder='Add url'
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
          <div className="col">
            <label>
              <strong>Keywords</strong>
            </label>
            <TagInput tags={tags} 
              onChange={(e) => {
                handleTagChange(e); 
                setTags(e); 
              }}
            />
            <p>Tags: {tags.join(', ')}</p>
          </div>
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default ManageProduct;
