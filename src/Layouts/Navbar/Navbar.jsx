import React, { useState } from "react";
import { RxFileText } from "react-icons/rx";
import { RiCheckboxMultipleLine } from "react-icons/ri";
import { RiLockPasswordFill } from "react-icons/ri";

const Navbar = ({setType}) => {

  const control = [
    {
      key: 'text',
      value:'text'
    
    },
    {
      key: 'password',
      value: "password",
    },
  ];
  const handleDragStart = (e, type) => {
   setType(type)
    e.dataTransfer.setData("text/plain", type);
  };

  return (
    <aside
      id="logo-sidebar"
      className="top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-100 dark:bg-gray-800">
        <ul className="space-y-2 font-medium text-2xl">
          {
            control.map((item,index)=>
            <li
            key={item.key}
            draggable={true}
            id={item.key}
            onDragStart={(e) => handleDragStart(e, item.key)}
          >
            <p className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group cursor-pointer">
              <svg
                className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 21"
              >
                <RxFileText className="text-xl" />
              </svg>
              <span className="ms-3">{item.value}</span>
            </p>
          </li>
            )
          }
         

       
        </ul>
      </div>
    </aside>
  );
};

export default Navbar;
