import React, { useReducer, useState } from 'react';
import { ImFacebook } from 'react-icons/im';
import { RiTwitterXFill } from 'react-icons/ri';
import { FiInstagram } from 'react-icons/fi';
import axios from 'axios';
import LoadingBox from './LoadingBox';
import { getError } from '../Utils';

const reducer = (state, action) => {
  switch (action.type) {
    case 'SEND_REQUEST':
      return { ...state, loading: true, emailSuccess: false };
    case 'SEND_SUCCESS':
      return { ...state, loading: false, emailSuccess: true, error: '' }; // Assuming emailSuccess is a boolean
    case 'SEND_FAIL':
      return {
        ...state,
        loading: false,
        error: action.payload,
        emailSuccess: false,
      };
    default:
      return state;
  }
};

export default function Footer() {
  const [email, setEmail] = useState('');

  const [{ loading, emailSuccess, error }, dispatch] = useReducer(reducer, {
    loading: false,
    emailSuccess: false,
    error: '',
  });

  const emailHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch({ type: 'SEND_REQUEST' });

      const { data } = await axios.post(
        '/api/emailnotify/',
        {
          email: email,
        },
        {
          headers: { 'content-type': 'application/json' },
        }
      );

      dispatch({ type: 'SEND_SUCCESS' });

      console.log(data);
    } catch (error) {
      dispatch({ type: 'SEND_FAIL', payload: getError(error) });
    }
  };

  return (
    <div className="bg-slate-50 textstwo">
      <div className="xl:w-[1240px] lg:w-[800px] md:[760px] md:grid md:grid-cols-3 flex flex-col  mx-auto  pb-20 justify-center sm:mt-0 pt-10">
        <div className="justify-center mt-20 md:w-[150px] lg:w-full order-2 sm:order-1 mx-auto">
          <h1 className="xl:text-xl xl:w-full lg:w-[180px] md:w-[120px] md:text-xl">
            We want to share something with you!
          </h1>
          <p className="xl:w-full lg:w-[200px] md:w-[180px]">
            Some perfect tips before your best day
          </p>
          <div className="pt-10 sm:text-left text-center">
            {loading ? (
              <LoadingBox />
            ) : error ? (
              <div>
                {error === 'This email is already subscribed' ? (
                  <p className="text-l font-bold mt-[-20px]">
                    This Email already subscribed, use another email
                  </p>
                ) : (
                  <p className="text-l font-bold mt-[-20px]">
                    An error occurred. Please try again later.
                  </p>
                )}
                <form onSubmit={emailHandler}>
                  <input
                    placeholder="Enter Email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex xl:w-[250px] lg:w-[200px] appearance-none bg-slate-50 focus:outline-none border-b rounded-none border-black focus:bg-white duration-300 md:items-start mb-4 mx-auto sm:mx-0"
                  />
                  <button
                    type="submit"
                    className="sm:mx-0 mx-auto bg-transparent md:text-lg text-sm mt-3 text-gray-400 rounded-full border-solid border-1px border-gray-400 font-bold w-[100px] textstwo hover:text-gray-500 hover:bg-white duration-300"
                  >
                    Notify Me
                  </button>
                </form>
              </div>
            ) : emailSuccess ? (
              <div>
                <h1 className="textstwo text-xl font-bold">
                  Thanks for subscribing!
                </h1>
                <p className="textstwo">
                  Stay tuned for the latest updates and exclusive content.
                </p>
              </div>
            ) : (
              <form onSubmit={emailHandler}>
                <input
                  placeholder="Enter Email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className=" flex xl:w-[250px] lg:w-[200px] appearance-none bg-slate-50 focus:outline-none border-b rounded-none border-black focus:bg-white duration-300 md:items-start mb-4 mx-auto sm:mx-0"
                />
                <button
                  type="submit"
                  className="sm:mx-0 mx-auto bg-transparent md:text-lg text-sm mt-3 text-gray-400 rounded-full border-solid border-1px border-gray-400 font-bold w-[100px] textstwo hover:text-gray-500 hover:bg-white duration-300"
                >
                  Notify Me
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="text-center flex flex-col items-center justify-center  md:w-[200px] mx-auto lg:w-full order-1 sm:order-2">
          <img
            alt="logo2"
            src="/images/BLACK.png"
            className="xl:w-[340px] md:w-[240px] w-[200px]"
          />
          <p className="xl:w-[400px] md:w-[200px] w-[250px] mt-11">
            Shot The Box is a fine art wedding photographer. We are passionate
            about creating beautiful and meaningful photographs for your amazing
            day.
          </p>
        </div>

        <div className="flex flex-col md:items-end mt-20 lg:w-full md:w-[200px]  sm:order-3 order-3 ">
          <div className=" text-center">
            <h1 className=" text-xl mb-6">Explore with us</h1>
            <div className="w-1/2 border-b border-solid flex mx-auto border-grey border-opacity-75 mb-6"></div>
            <div className="flex items-center justify-center mb-10">
              <ImFacebook />
              <FiInstagram className="lg:ml-20 lg:mr-20 md:ml-10 md:mr-10 ml-4 mr-4" />
              <RiTwitterXFill />
            </div>
            <p>+60136328253</p>
            <p>E. shotthebox@gmail.com</p>
          </div>
        </div>
      </div>
      <div className=" justify-center md:w-full w-[350px] flex mx-auto">
        <h1 className="text-center">
          All media copyrighted by Shot The Box 2024. Let us wow your special
          day
        </h1>
      </div>
    </div>
  );
}
