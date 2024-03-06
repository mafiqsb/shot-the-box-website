'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'imagedetails',
      [
        {
          names: 'Example Name 1',
          images: 'example.jpg',
          slug: 'example-slug',
          descriptions: 'Example Description',
          moreimages:
            'https://res.cloudinary.com/dnfxw6yf4/image/upload/v1706669709/kzzwm7r7g7nv9lypiahy.jpg',
          confirmimages: [
            'https://res.cloudinary.com/dnfxw6yf4/image/upload/v1706669701/vx5jt3ujpyzdaodintqq.jpg',
            'https://res.cloudinary.com/dnfxw6yf4/image/upload/v1706669703/uwcoqctxq2rqrlp924im.jpg,https://res.cloudinary.com/dnfxw6yf4/image/upload/v1706669702/clplqxr3jismltnwz3ck.jpg',
            'https://res.cloudinary.com/dnfxw6yf4/image/upload/v1706669703/pur44tjn8d9ggb73inup.jpg',
            'https://res.cloudinary.com/dnfxw6yf4/image/upload/v1706669704/bg7aysi6ejvpgptxiaqh.jpg',
            'https://res.cloudinary.com/dnfxw6yf4/image/upload/v1706669701/dsfkowvai7ydldopkprz.jpg',
            'https://res.cloudinary.com/dnfxw6yf4/image/upload/v1706669704/jzapp8fjokdfzptiqc9k.jpg',
          ],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          names: 'Example Name 2',
          images: 'example.jpg',
          slug: 'example-slug',
          descriptions: 'Example Description',
          moreimages:
            'https://res.cloudinary.com/dnfxw6yf4/image/upload/v1706669709/kzzwm7r7g7nv9lypiahy.jpg',
          confirmimages: [
            'https://res.cloudinary.com/dnfxw6yf4/image/upload/v1706669701/vx5jt3ujpyzdaodintqq.jpg',
            'https://res.cloudinary.com/dnfxw6yf4/image/upload/v1706669703/uwcoqctxq2rqrlp924im.jpg,https://res.cloudinary.com/dnfxw6yf4/image/upload/v1706669702/clplqxr3jismltnwz3ck.jpg',
            'https://res.cloudinary.com/dnfxw6yf4/image/upload/v1706669703/pur44tjn8d9ggb73inup.jpg',
            'https://res.cloudinary.com/dnfxw6yf4/image/upload/v1706669704/bg7aysi6ejvpgptxiaqh.jpg',
            'https://res.cloudinary.com/dnfxw6yf4/image/upload/v1706669701/dsfkowvai7ydldopkprz.jpg',
            'https://res.cloudinary.com/dnfxw6yf4/image/upload/v1706669704/jzapp8fjokdfzptiqc9k.jpg',
          ],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          names: 'Example Name 3',
          images: 'example.jpg',
          slug: 'example-slug',
          descriptions: 'Example Description',
          moreimages:
            'https://res.cloudinary.com/dnfxw6yf4/image/upload/v1706669709/kzzwm7r7g7nv9lypiahy.jpg',
          confirmimages: [
            'https://res.cloudinary.com/dnfxw6yf4/image/upload/v1706669701/vx5jt3ujpyzdaodintqq.jpg',
            'https://res.cloudinary.com/dnfxw6yf4/image/upload/v1706669703/uwcoqctxq2rqrlp924im.jpg,https://res.cloudinary.com/dnfxw6yf4/image/upload/v1706669702/clplqxr3jismltnwz3ck.jpg',
            'https://res.cloudinary.com/dnfxw6yf4/image/upload/v1706669703/pur44tjn8d9ggb73inup.jpg',
            'https://res.cloudinary.com/dnfxw6yf4/image/upload/v1706669704/bg7aysi6ejvpgptxiaqh.jpg',
            'https://res.cloudinary.com/dnfxw6yf4/image/upload/v1706669701/dsfkowvai7ydldopkprz.jpg',
            'https://res.cloudinary.com/dnfxw6yf4/image/upload/v1706669704/jzapp8fjokdfzptiqc9k.jpg',
          ],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          names: 'Example Name 4',
          images: 'example.jpg',
          slug: 'example-slug',
          descriptions: 'Example Description',
          moreimages:
            'https://res.cloudinary.com/dnfxw6yf4/image/upload/v1706669709/kzzwm7r7g7nv9lypiahy.jpg',
          confirmimages: [
            'https://res.cloudinary.com/dnfxw6yf4/image/upload/v1706669701/vx5jt3ujpyzdaodintqq.jpg',
            'https://res.cloudinary.com/dnfxw6yf4/image/upload/v1706669703/uwcoqctxq2rqrlp924im.jpg,https://res.cloudinary.com/dnfxw6yf4/image/upload/v1706669702/clplqxr3jismltnwz3ck.jpg',
            'https://res.cloudinary.com/dnfxw6yf4/image/upload/v1706669703/pur44tjn8d9ggb73inup.jpg',
            'https://res.cloudinary.com/dnfxw6yf4/image/upload/v1706669704/bg7aysi6ejvpgptxiaqh.jpg',
            'https://res.cloudinary.com/dnfxw6yf4/image/upload/v1706669701/dsfkowvai7ydldopkprz.jpg',
            'https://res.cloudinary.com/dnfxw6yf4/image/upload/v1706669704/jzapp8fjokdfzptiqc9k.jpg',
          ],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          names: 'Example Name 5',
          images: 'example.jpg',
          slug: 'example-slug',
          descriptions: 'Example Description',
          moreimages:
            'https://res.cloudinary.com/dnfxw6yf4/image/upload/v1706669709/kzzwm7r7g7nv9lypiahy.jpg',
          confirmimages: [
            'https://res.cloudinary.com/dnfxw6yf4/image/upload/v1706669701/vx5jt3ujpyzdaodintqq.jpg',
            'https://res.cloudinary.com/dnfxw6yf4/image/upload/v1706669703/uwcoqctxq2rqrlp924im.jpg,https://res.cloudinary.com/dnfxw6yf4/image/upload/v1706669702/clplqxr3jismltnwz3ck.jpg',
            'https://res.cloudinary.com/dnfxw6yf4/image/upload/v1706669703/pur44tjn8d9ggb73inup.jpg',
            'https://res.cloudinary.com/dnfxw6yf4/image/upload/v1706669704/bg7aysi6ejvpgptxiaqh.jpg',
            'https://res.cloudinary.com/dnfxw6yf4/image/upload/v1706669701/dsfkowvai7ydldopkprz.jpg',
            'https://res.cloudinary.com/dnfxw6yf4/image/upload/v1706669704/jzapp8fjokdfzptiqc9k.jpg',
          ],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          names: 'Example Name 6',
          images: 'example.jpg',
          slug: 'example-slug',
          descriptions: 'Example Description',
          moreimages:
            'https://res.cloudinary.com/dnfxw6yf4/image/upload/v1706669709/kzzwm7r7g7nv9lypiahy.jpg',
          confirmimages: [
            'https://res.cloudinary.com/dnfxw6yf4/image/upload/v1706669701/vx5jt3ujpyzdaodintqq.jpg',
            'https://res.cloudinary.com/dnfxw6yf4/image/upload/v1706669703/uwcoqctxq2rqrlp924im.jpg,https://res.cloudinary.com/dnfxw6yf4/image/upload/v1706669702/clplqxr3jismltnwz3ck.jpg',
            'https://res.cloudinary.com/dnfxw6yf4/image/upload/v1706669703/pur44tjn8d9ggb73inup.jpg',
            'https://res.cloudinary.com/dnfxw6yf4/image/upload/v1706669704/bg7aysi6ejvpgptxiaqh.jpg',
            'https://res.cloudinary.com/dnfxw6yf4/image/upload/v1706669701/dsfkowvai7ydldopkprz.jpg',
            'https://res.cloudinary.com/dnfxw6yf4/image/upload/v1706669704/jzapp8fjokdfzptiqc9k.jpg',
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
