import React from "react";
import signUplogo from "../image/signup.svg";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import config from "../config";
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";

function Signup() {
  var x = localStorage.getItem("token");
  if(x){
    window.location.href = `${config.baseUrl}Dashboard`
  }

  const [form, setForm] = useState({ firstName: '', lastName: '', username: '', email: '', password: '', confirmPassword: '', phoneNumber: '', country: '' });
  const [formError, setFormError] = useState({ firstName: false, lastName: false, username: false, email: false, password: false, confirmPassword: false, phoneNumber: false, country: false });
 const [errorAlert,setErrorAlert] = useState(false)
 const [check,setCheck] = useState(false)

  const handleChange = (e) => {
    setErrorAlert(true)

    setFormError({ firstName: false, lastName: false, username: false, email: false, password: false, confirmPassword: false, phoneNumber: false, country: false })
    setForm({ ...form, [e.target.name]: e.target.value })
  }

const handleCheck=()=>{
  setCheck(!check)
}
  
const signUp=async(e)=>{
  e.preventDefault()
  try{
  let verify = verification()
  if(verify){
    setErrorAlert(true)
    
    
    if(!check){
      alert("agree to tearms and conditions")
      return
    }
    let data=form
    const response = await axios.post(
      `${config.apiKey}signup`,
      data
    );
    console.log(response)
    if(response.status==201){
      toast.success(response.data.message)
      setTimeout(() => {
        window.location.href = `${config.baseUrl}`
    }, 2000);
    }else{
      toast.error(response.response.data.message)

    }
  }
  }catch(error){
    console.log(error.response.data.message)
    toast.error(error.response.data.message)

  }
}

// const verification=()=>{
//   let firstNameError=''
//   let lastNameError=''
//   let usernameError=''
//   let emailError='';
//   let passwordError='';
//   let confirmPasswordError='';
//   let countryError='';
//   let phoneNumberError=''

//   if(form.firstName.length<=0){
//     firstNameError='First name is Required'
//   }  
//   if(form.lastName.length<=0){
//     lastNameError='Last name is Required'
//   }
//   if(form.username.length<=0){
//     usernameError='User name  is Required'
//   }  
//   if(form.password.length<=0){
//   passwordError='Password is Required'
//   }
//   if(form.email.length<=0){
//     emailError='Email is Required'
//   }  
//   if(form.confirmPassword.length<=0){
//     confirmPasswordError='Confirm password is Required'
//   }
//   if(form.country.length<=0){
//     countryError='Country is Required'
//   }  
//   if(form.phoneNumber.length<=0){
//     phoneNumberError='Phone Number is Required'
//   }
//   if(form.confirmPassword !== form.password){
//     confirmPasswordError='Password and Confirm password is not match'
//   }
//   if(form.phoneNumber.length>10){
//     phoneNumberError='Phone Number is invalid'
//   }
//   if(!isValidEmail(form.email)){
//     emailError='Email is not invalid'
//   }
  
//   setFormError({firstName:firstNameError,lastName:lastNameError,username:usernameError,email:emailError,password:passwordError,confirmPassword:confirmPasswordError,country:countryError,phoneNumber:phoneNumberError})


//   if(emailError.length>0 || passwordError.length>0 || firstNameError.length>0 || lastNameError.length>0 || usernameError.length>0 || phoneNumberError.length>0 || countryError.length>0){
//     setErrorAlert(true)
//     return false
//   }
//   return true
// }
const verification=()=>{
  let firstNameError=false
  let lastNameError=false
  let usernameError=false
  let emailError=false;
  let passwordError=false;
  let confirmPasswordError=false;
  let countryError=false;
  let phoneNumberError=false
  

  if(form.firstName.length<=0){
    firstNameError=true
  }  
  if(form.lastName.length<=0){
    lastNameError=true
  }
  if(form.username.length<=0){
    usernameError=true
  }  
  if(form.password.length<=0){
  passwordError=true
  }
  if(form.email.length<=0){
    emailError=true
  }  
  if(form.confirmPassword.length<=0){
    confirmPasswordError=true
  }
  if(form.country.length<=0){
    countryError=true
  }  
  if(form.phoneNumber.length<=0){
    phoneNumberError=true
  }
  if(form.confirmPassword !== form.password){
    confirmPasswordError=true
  }
  if(form.phoneNumber.length>10 && form.phoneNumber.length<10){
    phoneNumberError=true
  }
  if(!isValidEmail(form.email)){
    emailError=true
  }
  
  setFormError({firstName:firstNameError,lastName:lastNameError,username:usernameError,email:emailError,password:passwordError,confirmPassword:confirmPasswordError,country:countryError,phoneNumber:phoneNumberError})


  if(emailError || passwordError || firstNameError || lastNameError || usernameError || phoneNumberError || countryError){
    setErrorAlert(false)
    return false
  }
  return true
}

function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}
  return (
    <>
      <Toaster />

      <div className="bg-center w-screen m-auto px-3 pt-20 pb-12 lg:block xl:px-0 ">
        <div className="lg:grid max-w-7xl mx-auto  grid-cols-1  md:grid-cols-2  flex flex-col PageBG rounded-xl shadow-2xl ">
          <div className=" rounded-tl-xl lg:rounded-tr-none rounded-tr-xl lg:rounded-bl-xl rounded-bl-none py-10 sm:py-12   lg:flex hidden  justify-center items-center flex-col space-x-4  ">
            <img src={signUplogo} alt="pngImage" />

          </div>
          <div className=" rounded-br-xl  lg:rounded-tr-xl   rounded-tr-none  lg:rounded-bl-none rounded-bl-xl  py-10 sm:py-12    flex  justify-center items-center flex-col  px-4  md:px-12  bg-transparent ">
            <div className="  rounded-xl     flex  justify-center items-center flex-col w-full ">
              <div className=" w-full text-start">
                <h1 className="sm:text-3xl text-2xl  md:text-4xl font-bold text-gray-50">
                  Create your Account
                </h1>
              </div>

              <div className="my-4  w-full text-start ">
                <h1 className="md:text-lg sm:text-sm text-xs text-gray-100 ">
                  Start trading in seconds. Already have an account?{" "}
                  <span className=" antialiased font-sans  leading-normal text-gray-100 underline ml-1 font-bold cursor-pointer">

                    <Link to="/">login here</Link>
                  </span>
                </h1>
              </div>

              <div className="sm:grid w-full mx-auto  grid-cols-1  sm:grid-cols-2  flex flex-col  gap-2   space-y-4">
                <div className="relative w-full min-w-[200px] h-16  my-4">
                  <input
                    type="text"
                    className="peer w-full h-full text-white border-t-transparent bg-transparent text-blue-gray-100 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-100 placeholder-shown:border-t-gray-100 border focus:border-2  focus:border-t-transparent text-md px-3 py-3 rounded-md border-gray-100 focus:border-blue-500"
                    placeholder=" "
                    name="firstName"
                    onChange={e => { handleChange(e) }}
                    value={form.firstName}

                  />
                   <label style={{color:formError.firstName?'red':''}} className="flex text-white w-full h-full select-none pointer-events-none absolute left-0 font-normal peer-placeholder-shown:text-gray-100 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-gray-100 transition-all -top-1.5 peer-placeholder-shown:text-[18px] text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[4.1] text-blue-gray-400 peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:border-blue-500 after:border-blue-gray-200 peer-focus:after:border-blue-500">
               First Name
                  </label>
                </div>
                {/* <span style={{color:'red'}}>{formError.firstName}</span> */}
                <div className="relative w-full min-w-[200px] h-16  my-4">
                  <input
                    type="text"
                    className="peer w-full h-full text-white border-t-transparent bg-transparent text-blue-gray-100 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-100 placeholder-shown:border-t-gray-100 border focus:border-2  focus:border-t-transparent text-md px-3 py-3 rounded-md border-gray-100 focus:border-blue-500"
                    placeholder=" "
                    name="lastName"
                    onChange={e => { handleChange(e) }}
                    value={form.lastName}

                  />
              <label  style={{color:formError.lastName?'red':''}} className="flex text-white w-full h-full select-none pointer-events-none absolute left-0 font-normal peer-placeholder-shown:text-gray-100 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-gray-100 transition-all -top-1.5 peer-placeholder-shown:text-[18px] text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[4.1] text-blue-gray-400 peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:border-blue-500 after:border-blue-gray-200 peer-focus:after:border-blue-500">
                    Last Name
                  </label>
                </div>
                {/* <span style={{color:'red'}}>{formError.lastName}</span> */}

                <div className="relative w-full min-w-[200px] h-16  my-4">
                  <input
                    type="text"
                    className="peer w-full h-full text-white border-t-transparent bg-transparent text-blue-gray-100 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-100 placeholder-shown:border-t-gray-100 border focus:border-2  focus:border-t-transparent text-md px-3 py-3 rounded-md border-gray-100 focus:border-blue-500"
                    placeholder=" "
                    name="username"
                    onChange={e => { handleChange(e) }}
                    value={form.username}

                  />
              <label style={{color:formError.username?'red':''}} className="flex text-white w-full h-full select-none pointer-events-none absolute left-0 font-normal peer-placeholder-shown:text-gray-100 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-gray-100 transition-all -top-1.5 peer-placeholder-shown:text-[18px] text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[4.1] text-blue-gray-400 peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:border-blue-500 after:border-blue-gray-200 peer-focus:after:border-blue-500">
                    User Name
                  </label>
                </div>
                {/* <span style={{color:'red'}}>{formError.username}</span> */}

                <div className="relative w-full min-w-[200px] h-16  my-4">
                  <input
                    type="email"
                    className="peer w-full h-full text-white border-t-transparent bg-transparent text-blue-gray-100 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-100 placeholder-shown:border-t-gray-100 border focus:border-2  focus:border-t-transparent text-md px-3 py-3 rounded-md border-gray-100 focus:border-blue-500"
                    placeholder=" "
                    name="email"
                    onChange={e => { handleChange(e) }}
                    value={form.email}

                  />
              <label style={{color:formError.email?'red':''}} className="flex text-white w-full h-full select-none pointer-events-none absolute left-0 font-normal peer-placeholder-shown:text-gray-100 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-gray-100 transition-all -top-1.5 peer-placeholder-shown:text-[18px] text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[4.1] text-blue-gray-400 peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:border-blue-500 after:border-blue-gray-200 peer-focus:after:border-blue-500">
                    Email
                  </label>
                </div>
                {/* <span style={{color:'red'}}>{formError.email}</span> */}

                <div className="relative w-full min-w-[200px] h-16  my-4">
                  <input
                    type="password"
                    className="peer w-full h-full text-white border-t-transparent bg-transparent text-blue-gray-100 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-100 placeholder-shown:border-t-gray-100 border focus:border-2  focus:border-t-transparent text-md px-3 py-3 rounded-md border-gray-100 focus:border-blue-500"
                    placeholder=" "
                    name="password"
                    onChange={e => { handleChange(e) }}
                    value={form.password}

                  />
              <label style={{color:formError.password?'red':''}} className="flex text-white w-full h-full select-none pointer-events-none absolute left-0 font-normal peer-placeholder-shown:text-gray-100 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-gray-100 transition-all -top-1.5 peer-placeholder-shown:text-[18px] text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[4.1] text-blue-gray-400 peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:border-blue-500 after:border-blue-gray-200 peer-focus:after:border-blue-500">
                    Password
                  </label>
                </div>
                {/* <span style={{color:'red'}}>{formError.password}</span> */}

                <div className="relative w-full min-w-[200px] h-16  my-4">
                  <input
                    type="password"
                    className="peer w-full h-full text-white border-t-transparent bg-transparent text-blue-gray-100 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-100 placeholder-shown:border-t-gray-100 border focus:border-2  focus:border-t-transparent text-md px-3 py-3 rounded-md border-gray-100 focus:border-blue-500"
                    placeholder=" "
                    name="confirmPassword"
                    onChange={e => { handleChange(e) }}
                    value={form.confirmPassword}

                  />
              <label style={{color:formError.confirmPassword?'red':''}} className="flex text-white w-full h-full select-none pointer-events-none absolute left-0 font-normal peer-placeholder-shown:text-gray-100 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-gray-100 transition-all -top-1.5 peer-placeholder-shown:text-[18px] text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[4.1] text-blue-gray-400 peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:border-blue-500 after:border-blue-gray-200 peer-focus:after:border-blue-500">
                    Confirm Password
                  </label>
                </div>
                {/* <span style={{color:'red'}}>{formError.confirmPassword}</span> */}

                <div className="relative w-full min-w-[200px] h-16  my-4">
                  <input
                    type="text"
                    className="peer w-full h-full text-white border-t-transparent bg-transparent text-blue-gray-100 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-100 placeholder-shown:border-t-gray-100 border focus:border-2  focus:border-t-transparent text-md px-3 py-3 rounded-md border-gray-100 focus:border-blue-500"
                    placeholder=" "
                    name="country"
                    onChange={e => { handleChange(e) }}
                    value={form.country}

                  />
              <label style={{color:formError.country?'red':''}} className="flex text-white w-full h-full select-none pointer-events-none absolute left-0 font-normal peer-placeholder-shown:text-gray-100 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-gray-100 transition-all -top-1.5 peer-placeholder-shown:text-[18px] text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[4.1] text-blue-gray-400 peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:border-blue-500 after:border-blue-gray-200 peer-focus:after:border-blue-500">
                    Country
                  </label>
                </div>
                {/* <span style={{color:'red'}}>{formError.country}</span> */}

                <div className="relative w-full min-w-[200px] h-16  my-4">
                  <input
                    type="number"
                    className="peer w-full h-full text-white border-t-transparent bg-transparent text-blue-gray-100 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-100 placeholder-shown:border-t-gray-100 border focus:border-2  focus:border-t-transparent text-md px-3 py-3 rounded-md border-gray-100 focus:border-blue-500"
                    placeholder=" "
                    name="phoneNumber"
                    onChange={e => { handleChange(e) }}
                    value={form.phoneNumber}

                  />
              <label style={{color:formError.phoneNumber?'red':''}} className="flex text-white w-full h-full select-none pointer-events-none absolute left-0 font-normal peer-placeholder-shown:text-gray-100 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-gray-100 transition-all -top-1.5 peer-placeholder-shown:text-[18px] text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[4.1] text-blue-gray-400 peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:border-blue-500 after:border-blue-gray-200 peer-focus:after:border-blue-500">
                    Phone Number
                  </label>
                </div>
                {/* <span style={{color:'red'}}>{formError.phoneNumber}</span> */}

              </div>
              <div className="-ml-2.5 w-full my-4">
                <div className="flex justify-start items-center">
                  <label
                    className="relative flex items-center cursor-pointer p-3 rounded-full"
                    for="checkbox"
                  >
                    <input
                      type="checkbox"
                      className="peer relative appearance-none w-5 h-5 border rounded-md border-blue-gray-200 cursor-pointer transition-all before:content[''] before:block before:bg-blue-gray-500 before:w-12 before:h-12 before:rounded-full before:absolute before:top-2/4 before:left-2/4 before:-translate-y-2/4 before:-translate-x-2/4 before:opacity-0 hover:before:opacity-10 before:transition-opacity checked:bg-blue-500 checked:border-blue-500 checked:before:bg-blue-500"
                      id="checkbox"
                      onChange={e=>{handleCheck()}}
                    />
                    <div className="text-white absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        stroke="currentColor"
                        stroke-width="1"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </label>
                  <label
                    className="text-gray-100 font-light select-none cursor-pointer mt-px md:text-lg sm:text-sm text-xs"
                    for="checkbox"
                  >
                    I agree to the Terms of Service and Privacy Policy
                  </label>
                </div>
              </div>

              <div className=" pt-0 w-full my-3">
                <button
                  className="middle none  sm:text-lg text-sm font-sans font-bold center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none  py-3 px-6 rounded-3xl bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] block w-full"
                  type="button"
                  onClick={e=>{signUp(e)}}
                >
                  CREATE AN ACCOUNT
                </button>
              </div>
              {!errorAlert?
              <span style={{color:'white'}}>
                       ! please fill require fields !
              </span>
              :
              ''}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;