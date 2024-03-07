import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Navbar } from 'flowbite-react';

import { AiOutlineMenu } from 'react-icons/ai';

import { IoIosArrowForward } from 'react-icons/io';
import { Store } from '../Store';

export default function Navbars({ sideBar, setSidebar }) {
  const { state, dispatch: ctxDispatch } = useContext(Store);

  const { userInfo } = state;

  // const [sideBar, setSidebar] = useState(false);
  const [albumClick, setAlbumClick] = useState(false);

  const sidebarHandler = () => {
    setSidebar(!sideBar);
  };

  const closeHandler = () => {
    setSidebar(false);
  };

  const albumClickHandler = () => {
    setAlbumClick(!albumClick);
  };

  const signoutHandler = () => {
    localStorage.removeItem('user_info');
    ctxDispatch({ type: 'USER_SIGNOUT' });
    window.location.href = '/admin/signin';
  };

  return (
    <div className="w-full fixed z-10">
      {/* Top Navbar */}
      <Navbar className=" w-full mx-auto flex bg-[#A9A9A9] text-white justify-between h-24 items-center p-6">
        <div className="flex flex-row items-center justify-center">
          <AiOutlineMenu onClick={sidebarHandler} className=" mr-4" />
          <img
            alt="img"
            src="/images/WHITE.png"
            className="lg:w-[250px] md:w-[150px] w-[120px] "
          />
          <span className=" bg-purple-100 ml-3 mb-5 text-purple-800 text-xs font-medium me-2 px-1.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300 w-14">
            Admin
          </span>
        </div>

        <div className="flex">
          <img
            src={userInfo.profileimage}
            alt="img"
            className="md:flex hidden mr-4 rounded-full w-10 h-10 object-cover overflow-hidden"
          />

          <Dropdown label={'Profile'} className="w-44" inline>
            <Dropdown.Item className="block px-4 py-2 text-gray-800 hover:bg-[#D3D3D3] hover:rounded-t-lg hover:text-white">
              <Link to="/editprofile">Edit Portfolio</Link>
            </Dropdown.Item>
            <Dropdown.Item className="block px-4 py-2 text-gray-800 hover:bg-[#D3D3D3] hover:text-white">
              <Link to="/signup">Sign Up as Admin</Link>
            </Dropdown.Item>
            <Dropdown.Item className="block px-4 py-2 bg-[#ECECEC] text-gray-800 hover:bg-[#D3D3D3] hover:rounded-b-lg rounded-b-lg hover:text-white">
              <Link to="/signout" onClick={signoutHandler}>
                Sign Out
              </Link>
            </Dropdown.Item>
          </Dropdown>
        </div>
      </Navbar>
      {/* side Navbar */}

      <div>
        <div
          className={
            sideBar
              ? 'fixed left-0 bg-[#FAFAFA] h-full xl:w-72 p-2 ease-in-out duration-300'
              : 'fixed left-[-100%] ease-in-out duration-300'
          }
        >
          <div>
            <img
              src={userInfo.profileimage}
              alt="img"
              className="mx-auto rounded-full w-16 h-16 mt-10 mb-4 object-cover overflow-hidden"
            />
          </div>
          <h3 className="font-bold text-xl mt-5">{userInfo.name}</h3>
          <p className="text-sm">{userInfo.email}</p>
          <div className="mt-6 text-left">
            <ul>
              <div>
                <Link to="/" className="p-4">
                  <li className="pb-4 pl-4 pt-4 border-b-2 mx-4 hover:bg-[#D3D3D3]">
                    Dashboard
                  </li>
                </Link>
                <li className="pb-4 pl-4 pt-4 border-b-2 mx-4 hover:bg-[#D3D3D3] flex flex-row">
                  <button onClick={albumClickHandler} className="flex flex-row">
                    Images <IoIosArrowForward className="my-auto ml-14" />
                  </button>
                </li>
              </div>
              <div
                className={`transition-container ${
                  albumClick ? 'ml-5 visible' : 'hiddens'
                }`}
              >
                <Link to="/album/uploadAlbum" className="p-4">
                  <li className="pb-4 pl-4 pt-4 border-b-2 mx-4 hover:bg-[#D3D3D3]">
                    Upload Album
                  </li>
                </Link>
                <Link to="/album/historyAlbum" className="p-4">
                  <li className="pb-4 pl-4 pt-4 border-b-2 mx-4 hover:bg-[#D3D3D3]">
                    History Album
                  </li>
                </Link>
              </div>
              <Link to="/subscriberslist" className="p-4">
                <li className="pb-4 pl-4 pt-4 border-b-2 mx-4 hover:bg-[#D3D3D3]">
                  Subscribers list
                </li>
              </Link>

              <Link to="/writeblog" className="p-4">
                <li className="pb-4 pl-4 pt-4 border-b-2 mx-4 hover:bg-[#D3D3D3]">
                  Write Blog
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>

      {/* side Navbar Toggle */}
      <div>
        <div
          style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}
          className={
            sideBar
              ? 'fixed left-0 bg-[#FAFAFA] h-full xl:hidden md:w-48 p-2 ease-in-out duration-300'
              : 'fixed left-[-100%] ease-in-out duration-300'
          }
        >
          <div>
            <img
              src={userInfo.profileimage}
              alt="img"
              className="mx-auto rounded-full w-16 h-16 mt-10 mb-4 object-cover overflow-hidden"
            />
          </div>
          <h3 className="font-bold text-xl mt-5">{userInfo.name}</h3>
          <p className="text-sm">{userInfo.email}</p>
          <div className="mt-6 text-left">
            <ul>
              <div>
                <Link to="/" className="p-4">
                  <li
                    className="pb-4 pl-4 pt-4 border-b-2 mx-4 hover:bg-[#D3D3D3]"
                    onClick={closeHandler}
                  >
                    Dashboard
                  </li>
                </Link>
                <li className="pb-4 pl-4 pt-4 border-b-2 mx-4 hover:bg-[#D3D3D3] flex flex-row">
                  <button onClick={albumClickHandler} className="flex flex-row">
                    Images <IoIosArrowForward className="my-auto ml-14" />
                  </button>
                </li>
              </div>
              <div
                className={`transition-container ${
                  albumClick ? 'ml-5 visible' : 'hiddens'
                }`}
              >
                <Link to="/album/uploadAlbum" className="p-4">
                  <li
                    className="pb-4 pl-4 pt-4 border-b-2 mx-4 hover:bg-[#D3D3D3]"
                    onClick={closeHandler}
                  >
                    Upload Album
                  </li>
                </Link>
                <Link to="/album/historyAlbum" className="p-4">
                  <li
                    className="pb-4 pl-4 pt-4 border-b-2 mx-4 hover:bg-[#D3D3D3]"
                    onClick={closeHandler}
                  >
                    History Album
                  </li>
                </Link>
              </div>
              <Link to="/subscriberslist" className="p-4">
                <li className="pb-4 pl-4 pt-4 border-b-2 mx-4 hover:bg-[#D3D3D3]">
                  Subscribers list
                </li>
              </Link>

              <Link to="/writeblog" className="p-4">
                <li className="pb-4 pl-4 pt-4 border-b-2 mx-4 hover:bg-[#D3D3D3]">
                  Write Blog
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
