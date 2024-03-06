import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbars from './components/Navbars';
import ProductUploadScreens from './Screens/Images/ProductUploadScreens';
import ProductHistoryScreens from './Screens/Images/ProductHistoryScreens';
import SubscribersEmail from './Screens/Email/SubscribersEmail.js';
import SignUp from './components/SignUp';
import UploadBlog from './Screens/Blog/UploadBlog';
import HomeScreens from './Screens/Home/HomeScreens';
import ProtectedRoute from './components/ProtectedRoute';

export default function Center() {
  const [sideBar, setSidebar] = useState(true);

  return (
    <div>
      <ProtectedRoute>
        <Navbars sideBar={sideBar} setSidebar={setSidebar} />
      </ProtectedRoute>

      <div className="flex ">
        <div
          className={
            sideBar
              ? 'sm:flex-1 xl:ml-60 xl:mt-[96px] mt-24 ease-in-out duration-300'
              : 'sm:flex-1 xl:mt-[96px] mt-24 ease-in-out duration-300'
          }
        >
          <Routes>
            <Route
              path="/album/uploadAlbum"
              element={
                <ProtectedRoute>
                  <ProductUploadScreens />
                </ProtectedRoute>
              }
            />

            <Route
              path="/album/historyAlbum"
              element={
                <ProtectedRoute>
                  <ProductHistoryScreens />
                </ProtectedRoute>
              }
            />
            <Route
              path="/subscriberslist"
              element={
                <ProtectedRoute>
                  <SubscribersEmail />
                </ProtectedRoute>
              }
            />

            <Route path="/writeblog" element={<UploadBlog />} />

            <Route
              path="/signup"
              element={
                <ProtectedRoute>
                  <SignUp />
                </ProtectedRoute>
              }
            />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomeScreens />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}
