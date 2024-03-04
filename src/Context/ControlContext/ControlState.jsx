import React, { useEffect, useState } from 'react'
import ControlContext from './ControlContext'
import authAPI from '../../apis/authAPI'

const ControlState = ({children}) => {
    const [allControl,setAllControl] = useState()
    const [controlData, setControlData] = useState({
        text:''
    })
    const handlePostSubmit = async (e) =>{
        // e.preventDefault();
        try {
            const response = await authAPI.createControl(controlData)
            console.log(response,'response text');
            setControlData({
                text:""
            })
        } catch (error) {
            console.log(error);
        }
    }

    const handlePostUpdate = async(controlId) =>{
        try {
            const {text} = controlData
            const updateControl = await authAPI.updateControl(`${controlId}`,{text})
        } catch (error) {
            console.log(error);
        }
    };
    const handlePostDelete = async(controlId) =>{
        try {
            const control = await authAPI.deleteControl(`${controlId}`);
            setAllControl((prev) => prev.filter((control) => control._id !== controlId));
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() =>{
        const fetchControl = async() =>{
            try {
                const response = await authAPI.getAllControl()
                if(response) {
                    setAllControl(response.data.data)
                }
                return response
            } catch (error) {
                console.log(error);
            }
        };
        fetchControl();
    },[])
  return (
   <ControlContext.Provider 
   value={{
    allControl,
    setAllControl,
    controlData,
    setControlData,
    handlePostSubmit,
    handlePostUpdate,
    handlePostDelete
   }}>
    {children}
   </ControlContext.Provider>
  )
}

export default ControlState