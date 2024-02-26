import axios from 'axios';
import React, { useEffect, useReducer } from 'react';
import { Link, useLocation } from 'react-router-dom';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, images: action.payload };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function Gallery() {
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const page = sp.get('page') || 1;

  const [{ images }, dispatch] = useReducer(reducer, {
    images: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const { data } = await axios.get(`/api/dataImages/`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL' });
        console.log(err);
      }
    };

    fetchAlbum();
  }, []);

  // Selected Images For Display

  const currentPost = images.slice(0, 4);

  return (
    <div className="w-full mb-10 mt-24">
      <h1 className="text-center items-center justify-center flex textstwo md:text-5xl sm:text-3xl text-xl mb-20">
        Our Artworks
      </h1>
      <div className="xl:w-[1240px] md:w-[700px] sm:w-[680px] w-[350px] mx-auto grid md:grid-cols-2 gap-8">
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
      <div className="w-full items-center justify-center text-center  mt-14">
        <Link to={`/artworks/?page=${page}`}>
          <button className="bg-transparent md:text-lg text-sm text-gray-400 ml-4 my-3 px-1 py-1 rounded-full border-solid border-1px border-gray-400 font-bold w-[150px] textstwo hover:text-gray-500 hover:bg-white duration-300">
            Let's explore more
          </button>
        </Link>
      </div>
    </div>
  );
}
