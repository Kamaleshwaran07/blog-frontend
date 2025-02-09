import axios from "axios";
import { useFormik } from "formik";
import React, { useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import * as yup from "yup";
import yuppassword from "yup-password";
import checked from "../assets/checked.png";
import cross from "../assets/delete.png";
const Signup = () => {
  yuppassword(yup);
  const navigate = useNavigate();
  const schema = yup.object().shape({
    email: yup
      .string()
      .matches(
        /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
        "Invalid email"
      )
      .required("Email is required"),
    username: yup.string().required("Username is required"),
    password: yup
      .string()
      .min(6, "Password must contain atleast 6 characters")
      .required("Password is required"),
    repassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "")
      .required("Retyping your password cannot be skipped"),
  });
  const baseurl = useContext(myContext).baseurl;
  // console.log(baseurl)
  const signupformik = useFormik({
    initialValues: { email: "", username: "", password: "", repassword: "" },
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        const res = await axios.post(`${baseurl}/api/auth/register`, values);
        toast(res.data);
        navigate("/login");
        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    },
  });
  return (
    <section
      className="bg-[#b9e7e7] h-screen w- flex flex-col justify-center items-center"
      id="signup"
    >
      <Toaster />
      <div className=" ">
        <h2 className=" text-center font-bold text-3xl mb-12 text-teal-500">
          Signup
        </h2>
        <form
          onSubmit={signupformik.handleSubmit}
          className="gap-5 flex flex-col p-10  justify-center items-center bg-white"
        >
          <input
            type="email"
            className="border-b border-gray-500 w-full p-2.5"
            onChange={signupformik.handleChange}
            name="email"
            value={signupformik.values.email}
            placeholder="email"
            required
          />

          <input
            type="text"
            className="border-b border-gray-500 w-full p-2.5"
            onChange={signupformik.handleChange}
            name="username"
            value={signupformik.values.username}
            placeholder="username"
            required
          />

          <input
            type="password"
            className="border-b border-gray-500 w-full p-2.5"
            onChange={signupformik.handleChange}
            name="password"
            value={signupformik.values.password}
            placeholder="password"
            required
          />

          <input
            type="password"
            className="border-b border-gray-500 w-full p-2.5"
            onChange={signupformik.handleChange}
            name="repassword"
            value={signupformik.values.repassword}
            placeholder="Retype your password"
            required
          />
          {signupformik.values.repassword.length !== 0 ? (
            signupformik.values.password === signupformik.values.repassword ? (
              <span className="text-green-500 flex items-center gap-2 p-2 pb-0">
                <span>
                  <img src={checked} className="w-6" alt="" />
                </span>
                Password match
              </span>
            ) : (
              <span className="text-red-500 flex items-center gap-2 p-2 pb-0">
                <span>
                  <img src={cross} className="w-6" alt="" />
                </span>
                Password does not match
              </span>
            )
          ) : (
            <></>
          )}
          {signupformik.errors && (
            <p className="text-red-500">
              {signupformik.errors?.email ||
                signupformik.errors?.username ||
                signupformik.errors?.password ||
                signupformik.errors?.repassword}
            </p>
          )}

          <button
            type="submit"
            className={
              signupformik.values.password !== signupformik.values.repassword
                ? "p-2.5 border-none bg-teal-500 text-white w-full pointer-events-none"
                : "p-2.5 border-none bg-teal-500 text-white w-full"
            }
          >
            Signup
          </button>
          <span className="">
            Have an account?{" "}
            <Link to={"/login"} className="underline text-blue-500">
              Login here
            </Link>
          </span>
        </form>
      </div>
    </section>
  );
};

export default Signup;
