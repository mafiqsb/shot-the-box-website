import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import zxcvbn from 'zxcvbn';
import PasswordStrengthBar from 'react-password-strength-bar';
import { toast } from 'react-toastify';
import { getError } from '../utils';

export default function SignUp() {
  const { search } = useLocation();
  const navigate = useNavigate();

  const redirectInURL = new URLSearchParams(search).get('redirect');
  const redirect = redirectInURL ? redirectInURL : '/admin/';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profilePicHandler, setProfilePicHandler] = useState([]);

  const passwordStrength = zxcvbn(password);

  const showTogglePasswordButton = () => {
    setShowPassword(!showPassword);
  };

  const showToggleConfirmPasswordButton = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const setProfilePic = (file) => {
    const fileInput = file[0];

    setProfilePicHandler(fileInput);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const file = profilePicHandler;

      const formData = new FormData();

      formData.append('file', file);

      const returnData = await axios.post('/api/upload/imgcover', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const profileCover = returnData.data.secure_url;

      if (password !== confirmPassword) {
        return;
      }

      if (passwordStrength.score < 4) {
        // Password is not strong enough, handle accordingly
        toast.error('Please choose a stronger password.');
        return;
      }
      const { data } = await axios.post('/api/user/signup', {
        name,
        email,
        password,
        profileCover,
      });

      // ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      // localStorage.setItem('user_info', JSON.stringify(data));
      console.log(data);
      toast.success('created successfully');
      navigate(redirect || '/admin/');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex flex-col items-center justify-center p-8 mx-auto lg:mt-[-100px] mt-[-100px]">
        <h1 className="md:text-3xl text-xl font-bold p-1">Sign Up</h1>
        <form
          className=" md:w-[500px] xl:mt-[70px]"
          onSubmit={(e) => submitHandler(e)}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm text-left font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              autoComplete="name"
              type="text"
              placeholder="name"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm text-left font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              autoComplete="email"
              type="email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block w-full text-gray-700 text-sm text-left font-bold mb-2"
              htmlFor="email"
            >
              Profile Image
            </label>
            <input
              className="left-0 flex mt-4 mb-4"
              id="imageUpload"
              type="file"
              required
              onChange={(e) => setProfilePic(e.target.files)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm text-left font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className={
                  password !== confirmPassword
                    ? 'shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                    : 'shadow appearance-none border border-green-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                }
                id="password"
                autoComplete="new-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="******************"
                required
                onChange={(e) => setPassword(e.target.value)}
              />

              <PasswordStrengthBar
                password={password}
                shortScoreWord={['Weak']}
                minScore={1}
              />
              <button
                className="absolute top-0 right-0 mt-1.5 mr-4"
                onClick={showTogglePasswordButton}
              >
                {showPassword ? 'hide' : 'show'}
              </button>
            </div>

            <label
              className="block text-gray-700 text-sm text-left font-bold mb-2"
              htmlFor="password"
            >
              Confirm Password
            </label>
            <div className="relative z-1">
              <input
                className={
                  password !== confirmPassword
                    ? 'shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                    : 'shadow appearance-none border border-green-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                }
                id="confirmPassword"
                autoComplete="new-password"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="******************"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute top-0 right-0 mt-1.5 mr-4 cursor-pointer"
                onClick={showToggleConfirmPasswordButton}
              >
                {showConfirmPassword ? 'hide' : 'show'}
              </button>
            </div>
            {password !== confirmPassword && (
              <p className="text-red-500 text-xs italic">Not Same</p>
            )}
          </div>
          <div style={{ display: 'grid', placeItems: 'center' }}>
            <button
              type="submit"
              className="bg-black text-white rounded-md w-full xl:w-[200px] px-6 py-3 mt-8"
            >
              Register!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
