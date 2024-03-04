import React, { useContext, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import {  Input } from 'antd';
import Navbar from "../../Layouts/Navbar/Navbar";
import ControlContext from "../../Context/ControlContext/ControlContext";
import AuthenContext from "../../Context/Authencontext/AuthenContext";

const Home = () => {
  const [isDrag, setIsDrag] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [type, setType] = useState();
  const {
    allControl,
    controlData,
    setControlData,
    handlePostSubmit,
    handlePostUpdate,
    handlePostDelete
  } = useContext(ControlContext);
  
  const { handleUpdatePassword, setNewPassword, newPassword } =
    useContext(AuthenContext);
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDrag(true);
    setIsOpenModal(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDrag(false);
    setIsOpenModal(true);
    setControlData({ text: type });
  };

  const targetClassName = `mx-60 mt-4 p-4 bg-white rounded-lg shadow-lg border-dashed border-2 min-h-60 z-40 w-2/4 h-2/3 transition-transform -translate-x-full sm:translate-x-0 ${
    isDrag ? "border-black" : "border-indigo-300"
  }`;

  const handleAction = async() => {
    if (type === "text") {
     await handlePostSubmit();
     window.location.reload();
    } else if (type === "password") {
     await handleUpdatePassword(newPassword);
    }
    setIsOpenModal(false)
  };
  const handleChangePassword = (event) => {
    setNewPassword(event.target.value);
  };
  const handleClickDelete= async(controlId) =>{
    await handlePostDelete(controlId)
    window.location.reload();
  }
  return ( 
    <>
      <div className="w-full">
        {isOpenModal ? (
          <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center opacity-85 h-full w-full z-50 justify-center">
            <div className="bg-slate-50 opacity-90 w-1/4 h-2/4">
              <div>
                <Input
                  type="text"
                  className="w-full mt-2 p-4 rounded-lg shadow-lg border-dashed bg-orange-200 text-black-100 font-bold"
                  value={type === "text" ? controlData.text : newPassword}
                  onChange={(e) =>
                    type === "text"
                      ? setControlData({ text: e.target.value })
                      : handleChangePassword(e)
                  }
                />
              </div>

              <div className="my-60 mx-20">
                <button
                  onClick={handleAction}
                  data-modal-hide="default-modal"
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {type === "text" ? "Đăng" : "Cập nhật"}
                </button>
                <button
                  onClick={handleDragOver}
                  data-modal-hide="default-modal"
                  type="button"
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        ) : null}
        <div className="flex items-center ">
          <Navbar setType={setType} />
          <div
            className={targetClassName}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {allControl?.map((control) => (
              <div className="border  mt-2 px-2 font-semibold bg-indigo-50 rounded-3xl flex justify-between" key={control.id}>
                <p>{control.text}</p>
                <FaRegTrashCan className="mt-1" onClick={()=> handleClickDelete(control.id)} />
              </div>
            ))}
          </div>
         
        </div>
      </div>
     
    </>
  );
};

export default Home;
