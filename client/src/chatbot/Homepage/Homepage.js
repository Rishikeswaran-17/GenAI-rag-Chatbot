import React from "react";
import compLogo from "../assets/png.png";
import banner from "../assets/bank-3d.jpg";
import { BiTime, BiCurrentLocation, BiSearch } from "react-icons/bi";
import { AiOutlineHome, AiOutlineCloudUpload } from "react-icons/ai";
import { MdPayment, MdOutlineSavings, MdAutoGraph } from "react-icons/md";
import { GoQuestion } from "react-icons/go";
import { PiHandCoins } from "react-icons/pi";
import { FaHands } from "react-icons/fa";
import { Link } from "react-router-dom";
// import Chat from "../Chat/Chat";

const Homepage = () => {
  return (
    <div className="bg-slate-200">
      <nav className="bg-slate-800 h-fit p-2 flex justify-between text-white">
        <button className="flex gap-0.5 items-center text-2xl">
          {/* <img className="w-18 mr-3" src={compLogo} alt="" /> */}
          <h1 className="text-hover-primary text-white text-3xl">Snowflake Bank</h1>
        </button>
        <div className="flex gap-3 sm:text-base md:text-lg lg:text-xl">
          <button className="hover:bg-gray-700 px-2 py-1 rounded-lg text-hover-primary">
            Personal
          </button>
          <button className="hover:bg-gray-700 px-2 py-1 rounded-lg text-hover-primary">
            NRI
          </button>
          <button className="hover:bg-gray-700 px-2 py-1 rounded-lg text-hover-primary">
            SME
          </button>
          <button className="hover:bg-gray-700 px-2 py-1 rounded-lg text-hover-primary">
            Wholesale
          </button>
          <button className="hover:bg-gray-700 px-2 py-1 rounded-lg text-hover-success">
            Agri
          </button>
        </div>
        <div className="flex gap-2 md:text-lg lg:text-base">
          <button className="flex gap-1 items-center hover:bg-gray-700 px-2 py-1 rounded-lg text-hover-primary">
            <BiTime />
            Insta Service
          </button>
          <button className="flex gap-1 items-center hover:bg-gray-700 px-2 py-1 rounded-lg text-hover-primary">
            <BiCurrentLocation />
            Locate Us
          </button>
          <button className="flex gap-1 items-center hover:bg-gray-700 px-2 py-1 rounded-lg text-hover-primary">
            <GoQuestion />
            Merger FAQs
          </button>
        </div>
      </nav>
      {/* Navbar-2 */}
      <div className="bg-white">
        <div className="w-1/2 mx-auto h-fit p-1 gap-2 flex justify-between bg-white">
          <div className="text-2xl text-hover-primary">Welcome!</div>
          <div className="flex gap-2 p-1">
            <input className="bg-gray-100 rounded-lg p-1 w-400" type="text" />
            <button className="text-2xl p-1 text-gray-400">
              <BiSearch />
            </button>
          </div>
          <button className="btn btn-outline btn-outline-dashed btn-outline-danger btn-active-light-danger">
            <Link to="/login" style={{textDecoration:'None'}}>Login</Link>
          </button>
        </div>
      </div>
      {/* Banner */}
      <div className="w-7/12 mx-auto ">
        <div className="mt-3 flex gap-3 justify-center">
          <div className="w-300 rounded-lg">
            <img className="rounded-lg" src={banner} width={400} alt="" />
          </div>
          <div>
            <div className="min-w-56 h-fit bg-white text-center text-lg rounded-lg p-2">
              <div>
                <div>
                  Personal Banking Services
                  <div className="font-semibold">What Are You Looking For?</div>
                </div>
                <div>
                  <select
                    name="banking"
                    id="banking"
                    className="border rounded-lg px-2 py-1 w-full"
                  >
                    <option value="Select Product Type">
                      Select Product Type
                    </option>
                    <option value="Cards">Cards</option>
                    <option value="Accounts">Accounts</option>
                    <option value="Deposits">Deposits</option>
                    <option value="Loans">Loans</option>
                    <option value="EMI">EMI</option>
                  </select>
                  <select
                    name="banking"
                    id="banking"
                    className="border mt-2 rounded-lg px-2 py-1 w-full"
                  >
                    <option value="Select Product">Select Product</option>
                  </select>
                </div>
              </div>
              <div>
                <button className="uppercase w-full bg-gray-200 text-gray-500 px-2 py-1 rounded-md mt-2">
                  Apply Online
                </button>
                <button className="text-gray-400">Know more</button>
              </div>
            </div>
            <div className="mt-1 p-1 text-indigo-500 bg-white rounded-lg text-center font-semibold">
              Pressway
              <p className="text-xs font-extralight text-gray-500">
                Check Your Pre-Approved Offers instantly
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Menus */}
      <div className="bg-slate-700">
        <div className="w-11/12 mx-auto justify-center bg-slate-700 mt-1 text-gray-200 flex gap-2">
          <div className="hover:bg-white text-xl hover:text-slate-700 text-center p-1">
            <div className="text-blue-500 py-1">
              <AiOutlineHome />
            </div>
            HOME
          </div>
          <div className="hover:bg-white text-xl hover:text-slate-700 text-center p-1">
            <div className="text-blue-500 py-1">
              <MdPayment />
            </div>
            PAY<p className="text-sm text-gray-400">Cards,Bill Pay</p>
          </div>
          <div className="hover:bg-white text-xl hover:text-slate-700 text-center p-1">
            <div className="text-blue-500 py-1">
              <MdOutlineSavings />
            </div>
            SAVE<p className="text-sm text-gray-400">Accounts, Deposits</p>
          </div>
          <div className="hover:bg-white text-xl hover:text-slate-700 text-center p-1">
            <div className="text-blue-500 py-1">
              <MdAutoGraph />
            </div>
            INVEST<p className="text-sm text-gray-400">Bonds, Mutual Funds</p>
          </div>
          <div className="hover:bg-white text-xl hover:text-slate-700 text-center p-1">
            <div className="text-blue-500 py-1">
              <PiHandCoins />
            </div>
            BORROW<p className="text-sm text-gray-400">Loans, EMI</p>
          </div>
          <div className="hover:bg-white text-xl hover:text-slate-700 text-center p-1">
            <div className="text-blue-500 py-1">
              <FaHands />
            </div>
            INSURE<p className="text-sm text-gray-400">Cover, Protect</p>
          </div>
          <Link to="/docuplaod" style={{textDecoration:'None'}}>
            <div className="hover:bg-white text-xl hover:text-slate-700 text-center p-1 cursor-pointer">
              <div className="text-blue-500 py-1">
                <AiOutlineCloudUpload />
              </div>
              UPLOAD<p className="text-sm text-gray-400">Pdf's,docs</p>
            </div>
          </Link>
        </div>
      </div>
      {/* Cards */}
      <div className="mt-2 flex gap-2 w-11/12 mx-auto justify-center">
        <div className="text-3xl">
          Calculators For Your Needs
          <div className="bg-white w-96 p-2 mt-2">
            <div className="border p-1 text-xl bg-purple-100">
              Personal Loan EMI Calculator
              <p className="text-sm text-gray-500">
                Calculate your monthly outgo with our personal loan EMI
                calculator
              </p>
            </div>
            <div className="border mt-1 p-1 text-xl bg-orange-100">
              Home Loan EMI Calculator
              <p className="text-sm text-gray-500">
                Calculator your monthly expense toward owning your own home
              </p>
            </div>
            <div className="border mt-1 p-1 text-xl bg-indigo-100">
              RD Calculator
              <p className="text-sm text-gray-500">
                Start small, save regularly, enjoy great interest rates
              </p>
            </div>
            <div className="text-right p-1">
              <button className="text-blue-500 text-base">VIEW ALL</button>
            </div>
          </div>
        </div>
        <div className="text-3xl">
          Offers For You
          <div className="bg-white w-48 mt-2">
            <div className="border-b p-1 text-xl">
              Best-in-class Credit Cards
              <p className="text-sm text-gray-500">Ready for you</p>
            </div>
            <div className="border-b p-1 text-xl">
              Bigger Savings Assured
              <p className="text-sm text-gray-500">On SmartBuy</p>
            </div>
            <div className="text-right p-1">
              <button className="text-blue-500 text-base">VIEW ALL</button>
            </div>
          </div>
        </div>
        <div className="text-3xl">
          Need Help?
          <div className="text-blue-500 mt-2 p-2 bg-white w-56 font-medium text-base border-b flex justify-evenly">
            <div>Contact Us</div>
            <div>NetBanking</div>
          </div>
          <div className="p-2 border-b bg-white text-sm text-blue-500">
            Insta Service
          </div>
        </div>
      </div>
      {/* Cards-2 */}
      <div className="mt-2 w-11/12 mx-auto text-center text-3xl">
        Latest Offers
        <div className="flex gap-2 justify-center mt-2">
          <div className="w-56 bg-white p-2">
            <div>Credit Cards</div>
            <p className="text-sm text-gray-500 mt-1">
              Grab the exclusive offers now
            </p>
          </div>
          <div className="w-56 bg-white p-2">
            <div>Remittances</div>
            <p className="text-sm text-gray-500 mt-1">
              Remittances without any foriegn bank charges
            </p>
          </div>
          <div className="w-56 bg-white p-2">
            <div>NetBanking</div>
            <p className="text-sm text-gray-500 mt-1">
              Save big across popular brands
            </p>
          </div>
          <div className="w-56 bg-white p-2">
            <div>Electronics</div>
            <p className="text-sm text-gray-500 mt-1">
              Avail exciting offers via SmartBuy
            </p>
          </div>
        </div>
      </div>
      <div className="mt-2 w-11/12 mx-auto text-center text-3xl mb-2">
        Ways to Bank
        <div className="flex gap-2 justify-center mt-2">
          <div className="w-56 bg-white p-2">
            <div>WhatsApp Banking</div>
            <p className="text-sm text-gray-500 mt-1">
              +180 Banking Services that are a chat away. Say hi on 7070022222
            </p>
          </div>
          <div className="w-56 bg-white p-2">
            <div>PayZapp</div>
            <p className="text-sm text-gray-500 mt-1">
              All New PayZapp For Online Payments. All New Offers!
            </p>
          </div>
          <div className="w-56 bg-white p-2">
            <div>Mobile Banking</div>
            <p className="text-sm text-gray-500 mt-1">
              100+ transactions on a variety of phones and tablets
            </p>
          </div>
          <div className="w-56 bg-white p-2">
            <div>Premier</div>
            <p className="text-sm text-gray-500 mt-1">
              Premier Banking to suit every life style
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
