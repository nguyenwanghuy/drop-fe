import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthenContext from "../../Context/Authencontext/AuthenContext";


const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);


  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  // const handleIsNav = () => {
  //   setIsDropdownOpen(false);
  //   setIsNav(false);
  // };
  const navigate = useNavigate();
  const {handleLogout, auth:{isAuthenticated}} = useContext(AuthenContext)
  const {auth} = useContext(AuthenContext)
  const logOut = async() => {
    localStorage.removeItem('accessToken')
    await handleLogout();
    navigate('/login')
  }
  return (
    
    <nav className="bg-gray-600 h-20">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative  flex h-16 items-center justify-between">
     
          {/* ảnh */}
        {isAuthenticated ?(
            <div className="">
            {/* <!--  dropdown --> */}  
            <div className="">
              <div className="flex">
                <button
                  type="button"
                  className="relative flex rounded-full bg-gray-800 text-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 mt-5"
                  id="user-menu-button"
                  aria-expanded={isDropdownOpen ? "true" : "false"}
                  aria-haspopup="true"
                  onClick={handleDropdownClick}
                >
                  {/* <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">Open user menu</span> */}
                  <img
                    className="h-12 w-12 rounded-full"
                    src= 'https://i.pinimg.com/236x/3c/67/75/3c67757cef723535a7484a6c7bfbfc43.jpg'
                    alt=""
                  />
                </button>
                <div className="flex flex-col mx-3 mt-3">
                  <span className="text-gray-300 font-bold text-lg">
                   {auth.user.username}{" "}
                  </span>
                  <span className="text-gray-300">
                  <Link
                  to={"/"}
                  className="  hover:font-bold"
                  role="menuitem"
                  tabIndex="-1"
                  id="user-menu-item-2"
                  onClick={() => {
                    logOut();
                    // handleIsNav();
                  }}
                >
                  Sign out
                </Link>
                  </span>
                </div>
              </div>
           
            </div>
          </div>
        ):(
          <div className="flex space-x-4">
          <Link
            to="/login"
            className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-lg font-medium mt-5"
          >
            Đăng nhập
          </Link>
        </div>
        )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
