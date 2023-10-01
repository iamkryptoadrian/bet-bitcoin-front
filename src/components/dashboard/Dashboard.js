import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import { BiMoneyWithdraw, BiLogOut } from "react-icons/bi";
import { MdRealEstateAgent } from "react-icons/md";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import config from "../../config";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import logo from '../../image/logo_svg.svg';


function Dashboard() {
  var x = localStorage.getItem("token");
  if (x == null || x == undefined) {
    window.location.href = `${config.baseUrl}`;
  }
  const [open, SetOpen] = useState(false);
  const [toggle, setToggle] = useState(false);

  const logOut = (e) => {
    e.preventDefault();
    window.localStorage.clear();
    setTimeout(() => {
      window.location.href = `${config.baseUrl}`;
    }, 2000);
  };
  return (
    <div className="flex justify-start items-start flex-col  lg:flex-row w-screen h-fit pr-20 overflow-hidden ">
      <nav
        className={`h-full bg-black/50 ${
          open === false ? "md:w-64" : "md:w-14"
        }  duration-300 w-screen lg:flex justify-start items-start flex-col  mr-16  hidden`}
      >
        <div
          className="flex justify-between items-center p-4 "
          onClick={() => SetOpen(!open)}
        >
          <div>
            {open === false ? (
              <CloseIcon className="text-white  " />
            ) : (
              <MenuIcon className="text-white  " />
            )}
          </div>
          
          {!open && <img className="logo" src={logo} alt="Logo" />}

        </div>
        <div className="h-[105vh]  relative  ">
          <Link to="/dashboard/home">
            <div className="flex justify-start items-center p-4  w-full nevs ">
              <HomeIcon className="text-white  cursor-pointer" />
              <h1
                className={`text-white  mx-4 font-semibold duration-1000 ${
                  open === false ? "flex " : "hidden"
                }`}
              >
                Dashboard
              </h1>
            </div>
          </Link>
          <Link to="/dashboard/withdraw">
            <div className="flex justify-start  items-center p-4 text-white   w-full nevs">
              <BiMoneyWithdraw className="text-2xl" />
              <h1
                className={`text-white  mx-4 font-semibold duration-1000 ${
                  open === false ? "flex " : "hidden"
                }`}
              >
                Withdraw
              </h1>
            </div>
          </Link>
          <Link to="/dashboard/deposit">
            <div className="flex justify-start  items-center p-4 text-white   w-full nevs">
              <MdRealEstateAgent className="text-2xl" />
              <h1
                className={`text-white  mx-4 font-semibold duration-1000 ${
                  open === false ? "flex " : "hidden"
                }`}
              >
                Deposit
              </h1>
            </div>
          </Link>

          <Link to="//logout">
            <div className="absolute bottom-c w-full nevs">
              <div
                className="flex justify-start  items-center p-4 text-white   "
                onClick={(e) => {
                  logOut(e);
                }}
              >
                <BiLogOut className="text-2xl" />
                <h1
                  className={`text-white  mx-4 font-semibold duration-1000 ${
                    open === false ? "flex " : "hidden"
                  }`}
                >
                  LogOut
                </h1>
              </div>
            </div>
          </Link>
        </div>
      </nav>
      <div className="min-h-fit duration-300 w-screen flex justify-start items-start flex-col mr-16 lg:hidden head-bg">
        <div
          className="flex justify-between items-center p-4 "
          onClick={() => setToggle(!toggle)}
        >
          <div>
            <MenuIcon className="text-white  " />
          </div>
          <div>
          <img className="logo-moible" src={logo}></img>
          </div>
        </div>
      </div>

      {toggle && (
        <div className="lg:hidden">
          <div className="fixed inset-y-0 right-0 z-50 w-full bg-black px-6 py-4 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="gap-x-6 flex justify-between">
                <div className="text-white  text-[22px] font-bold mx-2">
                <img className="logo" src={logo}></img>
                </div>
              <button
                className="-m-2.5 rounded-md p-2.5 text-white"
                onClick={() => {
                  setToggle(!toggle);
                }}
              >
                <span className="sr-only">Close menu</span>
                <span className="w-fit">
                  <svg
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </span>
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-5 py-6">
                  <Link to="/dashboard/home" onClick={() => setToggle(!toggle)}>
                    <div className="flex justify-start items-center p-4  w-full nevs ">
                      <HomeIcon className="text-white  cursor-pointer" />
                      <h1 className="text-white  mx-4 font-semibold duration-1000">
                        Dashboard
                      </h1>
                    </div>
                  </Link>
                  <Link
                    to="/dashboard/withdraw"
                    onClick={() => setToggle(!toggle)}
                  >
                    <div className="flex justify-start  items-center p-4 text-white   w-full nevs">
                      <BiMoneyWithdraw className="text-2xl" />
                      <h1 className="text-white  mx-4 font-semibold duration-1000">
                        Withdraw
                      </h1>
                    </div>
                  </Link>

                  <Link
                    to="/dashboard/deposit"
                    onClick={() => setToggle(!toggle)}
                  >
                    <div className="flex justify-start  items-center p-4 text-white   w-full nevs">
                      <MdRealEstateAgent className="text-2xl" />
                      <h1 className="text-white  mx-4 font-semibold duration-1000">
                        Deposit
                      </h1>
                    </div>
                  </Link>

                  <Link to="//logout" onClick={(e) => {logOut(e);}}>
                    <div className="absolute bottom-10 w-full nevs">
                      <div className="flex justify-start  items-center p-4 text-white   ">
                        <BiLogOut className="text-2xl" />
                        <h1 className="text-white  mx-4 font-semibold duration-1000">
                          LogOut
                        </h1>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Outlet />
    </div>
  );
}

export default Dashboard;
