import style from "./Login.module.css";
import LoginImage from "../../assets/images/login.webp";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup'
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import { useFormik } from "formik";

export default function Login() {
  let navigate = useNavigate()
  let { SendDataToLogin ,token  ,setToken } = useContext(UserContext)
  let [isLoading ,setIsLoading] = useState(false)

  

  let validationSchema = Yup.object({
    email: Yup.string().required("Email is Required").email("Please enter a valid email"),
    password: Yup.string().required("Password is Required").matches(/^[A-Z]/, "Password must start with a uppercase character"),
  })

  let formik = useFormik({
    initialValues: {
      "email": "",
      "password": "",
    },
    validationSchema,
    onSubmit: async function (values) {
      setIsLoading(true)
      let response = await SendDataToLogin(values);
      setIsLoading(false)
      console.log(response);
      if(response.msg == 'done'){
        localStorage.setItem('userToken' , `3b8ny__${response.token}`);
        setToken(response.token)
        
      }
    }
  })

  useEffect(()=>{
    if(token) navigate("/");
  },[token])

  return (
    <section className="min-vh-100 d-flex align-items-center justify-content-center">
      <div className={`${style.container} row`}>
        <figure className="col-md-8 m-0 p-md-0">
          <div className="image-container">
            <img src={LoginImage} className="w-100" alt="Regsiter Image" />
          </div>
        </figure>
        <form className="col-md-4 d-flex flex-column justify-content-center px-5"
        onSubmit={formik.handleSubmit}
        >
          <h2 className="m-0 fw-bold font-Montserrat">
            Welcome Back <i className="fa-solid fa-heart ms-0 text-main"></i>
          </h2>
          <p className="mb-3">
            Thanks for returning! Please sign in to access your account.
          </p>
          <div className="form-group d-flex flex-column gap-2 justify-content-center">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              name="email"
              id="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.errors.email && formik.touched.email ? <p className="error">{formik.errors.email}</p> : ""}

            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              id="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.errors.password && formik.touched.password ? <p className="error">{formik.errors.password}</p> : ""}


            <button type="submit" className="btn btn-main">
              {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : 'Login'}
            </button>
            <p>
              You don't have account yet ?
              <Link to="/signup" className="text-decoration-underline">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
