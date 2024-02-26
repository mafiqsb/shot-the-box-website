import React from 'react';
import Gallery from './Screens/Home/Gallery';
import Hero from './Screens/Home/Hero';
import HomeScreens from './Screens/Home/HomeScreens';
import Newsletter from './Screens/Home/Newsletter';

import { Helmet } from 'react-helmet-async';

export default function HomeCenter() {
  return (
    <div>
      <Helmet>
        <title>Shot The Box</title>
      </Helmet>
      <HomeScreens />
      <Hero />
      <Newsletter />
      <Gallery />
    </div>
  );
}
