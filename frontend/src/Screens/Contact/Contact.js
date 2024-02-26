import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function Contact() {
  return (
    <div className="w-full xl:h-screen md:h-full relative">
      <Helmet>
        <title>Contact</title>
      </Helmet>
      <img
        alt={'img'}
        src={'./images/img7.jpeg'}
        className="h-screen object-cover w-full  filter brightness-50"
      ></img>

      <div className="absolute text-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 xl:w-[1240px] lg:w-[800px] md:w-[600px] w-[280px] xl:mt-[0] mx-auto textstwo">
        <h1 className="xl:text-4xl md:text-3xl  text-center">
          We're excited to connect with you!
        </h1>
        <p className="text-center md:mb-10 mb-9">
          If you have any queries or require further information, don't hesitate
          to reach out to us
        </p>
        <p className="text-center md:mb-14 mb-9">
          It is easy to engage with you through Whatsapp
        </p>

        <div className="flex justify-center items-center">
          <Link to={'https://wa.link/0xeqpb'}>
            <button className="bg-transparent md:text-lg text-sm text-white ml-4 my-3 px-1 py-1 rounded-full border-solid border-1px border-gray-400 font-bold w-[150px] textstwo hover:text-gray-400 hover:bg-white duration-300">
              Let's Whatsapp!
            </button>
          </Link>
        </div>
        <p className="text-center md:mt-14 mt-9">
          We look forward to welcoming you in the future.
        </p>
      </div>
      {/* </ScrollToTop> */}
    </div>
  );
}
