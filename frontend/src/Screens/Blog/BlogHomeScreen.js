import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import data from '../../data';

export default function Blog() {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage - 1;

  const currentPosts = data.blogDetails.slice(startIndex, endIndex + 1);

  const totalPages = Math.ceil(data.blogDetails.length / itemsPerPage);

  // const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  // const pageNumbers = [...Array(totalPages + 1).keys()].slice(1);

  const pageNumbers = [...Array(totalPages).keys()].map((i) => i + 1);

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    // setCurrentPage(currentPage + 1);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="">
      <Helmet>
        <title>Our Article</title>
      </Helmet>
      <div className="xl:w-[1240px] lg:w-[800px] md:w-[600px] w-[280px] mx-auto flex flex-col items-center justify-center textstwo pt-36 pb-24">
        <div className="grid md:grid-cols-3 gap-8">
          {currentPosts.map((post) => (
            <div
              className="max-w-[300px] max-h-[500px] rounded overflow-hidden shadow-lg hover:scale-105 duration-300 cursor-pointer"
              key={post.title}
            >
              <img alt="" className="w-full" src={post.coverImage} />
              <div className="p-6">
                <h1 className="text-center text-xl text-bold py-2 ">
                  {post.title}
                </h1>
                <p className="text-gray-700 text-center">{post.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex mt-14">
          <button onClick={() => prevPage()}>Prev</button>
          <ul className="flex">
            {pageNumbers.map((page) => (
              <li key={page}>
                <button onClick={() => goToPage(page)} className="ml-3 mr-3">
                  {page}
                </button>
              </li>
            ))}
          </ul>
          <button onClick={() => nextPage()}>Next</button>
        </div>
      </div>
    </div>
  );
}
