'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'imagedetails',
      [
        {
          names: 'Shariza & Shashipal',
          images:
            'https://res.cloudinary.com/dnfxw6yf4/image/upload/v1709720877/xz1ujlglhf2vtfhumzwf.jpg',
          slug: 'Shariza-Shashipal',
          descriptions:
            'Love is not about how many days, months, or years you have been together. Love is about how much you love each other every single day.',
          confirmimages: [
            'https://res.cloudinary.com/dnfxw6yf4/image/upload/v1709720869/exc6ntdomyiq1xeuav8p.jpg',
            'https://res.cloudinary.com/dnfxw6yf4/image/upload/v1709720870/exzu5ilbossqatpycn44.jpg',
            'https://res.cloudinary.com/dnfxw6yf4/image/upload/v1709720871/vb8cxmdaukjmoeomaf6w.jpg',
            'https://res.cloudinary.com/dnfxw6yf4/image/upload/v1709720870/dzekrs8ygojbros4sjt8.jpg',
            'https://res.cloudinary.com/dnfxw6yf4/image/upload/v1709720871/f42ymlfptwfp3bpff9ya.jpg',
            'https://res.cloudinary.com/dnfxw6yf4/image/upload/v1709720871/cld3cwfobw5b8rxu4lto.jpg',
            'https://res.cloudinary.com/dnfxw6yf4/image/upload/v1709720870/zkelb3mstr8q1pcdoa0x.jpg',
            'https://res.cloudinary.com/dnfxw6yf4/image/upload/v1709720871/ss6jlwvbcibq4qgfjkyr.jpg',
            'https://res.cloudinary.com/dnfxw6yf4/image/upload/v1709720870/p3mcyeitxmq0uyra4cqy.jpg',
            'https://res.cloudinary.com/dnfxw6yf4/image/upload/v1709720872/yxne6vojfunawtqlwdem.jpg',
            'https://res.cloudinary.com/dnfxw6yf4/image/upload/v1709720872/mvzzqazn5am0rqlcbyte.jpg',
            'https://res.cloudinary.com/dnfxw6yf4/image/upload/v1709720871/sypcoo9adfxyjd8olfk5.jpg',
            'https://res.cloudinary.com/dnfxw6yf4/image/upload/v1709720871/kyppxbixqminzkhysmic.jpg',
            'https://res.cloudinary.com/dnfxw6yf4/image/upload/v1709720872/gyt6i7oggirrnvwvsekn.jpg',
            'https://res.cloudinary.com/dnfxw6yf4/image/upload/v1709720871/nto3mjlhnxkmwewcq3ho.jpg',
          ],

          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          names: 'Amirah & Azwan',
          images:
            'https://res.cloudinary.com/dnfxw6yf4/image/upload/v1709721016/ffsl5eumllhdrzfipew4.jpg',
          slug: 'Amirah-Azwan',
          descriptions:
            'The best thing to hold onto in life is each other." - Audrey Hepburn',
          confirmimages: [
            'https://res.cloudinary.com/dnfxw6yf4/image/upload/v1709721005/etmeg9tbdj9oer3ppjvv.jpg',
            'https://res.cloudinary.com/dnfxw6yf4/image/upload/v1709721006/iju0blfla5fl2sdpbtus.jpg',
            'https://res.cloudinary.com/dnfxw6yf4/image/upload/v1709721004/rs29egnrs4hv1tt2joo1.jpg',
            'https://res.cloudinary.com/dnfxw6yf4/image/upload/v1709721010/ygmsfneeevf2irppz2uf.jpg',
            'https://res.cloudinary.com/dnfxw6yf4/image/upload/v1709721004/cjbv47cytyhhxivgq5fe.jpg',
            'https://res.cloudinary.com/dnfxw6yf4/image/upload/v1709721004/gsxiwdbpegqc3aezyi6p.jpg',
            'https://res.cloudinary.com/dnfxw6yf4/image/upload/v1709721004/b3l6xbia3p40aqvczlab.jpg',
          ],

          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
