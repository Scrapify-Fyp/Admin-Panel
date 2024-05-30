// import { ReactElement, useState } from "react";
// import AdminSidebar from "../components/AdminSidebar"
// import TableHOC from "../components/TableHOC"
// import { createColumnHelper } from "@tanstack/react-table";
// import { FaTrash } from "react-icons/fa";

// interface DataType {
//   avatar: ReactElement;
//   name: string;
//   email: string;
//   gender: string;
//   role: string;
//   action: ReactElement;
// }

// const columnHelper = createColumnHelper<DataType>();
//   const columns = [
//     columnHelper.accessor("avatar", {
//       header: () => 'Avatar',
//       cell: (info) => info.getValue(),
//       footer: (info) => info.column.id,
//     }),
//     columnHelper.accessor("name", {
//       header: () => 'Name',
//       cell: (info) => info.getValue(),
//       footer: (info) => info.column.id,
//     }),
//     columnHelper.accessor("email", {
//       header: () => "Email",
//       cell: (info) => info.renderValue(),
//       footer: (info) => info.column.id,
//     }),
//     columnHelper.accessor("role", {
//       header: () => 'Role',
//       cell: (info) => info.getValue(),
//       footer: (info) => info.column.id,
//     }),
//     columnHelper.accessor("action", {
//       header: () => 'Action',
//       cell: (info) => info.getValue(),
//       footer: (info) => info.column.id,
//     })
//   ];

//   const img = "https://randomuser.me/api/portraits/women/54.jpg";
// const img2 = "https://randomuser.me/api/portraits/women/50.jpg";

//   const arr: DataType[] = [
//     {
//       avatar: (
//         <img
//           style={{
//             borderRadius: "50%",
//           }}
//           src={img}
//           alt="Shoes"
//         />
//       ),
//       name: "Areesha Khan",
//       email: "areesha.ak30@gmail.com",
//       gender: "female",
//       role: "user",
//       action: (
//         <button>
//           <FaTrash />
//         </button>
//       ),
//     },
  
//     {
//       avatar: (
//         <img
//           style={{
//             borderRadius: "50%",
//           }}
//           src={img2}
//           alt="Shoes"
//         />
//       ),
//       name: "Javeria Alam",
//       email: "javeriaalam21@gmail.com",
//       gender: "female",
//       role: "user",
//       action: (
//         <button>
//           <FaTrash />
//         </button>
//       ),
//     }, {
//       avatar: (
//         <img
//           style={{
//             borderRadius: "50%",
//           }}
//           src={img2}
//           alt="Shoes"
//         />
//       ),
//       name: "Javeria Alam",
//       email: "javeriaalam21@gmail.com",
//       gender: "female",
//       role: "user",
//       action: (
//         <button>
//           <FaTrash />
//         </button>
//       ),
//     }, {
//       avatar: (
//         <img
//           style={{
//             borderRadius: "50%",
//           }}
//           src={img2}
//           alt="Shoes"
//         />
//       ),
//       name: "Javeria Alam",
//       email: "javeriaalam21@gmail.com",
//       gender: "female",
//       role: "user",
//       action: (
//         <button>
//           <FaTrash />
//         </button>
//       ),
//     }, {
//       avatar: (
//         <img
//           style={{
//             borderRadius: "50%",
//           }}
//           src={img2}
//           alt="Shoes"
//         />
//       ),
//       name: "Javeria Alam",
//       email: "javeriaalam21@gmail.com",
//       gender: "female",
//       role: "user",
//       action: (
//         <button>
//           <FaTrash />
//         </button>
//       ),
//     }, {
//       avatar: (
//         <img
//           style={{
//             borderRadius: "50%",
//           }}
//           src={img2}
//           alt="Shoes"
//         />
//       ),
//       name: "Javeria Alam",
//       email: "javeriaalam21@gmail.com",
//       gender: "female",
//       role: "user",
//       action: (
//         <button>
//           <FaTrash />
//         </button>
//       ),
//     }, {
//       avatar: (
//         <img
//           style={{
//             borderRadius: "50%",
//           }}
//           src={img2}
//           alt="Shoes"
//         />
//       ),
//       name: "Javeria Alam",
//       email: "javeriaalam21@gmail.com",
//       gender: "female",
//       role: "user",
//       action: (
//         <button>
//           <FaTrash />
//         </button>
//       ),
//     }, {
//       avatar: (
//         <img
//           style={{
//             borderRadius: "50%",
//           }}
//           src={img2}
//           alt="Shoes"
//         />
//       ),
//       name: "Javeria Alam",
//       email: "javeriaalam21@gmail.com",
//       gender: "female",
//       role: "user",
//       action: (
//         <button>
//           <FaTrash />
//         </button>
//       ),
//     },
//   ];
  

// function Customers() {
//   const [data,setArr] = useState<DataType[]>(arr)

//     return (
//       <div className="admin-container">
//         <AdminSidebar />
//         <main>
//         {TableHOC<DataType>(
//             columns,
//             data,
//             "dashboard-product-box",
//             "Customers",
//             true
//           )}
//         </main>
//       </div>
//     )
//   }
  
//   export default Customers


import { ReactElement, useState, useEffect } from "react";
import AdminSidebar from "../components/AdminSidebar";
import TableHOC from "../components/TableHOC";
import { createColumnHelper } from "@tanstack/react-table";
import axios from 'axios';
import { FaTrash } from "react-icons/fa";
import { Link } from 'react-router-dom';

interface DataType {
  _id: string;
  avatar: ReactElement;
  name: string;
  email: string;
  role: string;
  manage: ReactElement; // Added manage column
  action: ReactElement;
}

const columnHelper = createColumnHelper<DataType>();
const columns = [
  columnHelper.accessor("avatar", {
    header: () => 'Avatar',
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("name", {
    header: () => 'Name',
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("email", {
    header: () => "Email",
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("role", {
    header: () => 'last Login Date/time',
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("manage", {  // Manage column definition
    header: () => 'Manage',
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("action", {
    header: () => 'Action',
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  })
];

function Customers() {
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3002/users')
      .then(response => {
        const users = response.data.map((user: any, index:any) => ({
          avatar: (
            <img
              style={{
                borderRadius: "50%",
              }}
              src={
                user?.imageUrl ||
                "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
              }
              alt={user.name}
            />
          ),
          name: user.firstName,
          email: user.email,
          role: user.lastLoginDate,

          manage: (
            <Link to={`/admin/customer/${user._id}`}>
              <button
                style={{
                  width: "80px",
                  textDecoration: 'none',
                 // backgroundColor: 'rgba(44, 104, 255, 0.455)',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '10px',
                }}
              >
                Manage
              </button>
            </Link>
          ),
          action: (
            <button
              onClick={() => handleDelete(index,user._id)} 
              style={{
                width: "70px",
                textDecoration: 'none',
                backgroundColor: 'rgb(255 114 44 / 46%)',
                padding: '0.25rem 0.5rem',
                borderRadius: '10px',
              }}
            >
              <FaTrash />
            </button>
          ),
        }));
        setData(users);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        setLoading(false);

      });
  }, []);

  const handleDelete = (index: number, userId: string) => {
    axios.delete(`http://localhost:3002/users/${userId}`)
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
        {TableHOC<DataType>(
          columns,
          data,
          "dashboard-product-box",
          "Customers",
          true,
          loading
        )}
      </main>
    </div>
  );
}

export default Customers;
