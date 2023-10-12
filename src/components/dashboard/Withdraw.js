import React from "react";
import config from "../../config";
import { useState, useEffect } from "react";
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";
import Web3 from 'web3'

function Withdraw() {
  var x = localStorage.getItem("token");
  if (x == null || x == undefined) {
    window.location.href = `${config.baseUrl}`
  }
  const [form, setForm] = useState({ "amount": '', "wallet": '' })
  const [usserBalance,setUserBalance] = useState(0)
  var userEmail = localStorage.getItem("email");

  useEffect(() => {
    getBalance()

  }, []);

  const getBalance = async () => {
      const config1 = {
          method: 'get', 
          url: `${config.apiKey}getuserdetails?email=${userEmail}`,
      };

      try {
          let res = await axios(config1);
          console.log(res);
          setUserBalance(res.data.wallet);
          toast.success('Balance fetched successfully!');  // Success toast notification
      } catch (error) {
          // If the request failed, notify the user with a toast
          const errorMessage = error.response ? error.response.data.message : error.message;
          console.error('Error fetching balance:', errorMessage);
          toast.fail(`Error fetching balance: ${errorMessage}`);  // Error toast notification
      }
  };


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })

  }

  const withdrawAmount = async (e) => {
    e.preventDefault();

    try {
        var web3 = new Web3(window.ethereum);

        let checkWallet = await web3.utils.isAddress(form.wallet);
        if (!checkWallet) {
            toast.error("Wallet address is not valid");
            return;
        }

        let data = { "amount": form.amount, "walletAddress": form.wallet, "email": userEmail };

        const config1 = {
            method: 'post',
            url: `${config.apiKey}withdrawalrequest`,
            headers: {
                'Authorization': `Bearer ${x}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'  // Explicitly tell Axios to accept JSON
            },
            data: data,
        };

        let res = await axios(config1);

        // Handle success response
        toast.success(res.data.message || "Withdrawal successful!");
        setTimeout(() => {
            window.location.reload(true);
        }, 2000);
    } catch (error) {
        console.error("Error Object:", error);

        // Check if there's a response from the server and use that for the toast message
        const errorMsg = error.response?.data?.message || "Insufficient Balance";
        toast.error(errorMsg);
    }
}




  return (
    <>
      <Toaster />
      <div className="bg-center w-screen m-auto px-3 pt-20 pb-12 lg:block xl:px-0 ">
        <div className="lg:grid max-w-3xl mx-auto  grid-cols-1  md:grid-cols-1 flex flex-col flex-col-reverse  PageBG rounded-xl shadow-2xl">
          <div className=" lg:rounded-br-none rounded-br-xl  lg:rounded-tl-xl  rounded-tl-none  rounded-bl-xl py-10 sm:py-12    flex  justify-center items-center flex-col  px-4 sm:px-20  md:px-36  lg:px-12 xl:px-24 bg-transparent ">
            <div className="  rounded-xl     flex  justify-center items-center flex-col w-full  ">
              <div className="my-4 w-full text-center">
                <h1 className="sm:text-3xl text-2xl  md:text-4xl font-bold text-gray-50">
                  Withdraw Your Amount
                </h1>
              </div>

              <div className="my-4  w-full text-center">
                <h1 className="sm:text-lg text-sm text-gray-100">
                  Your Total Available Balance : <span>{usserBalance} BB</span>
                </h1>
              </div>

              <div className="relative w-full min-w-[200px] h-16 my-4">
                <input
                  type="email"
                  className="peer w-full h-full text-white border-t-transparent bg-transparent text-blue-gray-100 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-100 placeholder-shown:border-t-gray-100 border focus:border-2  focus:border-t-transparent text-md px-3 py-3 rounded-md border-gray-100 focus:border-blue-500"
                  placeholder=" "
                  name="amount"
                  value={form.amount}
                  onChange={e => { handleChange(e) }}
                />
              <label className="flex text-white w-full h-full select-none pointer-events-none absolute left-0 font-normal peer-placeholder-shown:text-gray-100 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-gray-100 transition-all -top-1.5 peer-placeholder-shown:text-[18px] text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[4.1] text-blue-gray-400 peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:border-blue-500 after:border-blue-gray-200 peer-focus:after:border-blue-500">
                  Amount
                </label>
              </div>

              <div className="relative w-full min-w-[200px] h-16 my-4">
                <input
                  type="wallet"
                  className="peer w-full h-full text-white border-t-transparent bg-transparent text-blue-gray-100 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-100 placeholder-shown:border-t-gray-100 border focus:border-2  focus:border-t-transparent text-md px-3 py-3 rounded-md border-gray-100 focus:border-blue-500"
                  placeholder=" "
                  name="wallet"
                  value={form.wallet}

                  onChange={e => { handleChange(e) }}
                />
              <label className="flex text-white w-full h-full select-none pointer-events-none absolute left-0 font-normal peer-placeholder-shown:text-gray-100 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-gray-100 transition-all -top-1.5 peer-placeholder-shown:text-[18px] text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[4.1] text-blue-gray-400 peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:border-blue-500 after:border-blue-gray-200 peer-focus:after:border-blue-500">
                  Wallet
                </label>
              </div>

              <div className=" pt-0 w-full my-3">
                <button
                  className="middle none font-sans font-bold center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none  sm:text-lg text-sm py-3 px-6 rounded-3xl bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] block w-full"
                  type="button"
                  onClick={e => { withdrawAmount(e) }}
                >
                  Withdraw
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Withdraw;
