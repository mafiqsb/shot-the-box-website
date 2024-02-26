import axios from 'axios';
import React, { useReducer, useState } from 'react';
import LoadingBox from '../../components/LoadingBox';
import { getError } from '../../Utils';

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

export default function Newsletter() {
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
    <div className="bg-slate-50 w-full py-16 px-4">
      <div className="xl:w-[1240px] lg:w-[900px] md:w-[600px] w-[300px] mx-auto grid lg:grid-cols-3 ">
        <div className="my-4 lg:col-span-2">
          <h1 className="textstwo md:text-4xl sm:text-3xl text-2xl py-2">
            Want more tips about your special day?
          </h1>
          <p className="textstwo">
            Sign up to our newsletter and stay up to date.
          </p>
        </div>

        <div className=" items-center flex">
          <div className="pt-10 sm:text-left text-center">
            {loading ? (
              <LoadingBox />
            ) : error ? (
              <div>
                {error === 'This email is already subscribed' ? (
                  <p className="textstwo text-l font-bold mt-[-20px]">
                    This Email already subscribed, use another email
                  </p>
                ) : (
                  <p className="textstwo text-l font-bold mt-[-20px]">
                    An error occurred. Please try again.
                  </p>
                )}
                <form onSubmit={emailHandler} className="flex w-full">
                  <input
                    placeholder="Enter Email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className=" p-2 md:h-12 h-10 flex w-full appearance-none bg-slate-50 focus:outline-none border-b rounded-none border-black focus:bg-white duration-300"
                  />

                  <button className="bg-transparent md:text-lg text-sm text-gray-400 ml-4 my-3 px-1 py-1 rounded-full border-solid border-1px border-gray-400 font-bold w-[150px] textstwo hover:text-gray-500 hover:bg-white duration-300">
                    Notify Me
                  </button>
                </form>
              </div>
            ) : emailSuccess ? (
              <div>
                <h1 className="textstwo text-xl font-bold">
                  Thanks for subscribing!
                </h1>
                <p className="textstwo ">
                  Stay tuned for the latest updates and exclusive content.
                </p>
              </div>
            ) : (
              <form onSubmit={emailHandler} className="flex w-full">
                <input
                  placeholder="Enter Email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className=" p-2 md:h-12 h-10 flex w-full appearance-none bg-slate-50 focus:outline-none border-b rounded-none border-black focus:bg-white duration-300"
                />

                <button className="bg-transparent md:text-lg text-sm text-gray-400 ml-4 my-3 px-1 py-1 rounded-full border-solid border-1px border-gray-400 font-bold w-[150px] textstwo hover:text-gray-500 hover:bg-white duration-300">
                  Notify Me
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
