import React from 'react';

export default function HomeScreens() {
  const userCount = 1000;
  const imageUploadCount = 500;
  const imageUrl = 'https://example.com/sample-image.jpg';
  return (
    <div className="h-screen w-full justify-center items-center mx-auto ">
      <div className=" flex flex-col p-8 mx-auto ml-10 ">
        <h1 className="md:text-2xl text-xl font-bold pl-10 text-left">
          Overview
        </h1>
        <div className="mt-[50px] md:pl-8 flex">
          {/* User Count Card */}
          <div className="md:w-[300px] h-36 bg-white p-6 rounded-lg shadow-md mr-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Subscribers count
            </h2>
            <p className="text-3xl font-bold text-blue-500">{userCount}</p>
          </div>

          {/* Image Upload Count Card */}
          <div className="md:w-[300px]  h-36 bg-white p-6 rounded-lg shadow-md mr-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Image Count
            </h2>
            <p className="text-3xl font-bold text-green-500">
              {imageUploadCount}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
