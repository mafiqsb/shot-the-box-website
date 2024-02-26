import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FiInstagram } from 'react-icons/fi';
import { ImFacebook } from 'react-icons/im';
import { RiTwitterXFill } from 'react-icons/ri';

export default function About() {
  return (
    <div className="w-full xl:h-screen flex items-center justify-center">
      <img
        alt={'img'}
        src={'./images/img6.jpeg'}
        className="h-screen object-cover w-full relative"
      ></img>
      <Helmet>
        <title>About</title>
      </Helmet>

      <div className="absolute text-white xl:w-[1240px] lg:w-[800px] md:w-[600px] w-[280px] mx-auto textstwo md:p-8 p-4">
        <h1 className="text-center md:text-2xl sm:text-xl text-lg py-2 md:mb-6 mb-4">
          Introducing "Shot The Box" - Where Moments Become Memories
        </h1>
        <p className="text-center md:text-lg text-sm md:mb-6 mb-4 overflow-y-auto h-[300px] md:h-full">
          Shot The Box, managed by the talented Afiq Sam, is a name synonymous
          with exceptional wedding photography. With over seven years of
          experience in the industry, Afiq has honed his craft to perfection.
          Behind the lens, he skillfully blends the art of storytelling with an
          aesthetic that transcends time, creating a portfolio of images that
          are not just pictures but windows into cherished moments. Based in the
          enchanting city of Malacca, Afiq and Shot The Box are committed to
          making your special day even more memorable. What sets Shot The Box
          apart is Afiq's unique approach to wedding photography. He combines
          the documentary style, capturing candid and unposed moments, with the
          finesse of fine art photography, resulting in a collection of images
          that are both honest and timeless. In each shot, Afiq strives to
          unveil the authentic emotions and narratives that define your love
          story. He believes that the most meaningful pictures are the ones that
          reveal genuine smiles, stolen glances, and unspoken words - the
          moments that you'll want to relive time and again. One of the notable
          features of Shot The Box is its willingness to travel throughout
          Malaysia to capture your most precious moments. Whether your heart
          desires a beachside wedding in Penang, a rustic celebration in the
          jungles of Borneo, or an elegant ceremony in Kuala Lumpur, Afiq and
          his team are ready to embark on a photographic journey with you. So,
          if you're in search of a wedding photographer who will not just take
          pictures but create a timeless visual narrative of your love story,
          Shot The Box managed by Afiq Sam is the name to remember. Let Afiq's
          lens weave a story of your special day, capturing the beauty of your
          love in all its authenticity.
        </p>

        <div>
          <h2 className="text-center md:text-2xl sm:text-xl text-lg py-2 md:mb-6 mb-4">
            Let's connect
          </h2>
          <div className="flex items-center justify-center">
            <ImFacebook />
            <FiInstagram className="md:ml-6 ml-4 mr-4" />
            <RiTwitterXFill />
          </div>
        </div>
      </div>
    </div>
  );
}
