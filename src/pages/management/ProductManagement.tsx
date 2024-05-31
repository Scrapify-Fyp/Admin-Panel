// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import { WithContext as ReactTags } from 'react-tag-input';
// import "./productmanagement.scss";

// interface Tag {
//   id: string;
//   text: string;
//   className?: string;
// }

// const ManageProduct: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
  
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     price: 0,
//     category: "",
//     stockQuantity: 0,
//     imageURL: "",
//     brand: "",
//     weight: "",
//     length: 0,
//     width: 0,
//     height: 0,
//     discount: 0,
//     rating: 0,
//     keywords: [] as Tag[],
//     color: "",
//     material: "",
//     discounts: "",
//     availabilityStatus: "available",
//   });

//   useEffect(() => {
//     axios
//       .get(`http://localhost:3002/products/${id}`)
//       .then((response) => {
//         setFormData(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching product:", error);
//       });
//   }, [id]);

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
//     >
//   ) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleAddition = (tag: Tag) => {
//     const newTags = [...formData.keywords, tag];
//     setFormData({ ...formData, keywords: newTags });
//   };

//   const handleDelete = (index: number) => {
//     const newKeywords = [...formData.keywords];
//     newKeywords.splice(index, 1);
//     setFormData({ ...formData, keywords: newKeywords });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     axios
//       .patch(`http://localhost:3002/products/${id}`, formData)
//       .then((response) => {
//         console.log("Product updated successfully:", response.data);
//         navigate("/admin/product");
//       })
//       .catch((error) => {
//         console.error("Error updating product:", error);
//       });
//   };

//   const handleClick = () => {
//     navigate("/admin/product");
//   };

//   return (
//     <div className="manage-product-container">
//       <div className="close-button" onClick={handleClick}>
//         &#10006;
//       </div>
//       <h1>Manage Product</h1>
//       <form onSubmit={handleSubmit}>
//         {/* Form Inputs */}
//         <div className="row">
//           <div className="col">
//             <label>
//               <strong>Name</strong>
//             </label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="col">
//             <label>
//               <strong>Price</strong>
//             </label>
//             <input
//               type="number"
//               name="price"
//               value={formData.price}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="col">
//             <label>
//               <strong>Quantity</strong>
//             </label>
//             <input
//               type="number"
//               name="stockQuantity"
//               value={formData.stockQuantity}
//               onChange={handleChange}
//             />
//           </div>
//         </div>
//         {/* Other Form Inputs */}
//         <div className="row">
//           <div className="col">
//             <label>
//               <strong>Description</strong>
//             </label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//             />
//           </div>
//         </div>
//         <div className="row">
//           <div className="col">
//             <label>
//               <strong>Category</strong>
//             </label>
//             <select
//               name="category"
//               value={formData.category}
//               onChange={handleChange}
//             >
//               <option value="">Select Category</option>
//               <option value="Category1">Category 1</option>
//               <option value="Category2">Category 2</option>
//               <option value="Category3">Category 3</option>
//             </select>
//           </div>
//           <div className="col">
//             <label>
//               <strong>Brand</strong>
//             </label>
//             <input
//               type="text"
//               name="brand"
//               value={formData.brand}
//               onChange={handleChange}
//             />
//           </div>
//         </div>
//         <div className="row">
//           <div className="col">
//             <label>
//               <strong>Image URL</strong>
//             </label>
//             <input
//               type="text"
//               name="imageURL"
//               value={formData.imageURL}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="col">
//             <label>
//               <strong>Weight</strong>
//             </label>
//             <input
//               type="text"
//               name="weight"
//               value={formData.weight}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="col">
//             <label>
//               <strong>Length</strong>
//             </label>
//             <input
//               type="text"
//               name="length"
//               value={formData.length}
//               onChange={handleChange}
//             />
//           </div>
//         </div>
//         <div className="row">
//           <div className="col">
//             <label>
//               <strong>Width</strong>
//             </label>
//             <input
//               type="text"
//               name="width"
//               value={formData.width}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="col">
//             <label>
//               <strong>Height</strong>
//             </label>
//             <input
//               type="text"
//               name="height"
//               value={formData.height}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="col">
//             <label>
//               <strong>Discount</strong>
//             </label>
//             <input
//               type="number"
//               name="discount"
//               value={formData.discount}
//               onChange={handleChange}
//             />
//           </div>
//         </div>
//         <div className="row">
//           <div className="col">
//             <label>
//               <strong>Rating</strong>
//             </label>
//             <input
//               type="number"
//               name="rating"
//               value={formData.rating}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="col">
//             <label>
//               <strong>Keywords</strong>
//             </label>
//             <ReactTags
//               tags={formData.keywords}
//               handleDelete={handleDelete}
//               handleAddition={handleAddition}
//             />
//           </div>
//         </div>
//         <div className="row">
//           <div className="col">
//             <label>
//               <strong>Color</strong>
//             </label>
//             <input
//               type="text"
//               name="color"
//               value={formData.color}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="col">
//             <label>
//               <strong>Material</strong>
//             </label>
//             <input
//               type="text"
//               name="material"
//               value={formData.material}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="col">
//             <label>
//               <strong>Discounts</strong>
//             </label>
//             <input
//               type="text"
//               name="discounts"
//               value={formData.discounts}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="col">
//             <label>
//               <strong>Availability Status</strong>
//             </label>
//             <select
//               name="availabilityStatus"
//               value={formData.availabilityStatus}
//               onChange={handleChange}
//             >
//               <option value="">Select Availability Status</option>
//               <option value="In Stock">In Stock</option>
//               <option value="Out of Stock">Out of Stock</option>
//             </select>
//           </div>
//         </div>
//         <button type="submit">Save</button>
//       </form>
//     </div>
//   );
// };

// export default ManageProduct;

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { WithContext as ReactTags } from 'react-tag-input'; // Import ReactTags here
import "./productmanagement.scss";

interface Tag {
  id: string;
  text: string;
}

const ManageProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useNavigate();
  const [tags, setTags] = useState<Tag[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    stockQuantity: 0,
    imageURL: "",
    brand: "",
    weight: "",
    length: "",
    height: "",
    discount: 0,
    rating: 0,
    keywords: "",
    color: "",
    material: "",
    discounts: "",
    availabilityStatus: "available",
  });

  useEffect(() => {
    axios.get(`http://localhost:3002/products/${id}`)
      .then(response => {
        setFormData(response.data);
      })
      .catch(error => {
        console.error('Error fetching product:', error);
      });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleKeywordsChange = (tags: Tag[]) => {
    setFormData({ ...formData, keywords: tags });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .patch(`http://localhost:3002/products/${id}`, formData)
      .then((response) => {
        console.log("Product updated successfully:", response.data);
        history("/admin/product");
      })
      .catch(error => {
        console.error('Error updating product:', error);
      });
  };

  const handleClick = () => {
    history("/admin/product");
  };

  return (
    <div className="manage-product-container">
      <div className="close-button" onClick={handleClick}>&#10006;</div>
      <h1>Manage Product</h1>
      <form onSubmit={handleSubmit}>
      <div className="row">
          <div className="col">
            <label><strong>Name</strong></label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
          </div>
          <div className="col">
            <label><strong>Price</strong></label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} />
          </div>
          <div className="col">
            <label><strong>Quantity</strong></label>
            <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} />
          </div>
        </div>
        {/* Other Form Inputs */}
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
            <label>
              <strong>Choose File</strong>
            </label>
            <input
              type="file"
              name="file"
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <label><strong>Weight</strong></label>
            <input type="text" name="weight" value={formData.weight} onChange={handleChange} />
          </div>
          <div className="col">
            <label><strong>Length</strong></label>
            <input type="text" name="length" value={formData.length} onChange={handleChange} />
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
            <label><strong>Height</strong></label>
            <input type="text" name="height" value={formData.height} onChange={handleChange} />
          </div>
          <div className="col">
            <label><strong>Discount</strong></label>
            <input type="number" name="discount" value={formData.discount} onChange={handleChange} />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label><strong>Rating</strong></label>
            <input type="number" name="rating" value={formData.rating} onChange={handleChange} />
          </div>
          <div className="col">
            <label>
              <strong>Keywords</strong>
            </label>
            <ReactTags
              tags={tags}
              handleDelete={() => {}}
              handleAddition={handleAddition}
            />
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
            <label>
            <strong>Availability Status</strong></label>
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
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default ManageProduct;
