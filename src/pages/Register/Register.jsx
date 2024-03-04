import React, { useContext, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import AuthenContext from '../../Context/Authencontext/AuthenContext'
import { useFormik } from 'formik'
import authAPI from '../../apis/authAPI'

const Register = () => {
  const [loading, setLoading] = useState(false)
    const [error,setError] = useState(null)
    const navigate = useNavigate();
    const {handleLogin} = useContext(AuthenContext)
    const {auth} = useContext(AuthenContext)
    console.log(auth)
    const {isAuthenticated} = auth
    const formik = useFormik({
        initialValues: {
            username:'',
            email:'',
            password:'',
        },
        onSubmit: async (values) => {
            try {
                setLoading(true)
                setError(null)
                const response = await authAPI.register(values)
             await  handleLogin();
                navigate('/login')
            } catch (error) {
                console.log(error);
                setError(error.response.data.message)
            } finally{
                setLoading(false)
            }
        }
    })
    const {handleSubmit, handleChange, values} = formik
    if(isAuthenticated) {
        return <Navigate to="/"/>
    }
    return ( 
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-14 w-auto"
          src="https://i.pinimg.com/236x/08/17/15/0817158f3a05c0d62de647c28f4cde54.jpg"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Register to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form  onSubmit={handleSubmit} className="space-y-6" action="#" method="POST">
        <div>
            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
              Username 
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="username"
                autoComplete="username"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange} 
                value={values.username}
              />
            </div>
          </div>
   
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email 
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange} 
                value={values.email}
              />
            </div>
          </div>
   
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>

            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange} 
                value={values.password}
              />
                 {error}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
            {loading ? 'Loading...': 'Register'}
            </button>
          </div>
          <p className="mt-10 text-center text-sm text-gray-500">
        <Link
          to={"/login"}
          className="font-semibold leading-6 text-red-600 hover:text-red-500"
        >
          You have an account
        </Link>
      </p>
        </form>

     
      </div>
    </div>
     );
}

export default Register