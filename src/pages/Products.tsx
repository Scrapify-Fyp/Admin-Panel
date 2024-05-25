import { ReactElement, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import { createColumnHelper } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import TableHOC from "../components/TableHOC";
import { FaPlus } from "react-icons/fa";

interface DataType {
  photo: ReactElement;
  name: string;
  price: number;
  stock: number;
  action: ReactElement;
  delete: ReactElement;  
}

const columnHelper = createColumnHelper<DataType>();
const columns = [
  columnHelper.accessor("photo", {
    header: () => 'Photo',
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("name", {
    header: () => 'Name',
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("price", {
    header: () => "Price",
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("stock", {
    header: () => <span>Stock</span>,
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("action", {
    header: () => 'Action',
    cell: (info) => (
      <div>
        {info.getValue()}
      </div>
    ),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("delete", {
    header: () => 'Delete',
    cell: (info) => info.getValue(),  // Correct usage of getValue()
    footer: (info) => info.column.id,
  })
];

const img =
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804";

const img2 = "https://m.media-amazon.com/images/I/514T0SvwkHL._SL1500_.jpg";

const Products = () => {
  const [data, setArr] = useState<DataType[]>([
    {
      photo: <img src={img} alt="Shoes" />,
      name: "Puma Shoes Air Jordan 2023",
      price: 690,
      stock: 3,
      action: <Link to="/admin/product/sajknaskd">Manage</Link>,
      delete: (
        <button style={{
          width:"70px",
          textDecoration: 'none',
          backgroundColor: 'rgb(255 114 44 / 46%)',
          padding: '0.25rem 0.5rem',
          borderRadius: '10px',
        }} onClick={() => handleDelete(0)}>Delete</button>  
      )
    },
    {
      photo: <img src={img2} alt="Macbook" />,
      name: "Macbook",
      price: 232223,
      stock: 213,
      action: <Link to="/admin/product/sdaskdnkasjdn">Manage</Link>,
      delete: (
        <button style={{
          width:"70px",
          textDecoration: 'none',
          backgroundColor: 'rgb(255 114 44 / 46%)',
          padding: '0.25rem 0.5rem',
          borderRadius: '10px',
        }} onClick={() => handleDelete(1)}>Delete</button>  
      )
    },
  
  ]);

  const handleDelete = (index: number) => {
    const newData = [...data];
    newData.splice(index, 1);
    setArr(newData);
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>
        {TableHOC<DataType>(
          columns,
          data,
          "dashboard-product-box",
          "Products",
          true
        )}
      </main>
      <Link to="/admin/product/new" className="create-product-btn">
        <FaPlus />
      </Link>
    </div>
  );
}

export default Products;
