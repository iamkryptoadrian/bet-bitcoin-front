import React from "react";
import config from "../../config";
import { useState, useEffect } from "react";
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";
import Web3 from 'web3'
import { useAccount, useDisconnect } from 'wagmi'
import SendTrx from "./sendTransaction";
import { useWeb3Modal } from '@web3modal/react'
function Deposit() {
  var x = localStorage.getItem("token");
  if (x == null || x == undefined) {
    window.location.href = `${config.baseUrl}`
  }

  var userId = localStorage.getItem("userId");
  var userEmail = localStorage.getItem("email");


  const [amount, setAmount] = useState('')
  const [usserBalance,setUserBalance] = useState(0)

const [show,setShow] = useState(false)
  
  useEffect(() => {
    getBalance()

  //   setInterval(() => {
  //   getBalance()
  // }, 1000);

  }, []);

  const getBalance=async()=>{
    const config1 = {
    method: 'get', // HTTP method (PUT in this case)
    url: `${config.apiKey}getuserdetails?email=${userEmail}`,   // The API endpoint
    // headers: {
    //   'Authorization': `Bearer ${x}`, // Set the bearer token in the "Authorization" header
    //   'Content-Type': 'application/json', // Set the content type if needed
    // },
  };

let res=  await axios(config1)
console.log(res)
if(res.response){
console.log(res.response.data.message);

}else{
setUserBalance(res.data.wallet)

}
}

  const handleChange = (e) => {

    setAmount(e.target.value)
  }

  const { isConnected, address } = useAccount()

  const { isOpen, open, close, setDefaultChain } = useWeb3Modal()

  const depositAmountWithMatic = async (e) => {
    e.preventDefault()
    try {
      var web3 = new Web3(window.ethereum);

      if (amount <= 0) {

        toast.error('Amount should be greater than Zero..!!')
        return
      }
      let userBalannce = await web3.eth.getBalance(address)


      let price = amount * 10 ** 18
      if (price > userBalannce) {

        toast.error('Insufficient fund..!!')
        return
      }
      let gasPrice = await web3.eth.getGasPrice();

      let gasLimit = await web3.eth.estimateGas({
        gasPrice: web3.utils.toHex(gasPrice),
        to: config.adminAddress,
        from: address,
        value: price,
      });

      let trx = await web3.eth.sendTransaction({
        gasPrice: web3.utils.toHex(gasPrice),
        gas: web3.utils.toHex(gasLimit),
        to: config.adminAddress,
        from: address,
        value: price,
      });
      if (trx.transactionHash) {

        let data = { "amount": amount }

        const config1 = {
          method: 'put', // HTTP method (PUT in this case)
          url: `${config.apiKey}deposit`,   // The API endpoint
          headers: {
            'Authorization': `Bearer ${x}`, // Set the bearer token in the "Authorization" header
            'Content-Type': 'application/json', // Set the content type if needed
          },
          data: data, // The data you want to send in the request body
        };

        let res = await axios(config1)
        // .then(response => {
        //   // Handle the success response here.
        //   toast.success( response.data.message);
        // })
        // .catch(error => {
        //   // Handle errors here.
        //   toast.error(error);
        // });
        if (res.response) {
          toast.error(res.response.data.message);
        } else {
          toast.success(res.data.message);
        }

      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message);

    }
  }

  const depositAmountWithUsdt = async (e) => {
    e.preventDefault()
    
    try {
      // setShow(true)
      // return
      var web3 = new Web3(window.ethereum);
      let contractObject = new web3.eth.Contract(config.usdtABI, config.usdtAddress);
     

      if (amount <= 0) {

        toast.error('Amount should be greater than Zero..!!')
        return
      }
      let userBalance = await contractObject.methods.balanceOf(address).call()
   

      let price = amount * 10 ** 18


      if (price > userBalance) {

        toast.error('Insufficient fund..!!')
        return
      }
      let transfer = await contractObject.methods.transfer(config.adminAddress, price.toString());

      let encoded_tx = transfer.encodeABI();

      let gasPrice = await web3.eth.getGasPrice();

      let gasLimit = await web3.eth.estimateGas({
        gasPrice: web3.utils.toHex(gasPrice),
        to: config.usdtAddress,
        from: address,
        data: encoded_tx,
      });

      let trx = await web3.eth.sendTransaction({
        gasPrice: web3.utils.toHex(gasPrice),
        gas: web3.utils.toHex(gasLimit),
        to: config.usdtAddress,
        from: address,
        data: encoded_tx,
      });

      if (trx.transactionHash) {

        let data = { "amount": amount }

        const config1 = {
          method: 'put', // HTTP method (PUT in this case)
          url: `${config.apiKey}deposit`,   // The API endpoint
          headers: {
            'Authorization': `Bearer ${x}`, // Set the bearer token in the "Authorization" header
            'Content-Type': 'application/json', // Set the content type if needed
          },
          data: data, // The data you want to send in the request body
        };

        let res = await axios(config1)
        // .then(response => {
        //   // Handle the success response here.
        //   toast.success( response.data.message);
        // })
        // .catch(error => {
        //   // Handle errors here.
        //   toast.error(error);
        // });
        if (res.response) {
          toast.error(res.response.data.message);
        } else {
          toast.success(res.data.message);
          setTimeout(() => {
            window.location.reload(true);
          }, 2000);
        }

      }
    } catch (error) {
      console.log(error)
      //toast.error(error.response?error.response.data.message:error.data?error.data:error.message);

    }
  }


  const showToast=async(res)=>{
    if(res){
      let data = { "amount": amount }

      const config1 = {
        method: 'put', // HTTP method (PUT in this case)
        url: `${config.apiKey}deposit`,   // The API endpoint
        headers: {
          'Authorization': `Bearer ${x}`, // Set the bearer token in the "Authorization" header
          'Content-Type': 'application/json', // Set the content type if needed
        },
        data: data, // The data you want to send in the request body
      };

      let res = await axios(config1)
      // .then(response => {
      //   // Handle the success response here.
      //   toast.success( response.data.message);
      // })
      // .catch(error => {
      //   // Handle errors here.
      //   toast.error(error);
      // });
      if (res.response) {
        toast.error(res.response.data.message);
      } else {
        toast.success(res.data.message);
      }
     // toast.success("transaction succesful")
      setShow(false)
    }else{
  toast.error("transaction failed")
  setShow(false)
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
                  Deposit Your Amount
                </h1>
              </div>

              <div className="my-4  w-full text-center">
                <h1 className="sm:text-lg text-sm text-gray-100">
                  Your Total Available Balance : <span>{usserBalance} USDT</span>
                </h1>
              </div>
              <div className="relative w-full min-w-[200px] h-16 my-4">
                <input
                  type="email"
                  className="peer w-full h-full text-white border-t-transparent bg-transparent text-blue-gray-100 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-100 placeholder-shown:border-t-gray-100 border focus:border-2  focus:border-t-transparent text-md px-3 py-3 rounded-md border-gray-100 focus:border-blue-500"
                  placeholder=" "
                  onChange={e => { handleChange(e) }}
                />
          <label className="flex text-white w-full h-full select-none pointer-events-none absolute left-0 font-normal peer-placeholder-shown:text-gray-100 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-gray-100 transition-all -top-1.5 peer-placeholder-shown:text-[18px] text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[4.1] text-blue-gray-400 peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:border-blue-500 after:border-blue-gray-200 peer-focus:after:border-blue-500">
                      Amount
                </label>
              </div>

              <div className=" pt-0 w-full my-3">
                {isConnected ?
                  //!show && 
                  <button
                    className="middle none font-sans font-bold center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none  sm:text-lg text-sm py-3 px-6 rounded-3xl bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] block w-full"
                    type="button"
                    //onClick={e => { depositAmountWithMatic(e) }}
                    onClick={e => { depositAmountWithUsdt(e) }}
                    
                  >
                    Deposit
                  </button>
                  :
                  <button
                    className="middle none font-sans font-bold center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none  sm:text-lg text-sm py-3 px-6 rounded-3xl bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] block w-full"
                    type="button"
                    onClick={e => { open() }}
                  >
                    Connect Wallet
                  </button>}

{/* {show&&<  SendTrx   amount={amount*10**18} showToast={showToast}/>} */}

              </div>

            </div>
          </div>
        </div>
      </div>


    </>
  );
}

export default Deposit;
