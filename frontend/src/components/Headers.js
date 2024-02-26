import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../index.css';

import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

export default function Headers() {
  const [nav, setNav] = useState(false);
  const [navLog, setNavLog] = useState(false);

  const { pathname, search } = useLocation();

  const sp = new URLSearchParams(search);

  const page = sp.get('page') || 1;

  const [barNav, setBarNav] = useState('');

  const barNavHandler = (link) => {
    setBarNav(link);
    setNav(!nav === '/');
  };

  const navHandler = () => {
    setNav(!nav);
  };

  const loginNav = () => {
    setNavLog(!navLog);
  };

  return (
    <div className=" bg-gradient-to-b from-[rgba(120,119,119,0.4)] to-[rgb(0,0,0,0)] ">
      <div
        className={
          pathname === '/' ||
          /^\/artworks\/([^/]+)$/.test(pathname) ||
          pathname === '/about' ||
          pathname === '/contact'
            ? 'max-w-[1240px] mx-auto flex text-white items-center justify-between h-24 md:px-4 pr-5'
            : 'max-w-[1240px] mx-auto flex text-black items-center justify-between h-24  md:px-4 pr-5'
        }
      >
        <Link to="/">
          {pathname === '/' ||
          /^\/artworks\/([^/]+)$/.test(pathname) ||
          pathname === '/about' ||
          pathname === '/contact' ? (
            <img
              alt="img"
              src="/images/WHITE.png"
              className="w-[240px]"
              onClick={() => barNavHandler('/')}
            />
          ) : (
            <img
              alt="img"
              src="/images/BLACK.png"
              className="w-[240px]"
              onClick={() => barNavHandler('/')}
            />
          )}
        </Link>

        <ul className="md:flex hidden">
          <Link
            to="/about"
            className={
              barNav === '/about'
                ? 'mr-4 pb-2 flex w-full appearance-none border-b rounded-none border-white text-center justify-center'
                : 'mr-4'
            }
            onClick={() => barNavHandler('/about')}
          >
            About
          </Link>
          <Link
            // to="/artworks"
            to={{
              pathname: '/artworks',
              search: `?page=${page}`,
            }}
            className={
              barNav === '/artworks'
                ? 'mr-4 pb-2 flex w-full appearance-none border-b rounded-none border-black text-center justify-center'
                : 'mr-4 '
            }
            onClick={() => barNavHandler('/artworks')}
          >
            Artworks
          </Link>
          {/* <Link
            to="/blog"
            className={
              barNav === '/blog'
                ? 'mr-4 pb-2 flex w-full appearance-none border-b rounded-none border-black text-center justify-center'
                : 'mr-4'
            }
            onClick={() => barNavHandler('/blog')}
          >
            Blog
          </Link> */}
          <Link
            to="/contact"
            className={
              barNav === '/contact'
                ? 'mr-4 pb-2 flex w-full appearance-none border-b rounded-none border-white text-center justify-center'
                : 'mr-4'
            }
            onClick={() => barNavHandler('/contact')}
          >
            Contact
          </Link>
        </ul>

        <div className="md:hidden" onClick={navHandler}>
          {nav ? (
            <AiOutlineClose size={20} />
          ) : (
            <AiOutlineMenu className="" size={20} />
          )}
        </div>
        <div
          className={
            nav
              ? 'md:hidden flex flex-col bg-[#FAFAFA] text-black fixed left-0 top-0 h-full w-[70%] ease-in-out duration-300'
              : 'fixed left-[-100%] h-full top-0 ease-in-out duration-300'
          }
        >
          <div className="flex relative justify-between items-center p-7 h-18">
            <div className="mt-4">
              <h1 className="font-bold text-xl">Hi, Welcome!</h1>
              <p className="text-[10px]">Let us Wow your special day!</p>
            </div>

            <BsFillPersonFill size="20" onClick={loginNav} />
            <div
              className={
                navLog
                  ? 'absolute right-0 mt-[157px] w-[70%] bg-white text-black h-24 p-4 items-center transition ease-in-out duration-300'
                  : 'hidden'
              }
            >
              <p className="pb-3">Login</p>
              <p>Sign Up</p>
            </div>
          </div>
          <ul className="flex flex-col">
            <Link
              to="/about"
              onClick={() => barNavHandler('/about')}
              className="p-4 border-b  mx-4 mt-4"
            >
              About
            </Link>
            <Link
              to="/artworks"
              onClick={() => barNavHandler('/about')}
              className="p-4  mx-4 mt-4 border-b"
            >
              Artworks
            </Link>
            <Link
              to="/blog"
              onClick={() => barNavHandler('/about')}
              className="p-4  mx-4 mt-4 border-b"
            >
              Blog
            </Link>
            <Link
              to="/contact"
              onClick={() => barNavHandler('/about')}
              className="p-4  mx-4 mt-4 border-b"
            >
              Contact
            </Link>
            {/* <li className="p-4 border-b  mx-4 mt-4">About</li>
            <li className="p-4  mx-4 mt-4 border-b">Photo</li>
            <li className="p-4  mx-4 mt-4 border-b">Film</li>
            <li className="p-4  mx-4 mt-4 border-b">Contact</li> */}
          </ul>

          <div className="flex w-full mt-[80px]">
            <FaFacebookF size={15} className="mr-3 ml-7" />
            <FaTwitter size={15} className="mr-3" />
            <FaInstagram size={15} />
          </div>
          <h2 className="ml-7 mt-10 text-[15px] w-[70%] texts">
            <span className="text-[20px]">©</span> All images copyrighted by
            Shot The Box || 2023
          </h2>
        </div>
      </div>
    </div>
  );
}
