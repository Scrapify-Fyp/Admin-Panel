// import {ReactElement, useEffect, useState } from 'react';
// import axios from 'axios';
// import AdminSidebar from '../components/AdminSidebar';
// import { createColumnHelper } from '@tanstack/react-table';
// import { Link } from 'react-router-dom';
// import TableHOC from '../components/TableHOC';
// import { FaPlus } from 'react-icons/fa';
// // import Spinner from 'react-bootstrap/Spinner';

// interface DataType {
//   photo: ReactElement;
//   name: string;
//   price: number;
//   stock: number;
//   action: ReactElement;
//   delete: ReactElement;
// }

// const columnHelper = createColumnHelper<DataType>();
// const columns = [
//   columnHelper.accessor('photo', {
//     header: () => 'Photo',
//     cell: (info) => info.getValue(),
//     footer: (info) => info.column.id,
//   }),
//   columnHelper.accessor('name', {
//     header: () => 'Name',
//     cell: (info) => info.getValue(),
//     footer: (info) => info.column.id,
//   }),
//   columnHelper.accessor('price', {
//     header: () => 'Price',
//     cell: (info) => info.renderValue(),
//     footer: (info) => info.column.id,
//   }),
//   columnHelper.accessor('stock', {
//     header: () => <span>Stock</span>,
//     cell: (info) => info.renderValue(),
//     footer: (info) => info.column.id,
//   }),
//   columnHelper.accessor('action', {
//     header: () => 'Action',
//     cell: (info) => <div>{info.getValue()}</div>,
//     footer: (info) => info.column.id,
//   }),
//   columnHelper.accessor('delete', {
//     header: () => 'Delete',
//     cell: (info) => info.getValue(),
//     footer: (info) => info.column.id,
//   })
// ];




// const Products = () => {
//   const [data, setData] = useState<DataType[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios.get('http://localhost:3002/products')
//       .then(response => {
//         const products = response.data.map((product:any, index:any) => ({
//           photo: <img src={product.imageURL} alt={product.name} />,
//           name: product.name,
//           price: product.price,
//           stock: product.stockQuantity,
//           action: <Link to={`/admin/product/${product._id}`}>Manage</Link>,
//           delete: (
//             <button
//               style={{
//                 width: "70px",
//                 textDecoration: 'none',
//                 backgroundColor: 'rgb(255 114 44 / 46%)',
//                 padding: '0.25rem 0.5rem',
//                 borderRadius: '10px',
//               }}
//               onClick={() => handleDelete(index, product._id)}
//             >
//               Delete
//             </button>
//           )
//         }));
//         setData(products);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error fetching products:', error);
//         setLoading(false);
//       });
//   }, []);

//   const handleDelete = (index: number, productId: string) => {
//     axios.delete(`http://localhost:3002/products/${productId}`)
//       .then(() => {
//         setData(prevData => {
//           const newData = [...prevData];
//           newData.splice(index, 1);
//           return newData;
//         });
//       })
//       .catch(error => {
//         console.error('Error deleting product:', error);
//       });
//   };

//  return (
//     <div className="admin-container">
//       <AdminSidebar />
//       <main>
//     {TableHOC<DataType>(
//       columns,
//       data,
//       "dashboard-product-box",
//       "Products",
//       true,
//       loading
//     )}


        
//       </main>
//       <Link to="/admin/product/new" className="create-product-btn">
//         <FaPlus />
//       </Link>
//     </div>
//   );
// }

// export default Products;
import { ReactElement, useEffect, useState } from 'react';
import axios from 'axios';
import AdminSidebar from '../components/AdminSidebar';
import TableHOC from '../components/TableHOC';
import { createColumnHelper } from '@tanstack/react-table';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface ProductType {
  _id: string;
  photo: ReactElement;
  name: string;
  price: number;
  stock: number;
  action: ReactElement;
  delete: ReactElement;
}

const columnHelper = createColumnHelper<ProductType>();
const columns = [
  columnHelper.accessor('photo', {
    header: () => 'Photo',
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('name', {
    header: () => 'Name',
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('price', {
    header: () => 'Price',
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('stock', {
    header: () => <span>Stock</span>,
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('action', {
    header: () => 'Action',
    cell: (info) => <div>{info.getValue()}</div>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('delete', {
    header: () => 'Delete',
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
];

const Products = () => {
  const [data, setData] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3002/products')
      .then(response => {
        const products = response.data.map((product: any, index: number) => ({
          photo: <img src={product.imageURL} alt={product.name} />,
          name: product.name,
          price: product.price,
          stock: product.stockQuantity,
          action: <Link to={`/admin/product/${product._id}`}>Manage</Link>,
          delete: (
            <button
              style={{
                width: "70px",
                textDecoration: 'none',
                backgroundColor: 'rgb(255 114 44 / 46%)',
                padding: '0.25rem 0.5rem',
                borderRadius: '10px',
              }}
              onClick={() => handleDelete(index,product._id)}
            >
              <FaTrash />
            </button>
          )
        }));
        setData(products);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (index: number,productId: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this product?');
    if (!confirmed) {
      return;
    }
    
    axios.delete(`http://localhost:3002/products/${productId}`)
    .then(() => {
              setData(prevData => {
                const newData = [...prevData];
                newData.splice(index, 1);
                return newData;
              });
      })
      .catch(error => {
        console.error('Error deleting product:', error);
      });
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>
        {TableHOC<ProductType>(
          columns,
          data,
          "dashboard-product-box",
          "Products",
          true,
          loading
        )}
      </main>
      <Link to="/admin/product/new" className="create-product-btn">
        <FaPlus />
      </Link>
    </div>
  );
}

export default Products;
