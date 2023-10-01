import React from "react";
import loginImage from "../image/loginImage.svg";
import { useState } from "react";
import config from "../config";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [form, setForm] = useState({ email: "" });
  const [formError, setFormError] = useState({ email: "" });

  const handleChange = (e) => {
    setFormError({ email: "" });
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    if (verification()) {
      try {
        const response = await axios.post(
          `${config.apiKey}forgot-password`,
          form
        );
        if (response.status === 200) {
          toast.success(response.data.message); // Assuming the message is within data
          setTimeout(() => {
            window.location.href = `${config.baseUrl}`;
          }, 2000);
        } else {
          toast.error(response.data.message); // Assuming the message is within data
        }
      } catch (error) {
        if (error.response && error.response.data) {
          console.log(error.response.data.message);
          toast.error(error.response.data.message);
        } else {
          console.log(error);
          toast.error("An unexpected error occurred.");
        }
      }
    }
  };

  const verification = () => {
    let emailError = "";

    if (form.email.length <= 0) {
      emailError = "Email is required";
    } else if (!isValidEmail(form.email)) {
      emailError = "Email is invalid";
    }
    setFormError({ email: emailError });

    return emailError.length === 0;
  };

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  return (
    <>
      <Toaster />
      <div className="bg-center w-screen m-auto px-3 pt-20 pb-12 lg:block xl:px-0 ">
        <div className="lg:grid max-w-7xl mx-auto  grid-cols-1  md:grid-cols-2  flex flex-col flex-col-reverse  PageBG rounded-xl shadow-2xl">
          <div className=" lg:rounded-br-none rounded-br-xl  lg:rounded-tl-xl  rounded-tl-none  rounded-bl-xl py-10 sm:py-12    flex  justify-center items-center flex-col  px-4 sm:px-20  md:px-36  lg:px-12 xl:px-24 bg-transparent ">
            <div className="  rounded-xl     flex  justify-center items-center flex-col w-full  ">
              <div className="my-4 w-full text-center">
                <h1 className="sm:text-3xl text-2xl  md:text-4xl font-bold text-gray-50">
                  Forgot Password
                </h1>
              </div>

              <div className="my-4  w-full text-center">
                <h1 className="sm:text-lg text-sm text-gray-100">
                  Forgot your password? No problem. Just let us know your email
                  address and we will email you a password reset link that will
                  allow you to choose a new one.{" "}
                </h1>
              </div>
              <div className="relative w-full min-w-[200px] h-16 my-4">
                <input
                  type="email"
                  className="peer w-full h-full text-white border-t-transparent bg-transparent text-blue-gray-100 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-100 placeholder-shown:border-t-gray-100 border focus:border-2  focus:border-t-transparent text-md px-3 py-3 rounded-md border-gray-100 focus:border-blue-500"
                  placeholder=" "
                  name="email"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                <label className="flex text-white w-full h-full select-none pointer-events-none absolute left-0 font-normal peer-placeholder-shown:text-gray-100 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-gray-100 transition-all -top-1.5 peer-placeholder-shown:text-[18px] text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[4.1] text-blue-gray-400 peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:border-blue-500 after:border-blue-gray-200 peer-focus:after:border-blue-500">
                  Email
                </label>
              </div>

              <div className=" pt-0 w-full my-3">
                <button
                  className="middle none font-sans font-bold center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none  sm:text-lg text-sm py-3 px-6 rounded-3xl bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] block w-full"
                  type="button"
                  onClick={(e) => {
                    submit(e);
                  }}
                >
                  Email Password Reset Link
                </button>

                <p className="antialiased font-sans text-md font-light leading-normal text-inherit mt-6 flex justify-end text-gray-100">
                  Don't have an account?
                  <span className="block antialiased font-sans  leading-normal  text-gray-100 underline ml-1 font-bold cursor-pointer">
                    <Link to="/signUp">Signup </Link>
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="  rounded-tr-xl  lg:rounded-tl-none rounded-tl-xl lg:rounded-br-xl  rounded-br-none  py-10 sm:py-12   lg:flex  justify-center items-center flex-col hidden space-x-4 ">
            <img src={loginImage} alt="pngImage" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
