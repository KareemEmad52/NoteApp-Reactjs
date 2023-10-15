import style from "./Register.module.css";
import regsiterImage from "../../assets/images/register.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from 'yup'
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
export default function Register() {

  let navigate = useNavigate()
  let { SendDataToSignup } = useContext(UserContext)

  let validationSchema = Yup.object({
    name: Yup.string().required("UserName is Required").min(3, "UserName must be more than 3 characters").max(15, "UserName must be less than 15 characters"),
    email: Yup.string().required("Email is Required").email("Please enter a valid email"),
    password: Yup.string().required("Password is Required").matches(/^[A-Z]/, "Password must start with a uppercase character"),
    age: Yup.number().required("Age is Required").min(18, "you must be over 18"),
    phone: Yup.string().required("Phone is Required").matches(/^01[0125][0-9]{8}/, "Please Enter a valid egyption number")
  })

  let formik = useFormik({
    initialValues: {
      "name": "",
      "email": "",
      "password": "",
      "age": "",
      "phone": ""
    },
    validationSchema,
    onSubmit: async function (values) {
      let response = await SendDataToSignup(values);
      if (response.msg == "done") {
        navigate('/login')
      }
    }
  })
  return (
    <section className="min-vh-100 d-flex align-items-center justify-content-center">
      <div className={`${style.container} row`}>
        <figure className="col-md-8 m-0 p-md-0">
          <div className="image-container">
            <img src={regsiterImage} className="w-100" alt="Regsiter Image" />
          </div>
        </figure>
        <form className="col-md-4 d-flex flex-column justify-content-center px-5"
          onSubmit={formik.handleSubmit}
        >
          <h2 className="m-0 fw-bold font-Montserrat">Create an account</h2>
          <p className="mb-3">Let's get started for free</p>
          <div className="form-group d-flex flex-column gap-2 justify-content-center">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              name="name"
              id="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />

            {formik.errors.name && formik.touched.name ? <p className="error">{formik.errors.name}</p> : ""}

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

            <input
              type="text"
              inputMode="numeric"
              className="form-control"
              placeholder="Age"
              name="age"
              id="age"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.age}
            />

            {formik.errors.age && formik.touched.age ? <p className="error">{formik.errors.age}</p> : ""}

            <input
              type="tel"
              inputMode="numeric"
              className="form-control"
              placeholder="phone"
              name="phone"
              id="phone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
            />

            {formik.errors.phone && formik.touched.phone ? <p className="error">{formik.errors.phone}</p> : ""}

            <button type="submit" className="btn btn-main">
              Create account
            </button>
            <p>
              Already have account ?{" "}
              <Link to="/login" className="text-decoration-underline">
                Log in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
