import axios from 'axios';
import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { getError } from '../../Utils';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, images: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export default function ArtworksPageScreen() {
  const params = useParams();
  const { slug } = params;

  const [{ images }, dispatch] = useReducer(reducer, {
    images: {},
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/dataImages/${slug}`);

        dispatch({
          type: 'FETCH_SUCCESS',
          payload: data[0],
        });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    fetchData();
  }, [slug]);

  return (
    <div className="">
      {images ? (
        <>
          <div className="w-full sm:h-60 md:h-80 lg:h-[600px] relative overflow-hidden ">
            <img
              src={images.images}
              alt={images.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white textstwo">
              <h2 className="md:text-6xl text-2xl">{images.name}</h2>
              <p className="md:text-xl text-[7px] text-center lg:w-[700px] w-[200px] lg:mt-4">
                {images.descriptions}
              </p>
            </div>
          </div>
          <div className="xl:w-[1240px] lg:w-[800px] md:w-[600px]  mx-auto flex flex-col textstwo  md:mt-36 pb-24 mt-24">
            <div className="gallery">
              {images.confirmimages &&
                images.confirmimages.map((image, index) => (
                  <img
                    src={image}
                    alt={index}
                    key={index}
                    className="pt-2 pb-2 hover:scale-125 duration-300"
                  />
                ))}
            </div>
          </div>{' '}
        </>
      ) : (
        <div className="h-screen ">
          <h1 className="absolute inset-0 flex flex-col items-center justify-center text-black textstwo md:text-3xl text-2xl">
            No image Found
          </h1>
        </div>
      )}
    </div>
  );
}
