import React, { useContext } from "react";
import Logo from "../assets/ShowmanLogo1.png"
import { Link } from "react-router";
import { myContext } from "../Context/Authcontext.jsx";
const Header = () => {
const {currentUser, logout} = useContext(myContext)

  return (
    <section className="" id="header">
      <div className="flex items-center" >
        <div className="logo w-32 h-32">
          <Link to={'/'} >
        <img  src={Logo} alt="logo" className="w-full h-full" />
          </Link>
        </div>
        <div className="links flex items-center gap-5 ml-auto">
          <Link className="text-xl font-light" to={'/?cat=art'}><h6>Art</h6></Link>
          <Link className="text-xl font-light" to={'/?cat=science'}><h6>Science</h6></Link>
          <Link className="text-xl font-light" to={'/?cat=technology'}><h6>Technology</h6></Link>
          <Link className="text-xl font-light" to={'/?cat=cinema'}><h6>Cinema</h6></Link>
          <Link className="text-xl font-light" to={'/?cat=design'}><h6>Design</h6></Link>
          <Link className="text-xl font-light" to={'/?cat=food'}><h6>Food</h6></Link>
          <span className="font-medium">{currentUser ? currentUser.username:""}</span>
          {currentUser ?
        <button type="button" className="w-16 p-1 border rounded bg-red-400 text-white hover:text-red-400 hover:bg-white hover:border-red-400" onClick={logout}>Logout</button>  
      :
      <Link to={'/login'} >Login</Link>  
      }
          <span className="w-14 bg-[#b6e9e9] h-14 hover:text-teal-500 hover:border-teal-500 hover:bg-white hover:border rounded-full flex items-center justify-center font-light "><Link className="text-xl font-light" to={'/write'}>Write</Link></span>
         
        </div>
      </div>
    </section>
  );
};

export default Header;
