import React, { createContext } from "react";
import { createBrowserRouter, RouterProvider, Route, Outlet } from "react-router";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Write from "./Pages/Write";
import Home from "./Pages/Home";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Single from "./Pages/Single";


const Layout = ()=>{
  return(
    <>
    <Header />
    <Outlet />
    <Footer />
    </>
  )
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children:[
      {path:"/", element: <Home />},
      {path:"/write", element:<Write />},
      {path:"/post/:id", element:<Single />},
    ]
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> }
]);

const App = () => {
  return (
    <div className="w-[1280px] mx-auto">
    

      <RouterProvider router={router} />
     
    </div>
  );
};



export default App;
