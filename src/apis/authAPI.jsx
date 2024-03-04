import axiosInstance from "./axiosInstance"
const authAPI = {
    login:(values) => axiosInstance.post("/auth/login",values),
    register:(values) => axiosInstance.post("/auth/register",values),
    authInfo:(values) => axiosInstance.get("/auth/me",values),
    //done
    updatePassword:(id,values) => axiosInstance.put(`/user/${id}`,values),
    getAllControl:(values) => axiosInstance.get("/control", values),
    createControl:(values) => axiosInstance.post(`/control`, values),
    updateControl:(controlId,values) => axiosInstance.put(`/control/${controlId}`,values),
    deleteControl:(controlId) => axiosInstance.delete(`/control/${controlId}`),
}

export default authAPI