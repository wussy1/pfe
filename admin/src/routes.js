/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import Icons from "views/Icons.js";
import Maps from "views/Maps.js";
import Notifications from "views/Notifications.js";
import Upgrade from "views/Upgrade.js";
import Products from "views/Products";
import Categories from "views/Categories";
import ProductsOrders from "views/ProductsOrders";

const dashboardRoutes = [
  
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/users",
    name: "Users",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/services",
    name: "services",
    icon: "nc-icon nc-notes",
    component: TableList,
    layout: "/admin",
  },
  {
    path: "/products",
    name: "Products",
    icon: "nc-icon nc-notes",
    component: Products,
    layout: "/admin",
  },
  {
    path: "/categories",
    name: "Categories",
    icon: "nc-icon nc-notes",
    component: Categories,
    layout: "/admin",
  },
  {
    path: "/OrdProducts",
    name: "Products Orders",
    icon: "nc-icon nc-notes",
    component: ProductsOrders,
    layout: "/admin",
  },
  {
    path: "/OrdServices",
    name: "Services Orders",
    icon: "nc-icon nc-notes",
    component: TableList,
    layout: "/admin",
  },
  {
    path: "/ads",
    name: "ads",
    icon: "nc-icon nc-notes",
    component: TableList,
    layout: "/admin",
  },
  
];

export default dashboardRoutes;
