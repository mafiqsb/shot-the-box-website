import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Store } from '../Store';

import { toast } from 'react-toastify';
import { getError } from '../utils';

export default function SignIn() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectURL = new URLSearchParams(search).get('redirect');
  const redirect = redirectURL ? redirectURL : '/admin/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const showTogglePasswordButton = () => {
    setShowPassword(!showPassword);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post('/api/user/signin', {
        email,
        password,
      });

      console.log(data);

      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('user_info', JSON.stringify(data));
      navigate(redirect || '/admin/');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <div className="min-h-screen flex xl:w-full items-center justify-center mx-auto">
      <div className="p-8 bg-[#FAFAFA] rounded-lg shadow-md md:w-[500px] w-80">
        <img
          src={'/images/BLACK.png'}
          className="xl:w-[300px] md:w-[250px] mx-auto mb-8"
          alt="stb-img"
        />
        <h1 className="md:text-3xl text-xl font-bold p-1">Sign In</h1>
        <form
          className="  md:w-[400px] xl:mt-[40px] mx-auto"
          onSubmit={(e) => submitHandler(e)}
        >
          <div className="mb-4 mx-auto">
            <label
              className="block w-full text-gray-700 text-sm text-left font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              autoComplete="email"
              type="email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-6 flex flex-col mx-auto">
            <label
              className="block text-gray-700 text-sm text-left font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative mx-auto w-full">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                autoComplete="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="******************"
                required
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                className="absolute top-0 right-0 mt-1.5 mr-2"
                onClick={showTogglePasswordButton}
              >
                {showPassword ? 'hide' : 'show'}
              </button>
            </div>
          </div>
          <div style={{ display: 'grid', placeItems: 'center' }}>
            <button
              type="submit"
              className="bg-black text-white rounded-md w-full xl:w-[200px] px-6 py-3 mt-8"
            >
              Let's Rock!
            </button>
          </div>
        </form>
        <div className="mt-5 flex flex-row mx-auto justify-center">
          <p className="mr-2">Don't have any account?</p>{' '}
          <Link to="/dummysignup">Register Here</Link>
        </div>
      </div>
    </div>
  );
}
