import React from 'react';
import { Link } from 'react-router-dom';

export default function Hero() {
  // const [scrollY, setScrollY] = useState(0);

  // const handleScroll = () => {
  //   setScrollY(window.scrollY);
  // };

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  return (
    <div
      className="mt-40 flex w-[350px] lg:w-[800px] md:w-[600px] flex-col mx-auto items-center justify-center md:mb-[100px] mb-14"
      // style={{
      //   transform: `translateY(${scrollY * -0.2}px)`,
      //   transition: 'transform 0.5s',
      // }}
    >
      <div className="text-center textstwo">
        <div className="w-1/4 border-b border-solid flex mx-auto border-grey border-opacity-75 "></div>
        <h1 className=" font-bold md:text-4xl mt-14">Hi,</h1>
        <p className="mt-10 mb-10 font-medium">We are from Shot The Box</p>
        <p>We provide photography and videography for your wedding day.</p>
        <p className="md:mb-20 mb-10">
          We capture precious moments that never repeat themselves and capture
          portraiture to produce image of happy couple.
        </p>
        <div className="w-1/2 border-b border-solid border-grey border-opacity-75 flex mx-auto"></div>
        <div className=" mt-5">
          <Link to="/contact">
            <button className="bg-transparent text-gray-400 py-1 px-2 rounded-full border-solid border-1px border-gray-400 font-bold my-6 w-[150px] textstwo text-xl hover:text-black hover:bg-white duration-300">
              Get In Touch
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
