import React from 'react';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

import data from '../../data.js';
import { Link } from 'react-router-dom';

export default function HomeScreens() {
  return (
    <div>
      <div className="relative">
        <Carousel autoPlay infiniteLoop showThumbs={false}>
          {data.imageDetails.map((item) => (
            <img
              alt={item.name}
              src={item.images}
              key={item.images}
              className="h-screen object-cover brightness-75"
            ></img>
          ))}
        </Carousel>

        <div className="absolute flex flex-col top-0 left-0 right-0 bottom-0 justify-center items-center">
          <h1 className="text-white lg:text-6xl sm:text-5xl text-2xl textstwo">
            Let Us Wow Your Special Day!
          </h1>
          <h2 className="text-white xl:text-xl text-2xl mt-3">Shot The Box</h2>
          <div>
            <Link to="/contact">
              <button className="bg-transparent text-white py-1 px-2 rounded-full border-solid border-1px border-white font-bold my-6 w-[150px] textstwo text-xl hover:text-black hover:bg-white duration-300">
                Get In Touch
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
