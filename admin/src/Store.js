import { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {
  dataFolder: {
    newAlbum: [],
  },
  userInfo: localStorage.getItem('user_info')
    ? JSON.parse(localStorage.getItem('user_info'))
    : null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SAVE_NEW_DATA_IMAGES':
      const [coupleName, imageCover, slug, descr, ...uploadImages] =
        action.payload;

      const updatedNewAlbum = [
        coupleName,
        imageCover,
        slug,
        descr,
        uploadImages,
      ];

      return {
        ...state,
        dataFolder: {
          ...state.dataFolder,
          newAlbum: updatedNewAlbum,
        },
      };

    case 'REMOVED_IMAGE':
      const newAlbum = state.dataFolder.newAlbum.map((item) => {
        const [...uploadImages] = item;

        const filteredImages = uploadImages.filter((img) => {
          const filterFile = img !== action.payload;

          return filterFile;
        });

        const result = filteredImages.length > 0 ? filteredImages : '';

        return result;
      });

      return {
        ...state,
        dataFolder: { ...state.dataFolder, newAlbum },
      };

    case 'REMOVED_IMAGE_COVER':
      const filterAlbum = state.dataFolder.newAlbum.map((item) => {
        const [...imageCover] = item;

        const filteredImages = imageCover.filter((img) => {
          const filterFile = img !== action.payload;

          return filterFile;
        });

        const result = filteredImages.length > 0 ? filteredImages : '';

        return result;
      });

      return {
        ...state,
        dataFolder: { ...state.dataFolder, filterAlbum },
      };

    case 'RESET_NEW_ALBUM':
      return {
        ...state,
        dataFolder: { ...state.dataFolder, newAlbum: [] },
      };

    case 'USER_SIGNOUT':
      return {
        ...state,
        userInfo: null,
      };

    // return {
    //   ...state,
    //   dataFolder: {
    //     ...state.dataFolder,
    //     newAlbum: [
    //       ...state.dataFolder.newAlbum,
    //       {
    //         coupleName: '',
    //         imageCover: [],
    //         slug: '',
    //         descr: '',
    //         uploadImages: [],
    //       },
    //     ],
    //   },
    // };

    case 'USER_SIGNIN':
      return {
        ...state,
        userInfo: action.payload,
      };

    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = { state, dispatch };

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
