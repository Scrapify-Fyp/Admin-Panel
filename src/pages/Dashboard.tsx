import { useState, useEffect } from 'react';
// import "./Dashboard.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import { BsSearch } from "react-icons/bs";
import { FaRegBell } from "react-icons/fa";
import { HiTrendingUp, HiTrendingDown } from "react-icons/hi";
import data from "../assets/data.json";
import { BarChart } from "../components/Charts";
import { defaultData } from "../assets/rootData";
import DashboardTable from "../components/DashboardTable";
import { useAuth } from './auth';  
import { logout } from "./Redux/actions/authaction"; 
import axios from 'axios';

function Dashboard() {
  const navigate = useNavigate();
   const dispatch = useDispatch();
  const admin = useAuth(); 
  const [dropdownOpen, setDropdownOpen] = useState(false); 
  const [usersCount, setUsersCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [rendumnumbersuser, setrendumnumbersuser] = useState(true);
  const [rendumnumberproduct, setrendumnumbersproduct] = useState(true);
  const [aCount, setaCount] = useState(0);
  
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const getRandomNumber = (min:any, max:any) => {
    if (min >= max) {
      throw new Error("Min should be less than max");
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  setInterval(() => {
    setaCount(getRandomNumber(1000, 9000));
  }, 50);
  

    useEffect(() => {
    const fetchData = () => {
      axios
        .get(`http://localhost:3002/products/count`)
        .then((res) => {
          setProductsCount(res.data.count);
          setrendumnumbersproduct(false);
        })
        .catch((error) => {
          console.error("Error fetching product:", error);
        });
  
      axios
        .get(`http://localhost:3002/users/count`)
        .then((res) => {
          setUsersCount(res.data.count);
          setrendumnumbersuser(false);
        })
        .catch((error) => {
          console.error("Error fetching product:", error);
        });
    };
  
    setTimeout(fetchData, 1000); 
  }, []);
  
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen); 
  };


    return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="dashboard">
        <div className="bar">
          <BsSearch />
          <input type="text" placeholder="Search for data, users, docs" />
          <FaRegBell />

          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              onClick={toggleDropdown} // Toggle dropdown on button click
            >
              {admin?.username}
            </button>
            {dropdownOpen && ( // Conditionally render the dropdown menu
              <ul className="dropdown-menu show">
                <li><a className="dropdown-item" onClick={handleLogout}>Logout</a></li>
              </ul>
            )}
          </div>
        </div>

        {/* bar */}

        <section className="widget-container">
          <WidgetItem
            percent={40}
            amount={true}
            value={ rendumnumbersuser ? getRandomNumber(1000, 9000) :7854}
            heading="Revenue"
            color="rgb(0,115,255)"
          />
          <WidgetItem
            percent={-14}
            value={rendumnumbersuser ? getRandomNumber(1000, 9000) : usersCount.toString().padStart(4, '0')}
            heading="Users"
            color="rgb(0 198 202)"
          />

          <WidgetItem
            percent={80}
            value={ rendumnumbersuser ? getRandomNumber(1000, 9000) :9860}
            heading="Transactions"
            color="rgb(255 196 0)"
          />
          <WidgetItem
            percent={30}
            value={rendumnumberproduct ? getRandomNumber(1000, 9000) : productsCount.toString().padStart(4, '0')}
            heading="Products"
            color="rgb(76 0 255)"
          />
        </section>
        {/* widget-container */}

        <section className="graph-container">
          <div className="revenue-chart">
            <h2>Revenue & Transaction</h2>
            {/* Graph here */}
            <BarChart
              // horizontal={true}
              data_2={[300, 144, 433, 655, 237, 755, 190]}
              data_1={[200, 444, 343, 556, 778, 455, 990]}
              title_1="Revenue"
              title_2="Transaction"
              bgColor_1="rgb(0,115,255)"
              bgColor_2="rgba(53,162,235,0.8)"
            />
          </div>

          <div className="dashboard-categories">
            <h2>View All</h2>
            <div>
              {data.categories.map((i) => (
                <CategoryItem
                  key={i.heading}
                  heading={i.heading}
                  value={i.value}
                  color={`hsl(${i.value * 4},${i.value}%,50%)`} // Pass the color prop
                />
              ))}
            </div>
          </div>
        </section>
        {/* graph-container */}

        <section className="transaction-container">
          <DashboardTable InputData={defaultData} />
        </section>
        {/* transaction-container */}
      </main>
    </div>
  );
}

interface WidgetItemProps {
  heading: string;
  value: number;
  percent: number;
  color: string;
  amount?: boolean;
}

const WidgetItem = ({
  heading,
  value,
  percent,
  color,
  amount = false,
}: WidgetItemProps) => (
  <article className="widget">
    <div className="widget-info">
      <p>{heading}</p>
      <h4>{amount ? `$${value}` : value}</h4>
      {percent > 0 ? (
        <span className="green">
          <HiTrendingUp /> +{percent}%{" "}
        </span>
      ) : (
        <span className="red">
          <HiTrendingDown /> {percent}%{" "}
        </span>
      )}
    </div>
    {/* widget-info */}

    <div
      className="widget-circle"
      style={{
        background: `conic-gradient(
        ${color} ${(Math.abs(percent) / 100) * 360}deg,
        rgb(255, 255, 255) 0
      )`,
      }}
    >
      <span
        style={{
          color,
        }}
      >
        {percent}%
      </span>
    </div>
    {/* widget-circle */}
  </article>
  // widget
);

interface CategoryItemProps {
  color: string;
  value: number;
  heading: string;
}

const CategoryItem = ({ color, value, heading }: CategoryItemProps) => (
  <div className="category-item">
    <h5>{heading}</h5>
    <strong style={{ color }}>{value}</strong>
  </div>
);

export default Dashboard;