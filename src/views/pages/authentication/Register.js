import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import useJwt from '../../../auth/jwt/useJwt'
import { Slide, toast } from "react-toastify";
import ToastContent from "@src/views/components/toast/Toast.js";
import { useHistory } from "react-router-dom";

const Register = () => {
  /* State Vars */
  const [isLoading, setLoading] = React.useState(false);

  /* Routes vars */
  const history = useHistory();

  /* Formik Vars */
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().min(5, 'Must be at least 5 characters').max(20, 'Must be less than 20 characters').matches(/^\S*$/, 'Username cannot contain spaces').required('VALIDATION_MESSAGES.required'),
      password: Yup.string().required('VALIDATION_MESSAGES.required'),
    }),
    onSubmit: (values) => {
      handleUserRegister(values);
    },
  });

  /* Function to handle Registration */
  const handleUserRegister = async (data) => {
    if (Object.values(data).every(field => field.length > 0)) {
      const apiRes = await useJwt.register({ email: data.email, password: data.password, username: data.username });
      if (apiRes.data.status) {
        toast.success(<ToastContent status="Success" message={'Account created successfully ! You can login'} />, { transition: Slide, hideProgressBar: true, autoClose: 2000, position: toast.POSITION.BOTTOM_CENTER })
        history.push('/login');
      } else {
        toast.error(<ToastContent status="Error" message={apiRes.data.message} />, { transition: Slide, hideProgressBar: true, autoClose: 2000, position: toast.POSITION.BOTTOM_CENTER})
      }
    } 
  };

  return (
    <div className="container-fluid">
      <div className="flex items-center justify-center min-h-screen bg-gray-100 h-full">
        <div className="w-full xl:w-1/2 lg:w-1/2 md:w-1/2 h-5/6 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-center">Create Account</h2>
          <form onSubmit={formik.handleSubmit}>
            
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                User Name
              </label>
              <input
                type="text"
                id="username"
                name="username"
                autoComplete="off"
                className={`mt-1 px-4 py-2 w-full  rounded-lg  border-2 ${formik.errors.username && formik.touched.username
                    ? "border-red-800"
                    : "border-gray-800"
                  }`}
                value={formik.values.username}
                onChange={formik.handleChange}
              />
              {formik.errors.username && formik.touched.username && (
                <span className="text-red-800">{formik.errors.username}</span>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                autoComplete="off"
                className={`mt-1 px-4 py-2 w-full  rounded-lg  border-2 ${formik.errors.password && formik.touched.password
                    ? "border-red-800"
                    : "border-gray-800"
                  }`}
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.errors.password && formik.touched.password && (
                <span className="text-red-800">{formik.errors.password}</span>
              )}
            </div>
            <div>
              <button
                disabled={isLoading}
                type="submit"
                className="w-full  py-2 px-4 border bg-gray-900 text-white rounded-lg hover:bg-gray-100 hover:border-gray-800 hover:text-gray-800"
              >
                Create Account
              </button>
            </div>
          </form>
          <p className="text-blue-500 text-center d-block mx-auto w-100 mt-5"><Link to='/login'> Already have an account ? Login here </Link></p>

        </div>
      </div>
    </div>
  );
};

export default Register;
