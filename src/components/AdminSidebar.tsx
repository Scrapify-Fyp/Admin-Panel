import { IconType } from "react-icons";
import { Link, Location, useLocation } from "react-router-dom";

import { AiFillFileText } from "react-icons/ai";
import { IoIosPeople } from "react-icons/io";
import {
  RiDashboardFill,
  RiShoppingBag3Fill,
} from "react-icons/ri";

const AdminSidebar = () => {

  const dashboardlinksText = [
    "Dashboard",
    "Product",
    "Users",
    "Transaction",
    "Settings",
    "Account",
  ];

  const dashboardIcons = [
    RiDashboardFill,
    RiShoppingBag3Fill,
    IoIosPeople,
    AiFillFileText,
  ];

  const dashboardlinksUrl = [
    "/admin/dashboard",
    "/admin/product",
    "/admin/customer",
    "/admin/transaction",
  ];

  const location = useLocation();

  return (
    <aside>
      <h2 style={{ color: '#ffffff' }}>Scrapify</h2>
      <Div
        divTitle={"Dashboard"}
        location={location}
        text={dashboardlinksText}
        url={dashboardlinksUrl}
        Icon={RiDashboardFill} 
      />
    </aside>
  );
};

interface divContent {
  divTitle: string;
  location: Location;
  text: string[];
  url: string[];
  Icon: IconType;
}

const Div = ({ divTitle, location, text, url, Icon }: divContent) => {

  return (
    <div>
      <h5>{divTitle}</h5>
      <ul>
        {text.map((element, index) => {
          return (
            <Li
              text={element}
              url={url[index]}
              Icon={Icon} // Passing the same Icon to all Li components
              location={location}
              key={element}
            />
          );
        })}
      </ul>
    </div>
  );
};

interface LiProps {
  text: string;
  url: string;
  Icon: IconType;
  location: Location;
}
const Li = ({ text, url, Icon, location }: LiProps) => {
  return (
    <li
      style={{
        backgroundColor: location.pathname.includes(url)
          ? "#c7a36f"
          : "#FFF",
      }}
    >
      <Link to={url}>
        <Icon /> {text}
      </Link>
    </li>
  );
};

export default AdminSidebar;
