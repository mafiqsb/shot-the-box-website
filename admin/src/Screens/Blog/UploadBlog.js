import React from 'react';
import ControlledEditor from './ControlledEditor.js';

export default function UploadBlog() {
  return (
    <div className="h-screen">
      <div className=" flex w-full">
        <div className=" flex flex-col justify-center mx-auto p-10">
          <h1 className="md:text-2xl text-xl text-left font-bold p-1">
            Upload Blog
          </h1>

          <div className="md:w-[700px] mt-12 mb-8">
            <label className="block text-gray-700 text-sm font-bold mb-2 text-left pb-2">
              Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              placeholder="What's you wanna talk?"
            />
          </div>

          <div className="md:w-[700px] mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2 text-left pb-2">
              Description
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="desc"
              type="text"
              placeholder="What's on your mind?"
            />
          </div>

          <div className="mt-10 items-center mx-auto flex">
            <ControlledEditor />
          </div>
        </div>
      </div>
    </div>
  );
}
