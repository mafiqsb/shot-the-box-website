import React, { useEffect, useReducer, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
// import data from '../../data';

import axios from 'axios';
import { getError } from '../../Utils';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };

    case 'FETCH_SUCCESS':
      return { ...state, loading: false, image: action.payload };

    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      return { state };
  }
};
// https://github.com/mafiqsb/shot-the-box-website#readme

export default function ArtworksHomeScreen() {
  // const params = useParams();
  // const { slug } = params;

  const [{ image, loading, error }, dispatch] = useReducer(reducer, {
    image: [],
    loading: true,
    error: '',
  });

  // const navigate = useNavigate();

  const { search } = useLocation();

  const sp = new URLSearchParams(search);

  const page = sp.get('page');

  //split the images into the page

  const [currentPage, setCurrentPage] = useState(1);

  const itemPerPage = 11;

  const firstIndex = (currentPage - 1) * page;
  const endIndex = firstIndex + (itemPerPage - 1);

  if (!Array.isArray(image)) {
    throw new Error('Invalid result format');
  }

  const currentPost = image.slice(firstIndex, endIndex - 1);
  const totalPages = Math.ceil(image.length / itemPerPage);

  const numberPages = [...Array(totalPages).keys()].map((i) => i + 1);

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`/api/dataImages/`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(error) });
        console.log('Request error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex">
      <Helmet>
        <title>Our artworks</title>
      </Helmet>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox error={error} />
      ) : (
        <div className="xl:w-[1240px] lg:w-[800px] md:w-[600px] w-[280px] mx-auto flex flex-col items-center justify-center textstwo  md:pt-36 pb-24 pt-24">
          <div className="w-full mb-10 mt-12">
            <h1 className="text-center items-center justify-center flex md:text-5xl sm:text-3xl text-xl mb-5">
              Our Artworks
            </h1>
            <p className="text-center items-center justify-center flex md:mb-20">
              Let us present to you our artworks from the wedding photography.
              Click any image below to see the full documentation
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {currentPost.map((img) => (
              <Link key={img.id} to={`/artworks/${img.slug}`}>
                <div className="w-full hover:scale-105 duration-300 hover:cursor-pointer textstwo text-center items-center justify-center relative">
                  <img
                    alt={img.names}
                    src={img.images}
                    className="rounded-md shadow-xl"
                  />
                  <div className="flex flex-col items-center justify-center ">
                    <h2 className="text-2xl text-center absolute bottom-5 text-white">
                      {img.names}
                    </h2>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {/* <div className="pt-10">
            {[...Array(numberPages).keys].map((x) => (
              <Link
                className={x + 1 === Number(page) ? 'font-bold' : 'font-normal'}
                key={x + 1}
              >
                {x + 1}
              </Link>
            ))}
          </div> */}

          <div className="flex mt-14">
            <button onClick={() => prevPage()} disabled={currentPage === 1}>
              Prev
            </button>
            <ul className="flex">
              {numberPages.map((page) => (
                <li key={page}>
                  <button onClick={() => goToPage(page)} className="ml-3 mr-3">
                    {page}
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={() => nextPage()}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
