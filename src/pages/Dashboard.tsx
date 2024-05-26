import React from "react";
// import "./Dashboard.css"
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import { BsSearch } from "react-icons/bs";
import { FaRegBell } from "react-icons/fa";
import { HiTrendingUp, HiTrendingDown } from "react-icons/hi";
import data from "../assets/data.json";
import { BarChart } from "../components/Charts";
import { defaultData } from "../assets/rootData";
import DashboardTable from "../components/DashboardTable";
import { RootState } from "./Redux/store"; // Assuming you have this type for the root state
import { logout } from "./Redux/actions/authaction"; // Action to logout

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user); // Access user from Redux

  const handleLogout = () => {
    dispatch(logout());
    navigate("/admin/Login");
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="dashboard">
        <div className="bar">
          <BsSearch />
          <input type="text" placeholder="Search for data, users, docs" />
          <FaRegBell />
          <div className="user-dropdown">
            <p className="user-button">
              {user?.username} {/* Display username */}
            </p>
            <div className="user-dropdown-content">
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>

        {/* bar */}

        <section className="widget-container">
          <WidgetItem
            percent={40}
            amount={true}
            value={340000}
            heading="Revenue"
            color="rgb(0,115,255)"
          />
          <WidgetItem
            percent={-14}
            value={400}
            heading="Users"
            color="rgb(0 198 202)"
          />
          <WidgetItem
            percent={80}
            value={23000}
            heading="Transactions"
            color="rgb(255 196 0)"
          />
          <WidgetItem
            percent={30}
            value={1000}
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
