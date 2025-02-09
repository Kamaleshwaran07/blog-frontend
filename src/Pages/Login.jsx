import axios from "axios";
import { useFormik } from "formik";
import React, { useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import * as yup from "yup";
import yuppassword from "yup-password";
import { myContext } from "../Context/Authcontext.jsx";
const Login = () => {
    
  
  const navigate = useNavigate();
  yuppassword(yup);
  const schema = yup.object().shape({
    username: yup
      .string().required("username is required"),

    password: yup
      .string()
      .min(6, "Password must contain atleast 6 characters")
      .required("Password is required"),
  });
  const {login} = useContext(myContext)
  const loginformik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
       await login(values)
       setTimeout(() => {
        
         navigate("/")
       }, 1000);
      } catch (error) {
        toast("Server Error");
      }
    },
  });

  return (
    <section
      className="bg-[#b9e7e7] h-screen flex flex-col justify-center items-center"
      id="login"
    >
      <Toaster />
      <div className=" ">
        <h2 className=" text-center font-bold text-3xl text-teal-500 mb-12">
          Login
        </h2>
        <form
          onSubmit={loginformik.handleSubmit}
          className="gap-5 flex flex-col p-16  justify-center items-center bg-white"
        >
          <input
            type="text"
            className="border-b border-gray-500 w-full p-2.5"
            onChange={loginformik.handleChange}
            name="username"
            value={loginformik.values.username}
            placeholder="username"
            required
          />

          <input
            type="password"
            className="border-b border-gray-500 w-full p-2.5"
            onChange={loginformik.handleChange}
            name="password"
            value={loginformik.values.password}
            placeholder="password"
            required
          />
          {loginformik.errors && (
            <p className="text-red-500">
              {loginformik.errors?.email ||
                loginformik.errors?.username ||
                loginformik.errors?.password}
            </p>
          )}

          <button
            type="submit"
            className="p-2.5 border-none bg-teal-500 text-white w-full"
          >
            Login
          </button>
          <span className="">
            Don't have an account?{" "}
            <Link to={"/signup"} className="underline text-blue-500">
              Signup here
            </Link>
          </span>
        </form>
      </div>
    </section>
  );
};

export default Login;
